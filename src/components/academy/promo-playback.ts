export type PlaybackIntent = 'automatic' | 'manual' | 'paused';
export type PlaybackPolicy = {
  ready: boolean;
  onscreen: boolean;
  visible: boolean;
  motionEnabled: boolean;
  reducedMotion: boolean;
  intent: PlaybackIntent;
  ended: boolean;
  failed: boolean;
  automaticBlocked: boolean;
  automaticAvailable: boolean;
};

/** Explicit Play overrides motion preferences, never the gate or visibility. */
export function shouldPlayPromo(policy: PlaybackPolicy): boolean {
  if (!policy.ready || !policy.onscreen || !policy.visible || policy.ended || policy.failed) return false;
  if (policy.intent === 'manual') return true;
  return policy.intent === 'automatic'
    && policy.motionEnabled
    && !policy.reducedMotion
    && !policy.automaticBlocked
    && policy.automaticAvailable;
}

type SessionStorage = Pick<Storage, 'getItem' | 'setItem'>;
type SessionOptions = {
  storage?: () => SessionStorage | null;
  memory?: Set<string>;
};
export type PromoPlaybackSession = {
  automaticAvailable: () => boolean;
  recordStarted: (intent: 'automatic' | 'manual') => void;
};

const playedInPage = new Set<string>();
const STORAGE_PREFIX = 'fsa:promo-played:v1:';
const browserStorage = () => typeof window === 'undefined' ? null : window.sessionStorage;

/** One successful start per source/tab, with resumption of this mounted automatic run. */
export function createPromoPlaybackSession(
  source: string,
  { storage = browserStorage, memory = playedInPage }: SessionOptions = {},
): PromoPlaybackSession {
  const key = `${STORAGE_PREFIX}${source}`;
  let automaticRunStarted = false;

  function alreadyStarted() {
    if (memory.has(source)) return true;
    try {
      if (storage()?.getItem(key) === '1') {
        memory.add(source);
        return true;
      }
    } catch { /* Browsers may deny even access to sessionStorage. */ }
    return false;
  }

  return {
    automaticAvailable: () => automaticRunStarted || !alreadyStarted(),
    recordStarted(intent) {
      if (intent === 'automatic') automaticRunStarted = true;
      memory.add(source);
      try { storage()?.setItem(key, '1'); } catch { /* Memory still covers in-page navigation. */ }
    },
  };
}
