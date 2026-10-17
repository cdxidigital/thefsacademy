'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { Pause, Play } from 'lucide-react';

type MotionPreference = 'system' | 'paused';
type MotionSnapshot = 'pending' | `${'reduced' | 'full'}:${MotionPreference}`;

const STORAGE_KEY = 'fsa:motion:v1';
const PREFERENCE_EVENT = 'fsa:motion-preference';
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';

// If storage is unavailable, the choice still works for this browser session.
let memoryPreference: MotionPreference | null = null;

function readPreference(): MotionPreference {
  if (memoryPreference !== null) return memoryPreference;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'paused' ? 'paused' : 'system';
  } catch {
    return 'system';
  }
}

function getSnapshot(): MotionSnapshot {
  const reduced = typeof window.matchMedia !== 'function' || window.matchMedia(REDUCED_QUERY).matches;
  return `${reduced ? 'reduced' : 'full'}:${readPreference()}`;
}

function getServerSnapshot(): MotionSnapshot {
  return 'pending';
}

function subscribe(onChange: () => void) {
  const media = typeof window.matchMedia === 'function' ? window.matchMedia(REDUCED_QUERY) : null;
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    memoryPreference = null;
    onChange();
  };
  if (media?.addEventListener) media.addEventListener('change', onChange);
  else media?.addListener(onChange);
  window.addEventListener('storage', onStorage);
  window.addEventListener(PREFERENCE_EVENT, onChange);
  return () => {
    if (media?.removeEventListener) media.removeEventListener('change', onChange);
    else media?.removeListener(onChange);
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(PREFERENCE_EVENT, onChange);
  };
}

function writePreference(preference: MotionPreference) {
  memoryPreference = preference;
  try {
    window.localStorage.setItem(STORAGE_KEY, preference);
    memoryPreference = null;
  } catch {
    // No storage access is required to pause decorative motion.
  }
  window.dispatchEvent(new Event(PREFERENCE_EVENT));
}

const REVEAL_SELECTOR = [
  '.section-heading',
  '.page-heading',
  '.course-card',
  '.manifesto-art',
  '.manifesto-copy',
  '.how-step',
  '.tutor-feature > div',
  '.membership-intro > div',
  '.numbers-band > div',
  '.closing > .eyebrow',
  '.closing > h2',
  '.closing > .button',
  '.library-feature',
  '.course-detail-hero > div',
  '.dashboard-grid > *',
  '.stat-grid > .stat-card',
  '.dashboard-bottom > *',
  '.badge-card',
  '.certificate-section > div',
  '.assessment-result',
].join(',');

const PROTECTED_CONTENT = '.reading-surface, .assessment-form, .chat-history, .worksheet-content, form';
const STAGGER_SELECTOR = '.course-card, .how-step, .stat-card, .numbers-band > div';
const COMPLETION_MESSAGE = /\b(?:chapter|lesson)\s+complete(?:d)?\b|\bcertificate\b.*\b(?:issued|earned|ready)\b/i;

/** Presentation only: never gates content, navigation, progress, or payments. */
export function MotionDirector({ routeKey, ready }: { routeKey: string; ready: boolean }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const resolved = snapshot !== 'pending';
  const reduced = snapshot.startsWith('reduced:');
  const paused = snapshot.endsWith(':paused');
  const active = ready && resolved && !reduced && !paused;
  const previousRoute = useRef<string | null>(null);
  const revealed = useRef(new WeakSet<Element>());
  const heroSeen = useRef(new WeakSet<Element>());
  const resultSeen = useRef(new WeakSet<Element>());

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.getAttribute('data-motion');
    root.setAttribute('data-motion', active ? 'on' : 'off');
    return () => {
      if (previous === null) root.removeAttribute('data-motion');
      else root.setAttribute('data-motion', previous);
    };
  }, [active]);

  useEffect(() => {
    const routeChanged = previousRoute.current !== null && previousRoute.current !== routeKey;
    previousRoute.current = routeKey;
    // No DOM observers are created before the age gate is ready or while paused.
    if (!active) return;
    const main = document.getElementById('main');
    if (!main) return;

    let disposed = false;
    let scanFrame = 0;
    const animations = new Map<Animation, Element>();
    const observing = new WeakSet<Element>();
    const pendingResults = new WeakSet<Element>();

    function animate(element: Element | null, frames: Keyframe[], options: KeyframeAnimationOptions) {
      if (!element || disposed || !element.isConnected || typeof element.animate !== 'function') return;
      if (document.visibilityState === 'hidden' || element.contains(document.activeElement)) return;
      try {
        const animation = element.animate(frames, { easing: EASE_OUT, fill: 'none', ...options });
        animations.set(animation, element);
        const forget = () => animations.delete(animation);
        animation.addEventListener('finish', forget, { once: true });
        animation.addEventListener('cancel', forget, { once: true });
      } catch {
        // Unsupported animation features must never affect the normal page.
      }
    }

    function fadeUp(element: Element, duration = 520, delay = 0, distance = 14) {
      const style = window.getComputedStyle(element);
      const endOpacity = Number.parseFloat(style.opacity) || 1;
      const baseTransform = style.transform === 'none' ? '' : style.transform;
      // Cards retain their independent hover lift. Rotated editorial panels
      // keep their existing transform and return to CSS after the animation.
      const opacityOnly = element.matches('.course-card, .badge-card');
      animate(element, [
        {
          opacity: endOpacity * 0.58,
          ...(opacityOnly ? {} : { transform: `translateY(${distance}px) ${baseTransform}`.trim() }),
        },
        {
          opacity: endOpacity,
          ...(opacityOnly ? {} : { transform: baseTransform || 'none' }),
        },
      ], { duration, delay, fill: delay ? 'backwards' : 'none' });
    }

    function settleIcon(element: Element | null) {
      if (!element) return;
      const base = window.getComputedStyle(element).transform;
      const suffix = base === 'none' ? '' : ` ${base}`;
      animate(element, [
        { transform: `scale(0.86)${suffix}`, opacity: 0.65 },
        { transform: `scale(1.06)${suffix}`, opacity: 1, offset: 0.6 },
        { transform: base === 'none' ? 'scale(1)' : base, opacity: 1 },
      ], { duration: 580 });
    }

    function reveal(element: Element) {
      if (revealed.current.has(element) || element.closest(PROTECTED_CONTENT)) return;
      revealed.current.add(element);
      const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
      const index = Math.max(0, siblings.indexOf(element));
      const delay = element.matches(STAGGER_SELECTOR) ? Math.min(index, 3) * 55 : 0;
      fadeUp(element, element.matches('.assessment-result') ? 350 : 520, delay);
      if (pendingResults.has(element)) {
        pendingResults.delete(element);
        settleIcon(element.querySelector('.result-icon > svg'));
      }
    }

    const intersection = typeof IntersectionObserver === 'function'
      ? new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          intersection?.unobserve(entry.target);
          reveal(entry.target);
        }
      }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' })
      : null;

    function discover(initial: boolean) {
      if (disposed) return;
      const hero = main?.querySelector('.hero');
      if (hero && !heroSeen.current.has(hero)) {
        heroSeen.current.add(hero);
        const rect = hero.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const image = hero.querySelector('.hero-image');
          if (image) {
            const base = window.getComputedStyle(image).transform;
            const suffix = base === 'none' ? '' : ` ${base}`;
            animate(image, [
              { transform: `scale(1.025)${suffix}` },
              { transform: base === 'none' ? 'scale(1)' : base },
            ], { duration: 1900 });
          }
          const stages: [string, number][] = [
            ['.hero-promo', 0],
            ['.hero-kicker', 60],
            ['h1', 130],
            ['.hero-content > p', 210],
            ['.hero-actions', 280],
            ['.hero-trust', 350],
            ['.hero-scroll', 450],
          ];
          for (const [selector, delay] of stages) {
            const element = hero.querySelector(selector);
            if (element) fadeUp(element, 650, delay, selector === 'h1' ? 18 : 10);
          }
          const orbit = hero.querySelector('.hero-orbit');
          if (orbit) {
            const opacity = Number.parseFloat(window.getComputedStyle(orbit).opacity) || 1;
            animate(orbit, [{ opacity: opacity * 0.45 }, { opacity }], { duration: 1600, delay: 180, fill: 'backwards' });
          }
        }
      }

      for (const element of main?.querySelectorAll(REVEAL_SELECTOR) || []) {
        if (element.closest(PROTECTED_CONTENT)) continue;
        if (element.matches('.assessment-result') && !resultSeen.current.has(element)) {
          resultSeen.current.add(element);
          // Only a newly inserted result gets an achievement gesture. Existing
          // saved progress, hydration, and resuming motion do not replay it.
          if (!initial && element.classList.contains('passed')) {
            pendingResults.add(element);
          }
        }
        if (revealed.current.has(element) || observing.has(element)) continue;
        if (initial && element.getBoundingClientRect().bottom <= 0) {
          revealed.current.add(element);
          continue;
        }
        if (intersection) {
          observing.add(element);
          intersection.observe(element);
        }
      }
    }

    if (routeChanged && routeKey !== '/') {
      // Opacity only: do not move reading surfaces or create a new containing
      // block. The existing route and its input state stay mounted normally.
      animate(main, [{ opacity: 0.88 }, { opacity: 1 }], { duration: 190 });
    }
    discover(true);

    const mutations = typeof MutationObserver === 'function'
      ? new MutationObserver(records => {
        const hasNewPresentation = records.some(record => Array.from(record.addedNodes).some(node =>
          node instanceof Element && (
            node.matches(`${REVEAL_SELECTOR},.hero`) || node.querySelector(`${REVEAL_SELECTOR},.hero`)
          ),
        ));
        if (!hasNewPresentation || scanFrame) return;
        scanFrame = window.requestAnimationFrame(() => {
          scanFrame = 0;
          discover(false);
        });
      })
      : null;
    mutations?.observe(main, { childList: true, subtree: true });

    const toast = document.querySelector('.academy .toast');
    let previousToast = toast?.textContent?.trim() || '';
    const toastMutations = toast && typeof MutationObserver === 'function'
      ? new MutationObserver(() => {
        const message = toast.textContent?.trim() || '';
        const changed = message !== previousToast;
        previousToast = message;
        if (!changed || !toast.classList.contains('show') || !COMPLETION_MESSAGE.test(message)) return;
        settleIcon(toast.querySelector(':scope > svg'));
        if (/\bcertificate\b/i.test(message)) {
          settleIcon(main.querySelector('.certificate-illustration > svg'));
        } else {
          settleIcon(main.querySelector('.lesson-complete > .button > svg'));
        }
      })
      : null;
    if (toast) toastMutations?.observe(toast, {
      childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class'],
    });

    function onFocus(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      for (const [animation, element] of animations) {
        if (element.contains(event.target)) animation.cancel();
      }
    }
    function cancelWhenHidden() {
      if (document.visibilityState !== 'hidden') return;
      for (const animation of animations.keys()) animation.cancel();
      animations.clear();
    }
    document.addEventListener('focusin', onFocus);
    document.addEventListener('visibilitychange', cancelWhenHidden);

    return () => {
      disposed = true;
      intersection?.disconnect();
      mutations?.disconnect();
      toastMutations?.disconnect();
      window.cancelAnimationFrame(scanFrame);
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('visibilitychange', cancelWhenHidden);
      for (const animation of animations.keys()) animation.cancel();
      animations.clear();
    };
  }, [active, routeKey]);

  if (!ready || !resolved) return null;

  const label = reduced ? 'Reduced motion' : paused ? 'Resume motion' : 'Pause motion';
  const description = reduced
    ? 'Your device requests reduced motion. Decorative motion is paused.'
    : paused
      ? 'Resume decorative motion. Your device’s reduced-motion preference is always respected.'
      : 'Pause decorative motion. Your choice is remembered on this device when storage is available.';

  return (
    <button
      type="button"
      className="motion-toggle"
      data-state={reduced ? 'reduced' : paused ? 'paused' : 'playing'}
      disabled={reduced}
      onClick={() => writePreference(paused ? 'system' : 'paused')}
      aria-label={reduced ? description : label}
      title={description}
    >
      {paused && !reduced ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
      <span>{label}</span>
    </button>
  );
}

export default MotionDirector;
