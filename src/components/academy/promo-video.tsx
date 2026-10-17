'use client';

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { Captions, Maximize, Minimize, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { createPromoPlaybackSession, shouldPlayPromo, type PlaybackIntent, type PlaybackPolicy, type PromoPlaybackSession } from './promo-playback';

export { shouldPlayPromo } from './promo-playback';

export type HeroPromoVideoProps = {
  ready?: boolean;
  durationSeconds?: number;
  transcript?: string | readonly string[];
  transcriptLabel?: string;
  hasAudio?: boolean;
  hasCaptions?: boolean;
  title?: string;
  src?: string;
  poster?: string;
  captionsSrc?: string;
};

type PlayerDriver = {
  toggle: () => void;
  replay: () => void;
  seek: (seconds: number) => void;
  sound: () => void;
  captions: () => void;
  fullscreen: () => void;
  retry: () => void;
};

type FullscreenVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
};

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
const noSubscription = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

function validDuration(value: number | undefined | null): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : null;
}

function clock(seconds: number | null): string {
  if (seconds === null || !Number.isFinite(seconds)) return '—:—';
  const value = Math.max(0, Math.floor(seconds));
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`;
}

function durationLabel(seconds: number | null, hasAudio: boolean): string {
  const edition = hasAudio ? 'film' : 'silent film';
  if (seconds === null) return edition;
  const rounded = Math.max(1, Math.round(seconds));
  if (rounded < 60) return `${rounded}-second ${edition}`;
  return `${clock(rounded)} ${edition}`;
}

export function HeroPromoVideo({
  ready = false,
  durationSeconds,
  transcript,
  transcriptLabel = 'Read the film description',
  hasAudio = false,
  hasCaptions = false,
  src = '/media/academy-promo.mp4',
  poster = '/media/academy-promo-poster.webp',
  captionsSrc = '/media/academy-promo.vtt',
  title = 'A quiet invitation',
}: HeroPromoVideoProps) {
  const id = useId();
  const enhanced = useSyncExternalStore(noSubscription, clientReady, serverReady);
  const host = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const track = useRef<HTMLTrackElement>(null);
  const mainControl = useRef<HTMLButtonElement>(null);
  const driver = useRef<PlayerDriver | null>(null);
  const intent = useRef<PlaybackIntent>('automatic');
  const automaticBlocked = useRef(false);
  const playbackSession = useRef<{ source: string; session: PromoPlaybackSession } | null>(null);
  const [playing, setPlaying] = useState(false);
  const [pending, setPending] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [ended, setEnded] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [metadataDuration, setMetadataDuration] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [notice, setNotice] = useState('');
  const [captionStatus, setCaptionStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading');
  const [captionsOn, setCaptionsOn] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenAvailable, setFullscreenAvailable] = useState(false);
  const duration = metadataDuration ?? validDuration(durationSeconds);
  const paragraphs = typeof transcript === 'string'
    ? transcript.split(/\n\s*\n/).filter(paragraph => paragraph.trim())
    : transcript?.filter(paragraph => paragraph.trim()) || [];

  useEffect(() => {
    const media = video.current as FullscreenVideo | null;
    const frame = host.current;
    const captionsTrack = track.current;
    if (!media || !frame) return;

    if (playbackSession.current?.source !== src) {
      playbackSession.current = { source: src, session: createPromoPlaybackSession(src) };
      intent.current = 'automatic';
      automaticBlocked.current = false;
      setPlaying(false);
      setPending(false);
      setBuffering(false);
      setEnded(false);
      setElapsed(0);
      setMetadataDuration(null);
      setMuted(true);
      setFailed(false);
      setPosterFailed(false);
      setNotice('');
      setCaptionStatus('loading');
      setCaptionsOn(true);
      setFullscreen(false);
      setFullscreenAvailable(false);
    }
    const session = playbackSession.current.session;
    let disposed = false;
    let playPending = false;
    let playRequest = 0;
    let viewportFrame = 0;
    let onscreen = false;
    let nativeFullscreen = false;
    let fatalError = !!media.error;
    const motionQuery = typeof window.matchMedia === 'function' ? window.matchMedia(REDUCED_QUERY) : null;
    let lastMotionEnabled = document.documentElement.dataset.motion === 'on';
    let lastReduced = motionQuery?.matches ?? true;

    function isFullscreen() {
      return document.fullscreenElement === frame || nativeFullscreen;
    }

    function measureVisibility() {
      if (isFullscreen()) return true;
      const bounds = media!.getBoundingClientRect();
      if (bounds.width <= 0 || bounds.height <= 0) return false;
      const width = Math.max(0, Math.min(bounds.right, window.innerWidth) - Math.max(bounds.left, 0));
      const height = Math.max(0, Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0));
      return width * height / (bounds.width * bounds.height) >= 0.35;
    }

    function policy(): PlaybackPolicy {
      return {
        ready,
        onscreen: isFullscreen() || onscreen,
        visible: document.visibilityState !== 'hidden',
        motionEnabled: document.documentElement.dataset.motion === 'on',
        reducedMotion: motionQuery?.matches ?? true,
        intent: intent.current,
        ended: media!.ended,
        failed: fatalError,
        automaticBlocked: automaticBlocked.current,
        automaticAvailable: session.automaticAvailable(),
      };
    }

    function pause(manual = false) {
      if (manual) intent.current = 'paused';
      playRequest += 1;
      playPending = false;
      media!.pause();
      if (!disposed) {
        setPending(false);
        setBuffering(false);
        setPlaying(false);
      }
    }

    function requestPlay(kind: 'automatic' | 'manual') {
      if (disposed || playPending) return;
      if (kind === 'automatic' && frame!.contains(document.activeElement)) return;
      intent.current = kind;
      onscreen = measureVisibility();
      if (!shouldPlayPromo(policy())) return;
      if (kind === 'automatic') media!.muted = true;
      playPending = true;
      const request = ++playRequest;
      setPending(true);
      setNotice('');
      try {
        Promise.resolve(media!.play()).then(() => {
          if (disposed) return;
          if (request !== playRequest) {
            if (!shouldPlayPromo(policy())) media!.pause();
            return;
          }
          playPending = false;
          setPending(false);
          if (!shouldPlayPromo(policy())) pause();
        }).catch((error: unknown) => {
          if (disposed || request !== playRequest) return;
          playPending = false;
          setPending(false);
          setPlaying(false);
          if (kind === 'automatic') automaticBlocked.current = true;
          intent.current = 'paused';
          if (error instanceof DOMException && error.name === 'AbortError') return;
          setNotice(kind === 'automatic'
            ? 'Choose Play to watch the film.'
            : 'Playback could not start. Try Play again, or read the film description.');
        });
      } catch {
        playPending = false;
        setPending(false);
        intent.current = 'paused';
        if (kind === 'automatic') automaticBlocked.current = true;
        setNotice('Choose Play to watch the film.');
      }
    }

    function reconcile() {
      if (disposed) return;
      const current = policy();
      if (!current.ready || !current.onscreen || !current.visible) {
        // Explicitly watched films stay paused after leaving the view/tab.
        // A muted automatic film may resume when its conditions become true.
        if (intent.current === 'manual') intent.current = 'paused';
        if (!media!.paused || playPending) pause();
        return;
      }
      if (!shouldPlayPromo(current)) {
        if (!media!.paused || playPending) pause();
        return;
      }
      if (media!.paused && !playPending && intent.current === 'automatic') requestPlay('automatic');
    }

    function onPreferenceChange() {
      const motionEnabled = document.documentElement.dataset.motion === 'on';
      const reduced = motionQuery?.matches ?? true;
      // A new Pause/device preference stops the current manual session too.
      // A later explicit Play can start a new manual session under that setting.
      if ((lastMotionEnabled && !motionEnabled) || (!lastReduced && reduced)) {
        if (intent.current === 'manual') intent.current = 'paused';
      }
      lastMotionEnabled = motionEnabled;
      lastReduced = reduced;
      reconcile();
    }

    function onMetadata() {
      setMetadataDuration(validDuration(media!.duration));
      setElapsed(Number.isFinite(media!.currentTime) ? media!.currentTime : 0);
      setFullscreenAvailable(
        (typeof frame!.requestFullscreen === 'function' && document.fullscreenEnabled !== false)
        || typeof media!.webkitEnterFullscreen === 'function',
      );
    }
    function onTime() {
      setElapsed(Number.isFinite(media!.currentTime) ? media!.currentTime : 0);
    }
    function onPlaying() {
      // iOS native fullscreen supplies its own Play control. A native control
      // activation starts an explicit session under the same visibility gate.
      if (nativeFullscreen && !playPending && ready) intent.current = 'manual';
      if (!shouldPlayPromo(policy())) { pause(); return; }
      // Count actual playback, not visibility, a request, or a rejected play promise.
      // A manual watch also prevents an unsolicited automatic restart on return.
      if (intent.current !== 'paused') session.recordStarted(intent.current);
      playPending = false;
      setPending(false);
      setBuffering(false);
      setPlaying(true);
      setEnded(false);
    }
    function onPause() {
      if (nativeFullscreen && !playPending && shouldPlayPromo(policy())) intent.current = 'paused';
      setPlaying(false);
      setBuffering(false);
    }
    function onEnded() {
      intent.current = 'paused';
      playPending = false;
      setPlaying(false);
      setPending(false);
      setBuffering(false);
      setEnded(true);
      onTime();
    }
    function onWaiting() {
      if (!media!.paused) setBuffering(true);
    }
    function onVolume() {
      if (!hasAudio && !media!.muted) media!.muted = true;
      if (hasAudio && !media!.muted && !media!.paused) intent.current = 'manual';
      setMuted(media!.muted);
    }
    function onError() {
      fatalError = true;
      intent.current = 'paused';
      pause();
      setFailed(true);
      setNotice('The film could not be loaded. You can try again or read the description below.');
    }
    function onVisibility() {
      onscreen = measureVisibility();
      reconcile();
    }
    function onViewport() {
      if (viewportFrame) return;
      viewportFrame = window.requestAnimationFrame(() => {
        viewportFrame = 0;
        onVisibility();
      });
    }
    function onFullscreen() {
      setFullscreen(isFullscreen());
      onVisibility();
    }
    function onNativeFullscreenStart() {
      nativeFullscreen = true;
      onFullscreen();
    }
    function onNativeFullscreenEnd() {
      nativeFullscreen = false;
      onFullscreen();
    }
    function onTrackLoad() {
      if (!captionsTrack) return;
      captionsTrack.track.mode = 'showing';
      setCaptionStatus('ready');
      setCaptionsOn(true);
    }
    function onTrackError() {
      setCaptionStatus('unavailable');
    }

    driver.current = {
      toggle() {
        if (!ready) return;
        if (!media.paused || playPending) { pause(true); return; }
        if (media.ended) {
          try { media.currentTime = 0; } catch { /* Metadata may still be arriving. */ }
          setEnded(false);
        }
        requestPlay('manual');
      },
      replay() {
        if (!ready) return;
        pause();
        try { media.currentTime = 0; } catch { /* play() will load the source. */ }
        setElapsed(0);
        setEnded(false);
        requestPlay('manual');
      },
      seek(seconds) {
        if (!ready || !Number.isFinite(media.duration)) return;
        try {
          media.currentTime = Math.max(0, Math.min(seconds, media.duration));
          setElapsed(media.currentTime);
          setEnded(media.ended);
          if (!media.paused) intent.current = 'manual';
        } catch {
          setNotice('Seeking is not available yet. The film is still loading.');
        }
      },
      sound() {
        if (!ready || !hasAudio) return;
        media.muted = !media.muted;
        if (!media.muted && !media.paused) intent.current = 'manual';
        setMuted(media.muted);
      },
      captions() {
        if (!captionsTrack || captionsTrack.readyState !== 2) return;
        const show = captionsTrack.track.mode !== 'showing';
        captionsTrack.track.mode = show ? 'showing' : 'hidden';
        setCaptionsOn(show);
      },
      fullscreen() {
        if (!ready) return;
        setNotice('');
        try {
          if (document.fullscreenElement === frame) {
            void document.exitFullscreen().catch(() => {
              if (!disposed) setNotice('Use your browser’s fullscreen control to return to the page.');
            });
          } else if (nativeFullscreen && media.webkitExitFullscreen) {
            media.webkitExitFullscreen();
          } else if (frame.requestFullscreen && document.fullscreenEnabled !== false) {
            void frame.requestFullscreen().catch(() => {
              if (!disposed) setNotice('Fullscreen is unavailable here. You can watch the film in this player.');
            });
          } else if (media.webkitEnterFullscreen) {
            media.webkitEnterFullscreen();
          }
        } catch {
          setNotice('Fullscreen is unavailable here. You can watch the film in this player.');
        }
      },
      retry() {
        if (!ready) return;
        fatalError = false;
        setFailed(false);
        setNotice('');
        media.load();
        requestPlay('manual');
      },
    };

    const listeners: [string, EventListener][] = [
      ['loadedmetadata', onMetadata], ['durationchange', onMetadata],
      ['timeupdate', onTime], ['seeked', onTime], ['playing', onPlaying],
      ['pause', onPause], ['ended', onEnded], ['waiting', onWaiting],
      ['volumechange', onVolume], ['error', onError],
      ['webkitbeginfullscreen', onNativeFullscreenStart],
      ['webkitendfullscreen', onNativeFullscreenEnd],
    ];
    for (const [name, listener] of listeners) media.addEventListener(name, listener);
    media.defaultMuted = true;
    if (!hasAudio || intent.current === 'automatic') media.muted = true;
    if (media.readyState >= 1) onMetadata();
    if (media.error) onError();

    const intersection = typeof IntersectionObserver === 'function'
      ? new IntersectionObserver(entries => {
        const entry = entries[0];
        if (!entry) return;
        onscreen = isFullscreen() || (entry.isIntersecting && entry.intersectionRatio >= 0.35);
        reconcile();
      }, { threshold: [0, 0.35, 1] })
      : null;
    intersection?.observe(media);
    if (!intersection) window.addEventListener('scroll', onViewport, { passive: true });
    window.addEventListener('resize', onViewport, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('fullscreenchange', onFullscreen);
    const attributes = typeof MutationObserver === 'function'
      ? new MutationObserver(onPreferenceChange)
      : null;
    attributes?.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
    if (motionQuery?.addEventListener) motionQuery.addEventListener('change', onPreferenceChange);
    else motionQuery?.addListener(onPreferenceChange);
    captionsTrack?.addEventListener('load', onTrackLoad);
    captionsTrack?.addEventListener('error', onTrackError);
    if (captionsTrack?.readyState === 2) onTrackLoad();
    if (captionsTrack?.readyState === 3) onTrackError();
    onscreen = measureVisibility();
    reconcile();

    return () => {
      disposed = true;
      playRequest += 1;
      driver.current = null;
      intersection?.disconnect();
      attributes?.disconnect();
      window.cancelAnimationFrame(viewportFrame);
      window.removeEventListener('scroll', onViewport);
      window.removeEventListener('resize', onViewport);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('fullscreenchange', onFullscreen);
      if (motionQuery?.removeEventListener) motionQuery.removeEventListener('change', onPreferenceChange);
      else motionQuery?.removeListener(onPreferenceChange);
      captionsTrack?.removeEventListener('load', onTrackLoad);
      captionsTrack?.removeEventListener('error', onTrackError);
      for (const [name, listener] of listeners) media.removeEventListener(name, listener);
      media.pause();
    };
  }, [ready, src, hasAudio, hasCaptions, captionsSrc]);

  const active = playing || pending;
  const playLabel = active ? 'Pause film' : ended ? 'Replay film' : 'Play film';
  const statusMessage = failed
    ? notice
    : notice || (buffering ? 'Buffering the film…' : !ready ? 'Confirm adult entry to play the film.' : '');

  return (
    <figure ref={host} className="hero-promo" aria-labelledby={`${id}-title`} data-playing={active} data-error={failed}>
      <div className="promo-screen">
        <video
          key={src}
          ref={video}
          id={`${id}-video`}
          className="promo-media"
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          muted={muted}
          controls={!enhanced && ready}
          tabIndex={enhanced || !ready ? -1 : 0}
          aria-label={title}
          aria-describedby={paragraphs.length ? `${id}-description` : undefined}
        >
          {hasCaptions && <track ref={track} kind="captions" src={captionsSrc} srcLang="en" label="English captions" default />}
          Your browser cannot play this film. {ready ? <a href={src}>Open the video file</a> : 'Confirm adult entry to access the film.'}
        </video>
        {failed && (
          <div className="promo-fallback">
            {!posterFailed && <img src={poster} alt="" onError={() => setPosterFailed(true)} />}
            <span>The film is taking a pause.</span>
          </div>
        )}
        {enhanced && !active && !failed && (
          <button
            type="button"
            className="promo-play-overlay"
            disabled={!ready}
            onClick={() => {
              mainControl.current?.focus({ preventScroll: true });
              driver.current?.toggle();
            }}
            aria-label={playLabel}
            aria-controls={`${id}-video`}
          >
            {ended ? <RotateCcw size={25} aria-hidden="true" /> : <Play size={25} aria-hidden="true" />}
            <span>{ended ? 'Watch again' : 'Play film'}</span>
          </button>
        )}
      </div>

      <figcaption className="promo-caption">
        <div className="promo-title-row">
          <strong id={`${id}-title`}>{title}</strong>
          <span>{durationLabel(duration, hasAudio)}</span>
        </div>
        {enhanced && (
          <div className="promo-controls" role="group" aria-label="Film controls">
            <button ref={mainControl} type="button" className="promo-control promo-main-control" disabled={!ready || failed}
              onClick={() => driver.current?.toggle()} aria-label={playLabel} aria-controls={`${id}-video`} title={playLabel}>
              {active ? <Pause size={17} aria-hidden="true" /> : ended ? <RotateCcw size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
            </button>
            <button type="button" className="promo-control promo-replay-control" disabled={!ready || failed}
              onClick={() => driver.current?.replay()} aria-label="Replay the film from the start" title="Replay from the start">
              <RotateCcw size={15} aria-hidden="true" />
            </button>
            <input
              className="promo-seek" type="range" min={0} max={duration || 1} step={0.1}
              value={Math.min(elapsed, duration || 1)} disabled={!ready || failed || duration === null}
              onChange={event => driver.current?.seek(Number(event.target.value))}
              aria-label="Film position" aria-valuetext={`${clock(elapsed)} of ${clock(duration)}`}
              aria-controls={`${id}-video`}
            />
            <span className="promo-time" aria-hidden="true">{clock(elapsed)} <span>/ {clock(duration)}</span></span>
            {hasAudio && (
              <button type="button" className="promo-control" disabled={!ready || failed}
                onClick={() => driver.current?.sound()} aria-label={muted ? 'Turn film sound on' : 'Mute film sound'}
                title={muted ? 'Turn sound on' : 'Mute sound'}>
                {muted ? <VolumeX size={17} aria-hidden="true" /> : <Volume2 size={17} aria-hidden="true" />}
              </button>
            )}
            {hasCaptions && (
              <button type="button" className="promo-control" disabled={captionStatus !== 'ready'}
                onClick={() => driver.current?.captions()} aria-label="Show English captions" aria-pressed={captionsOn}
                title={captionStatus === 'ready' ? captionsOn ? 'Hide captions' : 'Show captions' : 'Captions unavailable or loading'}>
                <Captions size={17} aria-hidden="true" />
              </button>
            )}
            {fullscreenAvailable && (
              <button type="button" className="promo-control" disabled={!ready || failed}
                onClick={() => driver.current?.fullscreen()} aria-label={fullscreen ? 'Exit film fullscreen' : 'Watch film fullscreen'}
                title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
                {fullscreen ? <Minimize size={17} aria-hidden="true" /> : <Maximize size={17} aria-hidden="true" />}
              </button>
            )}
          </div>
        )}
        <p className="promo-status" role="status" aria-live="polite">{statusMessage}</p>
        {failed && <button type="button" className="promo-retry" disabled={!ready} onClick={() => driver.current?.retry()}>Try loading the film again</button>}
        {hasCaptions && captionStatus === 'unavailable' && <p className="promo-caption-notice">Captions are unavailable. The written description remains below.</p>}
        {paragraphs.length > 0 && (
          <details className="promo-transcript">
            <summary>{transcriptLabel}</summary>
            <div id={`${id}-description`}>{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
          </details>
        )}
      </figcaption>
    </figure>
  );
}

export default HeroPromoVideo;
