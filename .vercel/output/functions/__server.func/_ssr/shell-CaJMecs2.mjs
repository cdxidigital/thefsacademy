import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, p as useRouterState, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as FileText, B as Check, C as LoaderCircle, E as Heart, F as Clock, H as BookOpen, L as CircleCheckBig, M as Download, N as CreditCard, O as GraduationCap, P as Compass, R as ChevronRight, S as Lock, T as LayoutDashboard, U as ArrowUpRight, V as Captions, W as ArrowRight, _ as Minimize, a as Trophy, b as Maximize, c as Target, d as Settings, f as Search, g as Pause, i as UserRound, j as ExternalLink, k as Flag, l as Sparkles, m as Play, n as VolumeX, p as RotateCcw, r as Volume2, s as Trash2, t as X, u as ShieldCheck, v as MessageCircle, x as LogOut, y as Menu, z as ChevronDown } from "../_libs/lucide-react.mjs";
import { n as SecureAccountForm, r as authClient, t as AcademySignOut } from "./secure-account-v_ovAAF3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-CaJMecs2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Drop-in for the campus's previous router links. Keeps in-app navigation client-side. */
function Link$1({ href, children, onClick, target, ...rest }) {
	const router = useRouter();
	function click(event) {
		onClick?.(event);
		if (event.defaultPrevented) return;
		if (target && target !== "_self") return;
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
		if (!href.startsWith("/") || href.startsWith("//")) return;
		event.preventDefault();
		router.navigate({ href });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		target,
		...rest,
		onClick: click,
		children
	});
}
function useRouter$1() {
	const router = useRouter();
	return {
		push: (href) => {
			router.navigate({ href });
		},
		replace: (href) => {
			router.navigate({
				href,
				replace: true
			});
		}
	};
}
function useSearchParams() {
	const search = useRouterState({ select: (state) => state.location.searchStr });
	return new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
}
var moduleArt = {
	C01: {
		image: "connection",
		tone: "peach",
		tag: "THE FOUNDATION",
		short: "Consent & autonomy"
	},
	C02: {
		image: "boundaries",
		tone: "pink",
		tag: "FIND YOUR WORDS",
		short: "Communication & boundaries"
	},
	C03: {
		image: "bodies",
		tone: "cream",
		tag: "UNDERSTAND YOURSELF",
		short: "Bodies & anatomy"
	},
	C04: {
		image: "wellbeing",
		tone: "violet",
		tag: "MAKE SPACE FOR YOU",
		short: "Desire & wellbeing"
	},
	C05: {
		image: "bodies",
		tone: "sage",
		tag: "INFORMED CHOICES",
		short: "Sexual health & care"
	},
	C06: {
		image: "connection",
		tone: "pink",
		tag: "BETTER TOGETHER",
		short: "Relationships & agreements"
	},
	C07: {
		image: "connection",
		tone: "sage",
		tag: "EVERY BODY BELONGS",
		short: "Inclusive intimacy"
	},
	C08: {
		image: "wellbeing",
		tone: "cream",
		tag: "ON YOUR TERMS",
		short: "Access & changing bodies"
	},
	C09: {
		image: "boundaries",
		tone: "violet",
		tag: "EXPLORE WITH CARE",
		short: "Interests & kink literacy"
	},
	C10: {
		image: "boundaries",
		tone: "pink",
		tag: "CONNECTED & CONSIDERED",
		short: "Digital intimacy"
	},
	C11: {
		image: "wellbeing",
		tone: "peach",
		tag: "SUPPORT & UNDERSTANDING",
		short: "When sex is difficult"
	},
	C12: {
		image: "connection",
		tone: "cream",
		tag: "YOUR NEXT CHAPTER",
		short: "Putting learning into practice"
	},
	E01: {
		image: "wellbeing",
		tone: "pink",
		tag: "GO A LITTLE DEEPER",
		short: "Practical intimacy & pleasure"
	},
	E02: {
		image: "bodies",
		tone: "sage",
		tag: "INFORMED & PREPARED",
		short: "Sexual activities & health"
	},
	E03: {
		image: "connection",
		tone: "peach",
		tag: "MAKE YOUR OWN AGREEMENTS",
		short: "Nonmonogamy & shared settings"
	},
	E04: {
		image: "boundaries",
		tone: "violet",
		tag: "CLARITY BEFORE CURIOSITY",
		short: "Kink negotiation & power"
	},
	E05: {
		image: "boundaries",
		tone: "pink",
		tag: "CONNECT WITH CONFIDENCE",
		short: "Dating & digital choices"
	},
	E06: {
		image: "wellbeing",
		tone: "cream",
		tag: "ROOM FOR CHANGE",
		short: "Intimacy through change"
	}
};
var AcademyContext = (0, import_react.createContext)(null);
function useAcademy() {
	const context = (0, import_react.useContext)(AcademyContext);
	if (!context) throw new Error("Missing academy context");
	return context;
}
function Brand({ compact = false, glossy = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
		href: "/",
		className: `brand brand-image ${glossy ? "brand-glossy" : "brand-flat"} ${compact ? "compact" : ""}`,
		"aria-label": "fleshsesh academy home",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: glossy ? "/brand/glossy-master.png" : "/brand/flat-wordmark-light.png",
			alt: "fleshsesh academy",
			width: glossy ? 1299 : 1984,
			height: glossy ? 393 : 604
		})
	});
}
function ButtonLink({ href, children, variant = "primary", className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
		href,
		className: `button ${variant} ${className}`,
		children
	});
}
function Loading({ label = "Finding your next chapter…" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "loading",
		role: "status",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			size: 25,
			className: "spin"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: label })]
	});
}
function ErrorPanel({ message, retry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "notice error",
		role: "alert",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Let’s try that again." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: message }),
			retry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "button small outline",
				onClick: retry,
				children: "Try again"
			})
		]
	});
}
function Modal({ title, children, onClose, closeable = true }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const previous = document.activeElement;
		const old = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const timer = setTimeout(() => ref.current?.querySelector("button,a,input,select,textarea")?.focus(), 0);
		function onKey(e) {
			if (e.key === "Escape" && closeable) onClose();
			if (e.key === "Tab") {
				const els = Array.from(ref.current?.querySelectorAll("button:not([disabled]),a[href],input:not([disabled]),select,textarea,[tabindex=\"0\"]") || []);
				const first = els[0], last = els[els.length - 1];
				if (!first) {
					e.preventDefault();
					return;
				}
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		}
		document.addEventListener("keydown", onKey);
		return () => {
			clearTimeout(timer);
			document.body.style.overflow = old;
			document.removeEventListener("keydown", onKey);
			previous?.focus();
		};
	}, [onClose, closeable]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal-scrim",
		onMouseDown: (e) => {
			if (e.target === e.currentTarget && closeable) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref,
			className: "modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": title,
			children: [closeable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onClose,
				className: "icon-button modal-close",
				"aria-label": "Close dialog",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
			}), children]
		})
	});
}
function ModuleCard({ module, compact = false }) {
	const { me } = useAcademy();
	const art = moduleArt[module.id] || moduleArt.C01;
	const done = module.lessons?.filter((l) => me?.progress?.completedLessonIds?.includes(l.id)).length || 0;
	const count = module.lessonCount || module.lessons?.length || 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
		href: `/courses/${module.id}`,
		className: `course-card ${compact ? "compact-card" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `course-art ${art.tone}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: `/images/${art.image}.webp`,
					alt: "",
					loading: "lazy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "course-number",
					children: module.id.replace("C", "0").replace("E", "E/")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "course-pill",
					children: module.id === "C01" ? "Free to explore" : module.kind === "elective" ? "Deep dive" : "Foundations"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "course-image-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: art.tag }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: art.short })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "course-arrow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 20 })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "course-info",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "course-meta",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 13 }),
							count,
							" lessons"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 13 }),
							module.durationMinutes,
							" min"
						] }),
						done > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "accent",
							children: [
								done,
								"/",
								count,
								" complete"
							]
						})
					]
				}),
				!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: module.summary }),
				done > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "progress-track",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${done / Math.max(1, count) * 100}%` } })
				})
			]
		})]
	});
}
function PageHeading({ kicker, title, description, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-heading",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			kicker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: title }),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: description })
		] }), action]
	});
}
function SectionHeading({ kicker, title, description, href, label = "Explore all courses" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "section-heading",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: description })
		] }), href && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
			className: "text-link",
			href,
			children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 18 })]
		})]
	});
}
function FeatureCheck({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children })] });
}
function Breadcrumb({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "breadcrumb",
		"aria-label": "Breadcrumb",
		children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 13 }),
			" ",
			item.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
				href: item.href,
				children: item.label
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-current": "page",
				children: item.label
			})
		] }, i))
	});
}
var expectedLearner = null;
var latestMeRequest = 0;
function resetLearnerExpectation() {
	latestMeRequest += 1;
	expectedLearner = null;
}
function academyUrl(path) {
	if (typeof window === "undefined" || !path.startsWith("/")) return path;
	const host = window.location.hostname.toLowerCase();
	const match = host === "preview.grok.genai.mil" || host === "preview.grok.mil" || host === "preview.grokgsac.com" ? /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i.exec(window.location.pathname) : null;
	return match ? match[0] + path : path;
}
async function request(path, init) {
	const meRequest = path === "/api/me" ? ++latestMeRequest : null;
	const requestHeaders = new Headers(init?.headers);
	if (init?.body && !requestHeaders.has("Content-Type")) requestHeaders.set("Content-Type", "application/json");
	if (expectedLearner) requestHeaders.set("X-Academy-Learner", expectedLearner);
	if (typeof window !== "undefined") try {
		const token = window.sessionStorage.getItem("grok-auth.bearer-token");
		if (token && !requestHeaders.has("Authorization")) requestHeaders.set("Authorization", `Bearer ${token}`);
	} catch {}
	const response = await fetch(academyUrl(path), {
		credentials: "same-origin",
		...init,
		headers: requestHeaders
	});
	const raw = await response.json().catch(() => ({ error: "The service could not respond. Please try again." }));
	const data = raw && typeof raw === "object" ? raw : {};
	const nestedError = data.error && typeof data.error === "object" ? data.error.message : null;
	if (!response.ok) {
		const error = new Error(typeof data.error === "string" ? data.error : typeof data.message === "string" ? data.message : typeof nestedError === "string" ? nestedError : "Something went wrong. Please try again.");
		error.status = response.status;
		error.data = data;
		throw error;
	}
	if (meRequest !== null && meRequest === latestMeRequest && typeof window !== "undefined") {
		const user = data.user;
		expectedLearner = typeof user?.userId === "string" ? user.userId : null;
	}
	return data;
}
var post = (path, body) => request(path, {
	method: "POST",
	body: JSON.stringify(body)
});
async function openPrivateHtml(path, filename) {
	const headers = new Headers();
	if (typeof window !== "undefined") try {
		const token = window.sessionStorage.getItem("grok-auth.bearer-token");
		if (token) headers.set("Authorization", `Bearer ${token}`);
	} catch {}
	const response = await fetch(academyUrl(path), {
		credentials: "same-origin",
		headers
	});
	if (!response.ok) {
		const raw = await response.json().catch(() => null);
		const data = raw && typeof raw === "object" ? raw : null;
		const nested = data?.error && typeof data.error === "object" ? data.error.message : null;
		throw new Error(typeof data?.error === "string" ? data.error : typeof nested === "string" ? nested : "That document could not be opened.");
	}
	const blob = new Blob([await response.arrayBuffer()], { type: "text/html" });
	const url = URL.createObjectURL(blob);
	if (!window.open(url, "_blank", "noopener,noreferrer")) {
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = filename;
		anchor.click();
	}
	window.setTimeout(() => URL.revokeObjectURL(url), 6e4);
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	return useSessionUserState();
}
function useSessionUserState() {
	const { data, isPending } = authClient.useSession();
	const id = data?.user.id;
	const displayName = data?.user.name ?? null;
	const primaryEmail = data?.user.email ?? null;
	const profileImageUrl = data?.user.image ?? null;
	const user = (0, import_react.useMemo)(() => id ? {
		id,
		displayName,
		primaryEmail,
		profileImageUrl,
		isDevFallback: false
	} : null, [
		id,
		displayName,
		primaryEmail,
		profileImageUrl
	]);
	return (0, import_react.useMemo)(() => ({
		user,
		isPending
	}), [user, isPending]);
}
/** Explicit Play overrides motion preferences, never the gate or visibility. */
function shouldPlayPromo(policy) {
	if (!policy.ready || !policy.onscreen || !policy.visible || policy.ended || policy.failed) return false;
	if (policy.intent === "manual") return true;
	return policy.intent === "automatic" && policy.motionEnabled && !policy.reducedMotion && !policy.automaticBlocked && policy.automaticAvailable;
}
var playedInPage = /* @__PURE__ */ new Set();
var STORAGE_PREFIX = "fsa:promo-played:v1:";
var browserStorage = () => typeof window === "undefined" ? null : window.sessionStorage;
/** One successful start per source/tab, with resumption of this mounted automatic run. */
function createPromoPlaybackSession(source, { storage = browserStorage, memory = playedInPage } = {}) {
	const key = `${STORAGE_PREFIX}${source}`;
	let automaticRunStarted = false;
	function alreadyStarted() {
		if (memory.has(source)) return true;
		try {
			if (storage()?.getItem(key) === "1") {
				memory.add(source);
				return true;
			}
		} catch {}
		return false;
	}
	return {
		automaticAvailable: () => automaticRunStarted || !alreadyStarted(),
		recordStarted(intent) {
			if (intent === "automatic") automaticRunStarted = true;
			memory.add(source);
			try {
				storage()?.setItem(key, "1");
			} catch {}
		}
	};
}
var REDUCED_QUERY$1 = "(prefers-reduced-motion: reduce)";
var noSubscription = () => () => {};
var clientReady = () => true;
var serverReady = () => false;
function validDuration(value) {
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
}
function clock(seconds) {
	if (seconds === null || !Number.isFinite(seconds)) return "—:—";
	const value = Math.max(0, Math.floor(seconds));
	return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}
function durationLabel(seconds, hasAudio) {
	const edition = hasAudio ? "brand film" : "silent brand film";
	if (seconds === null) return edition;
	const rounded = Math.max(1, Math.round(seconds));
	if (rounded < 60) return `${rounded}-second ${edition}`;
	return `${clock(rounded)} ${edition}`;
}
function HeroPromoVideo({ ready = false, durationSeconds, transcript, transcriptLabel = "Read the film description", hasAudio = false, hasCaptions = false, src = "/media/academy-promo.mp4", poster = "/media/academy-promo-poster.webp", captionsSrc = "/media/academy-promo.vtt" }) {
	const id = (0, import_react.useId)();
	const enhanced = (0, import_react.useSyncExternalStore)(noSubscription, clientReady, serverReady);
	const host = (0, import_react.useRef)(null);
	const video = (0, import_react.useRef)(null);
	const track = (0, import_react.useRef)(null);
	const mainControl = (0, import_react.useRef)(null);
	const driver = (0, import_react.useRef)(null);
	const intent = (0, import_react.useRef)("automatic");
	const automaticBlocked = (0, import_react.useRef)(false);
	const playbackSession = (0, import_react.useRef)(null);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [buffering, setBuffering] = (0, import_react.useState)(false);
	const [ended, setEnded] = (0, import_react.useState)(false);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const [metadataDuration, setMetadataDuration] = (0, import_react.useState)(null);
	const [muted, setMuted] = (0, import_react.useState)(true);
	const [failed, setFailed] = (0, import_react.useState)(false);
	const [posterFailed, setPosterFailed] = (0, import_react.useState)(false);
	const [notice, setNotice] = (0, import_react.useState)("");
	const [captionStatus, setCaptionStatus] = (0, import_react.useState)("loading");
	const [captionsOn, setCaptionsOn] = (0, import_react.useState)(true);
	const [fullscreen, setFullscreen] = (0, import_react.useState)(false);
	const [fullscreenAvailable, setFullscreenAvailable] = (0, import_react.useState)(false);
	const duration = metadataDuration ?? validDuration(durationSeconds);
	const paragraphs = typeof transcript === "string" ? transcript.split(/\n\s*\n/).filter((paragraph) => paragraph.trim()) : transcript?.filter((paragraph) => paragraph.trim()) || [];
	(0, import_react.useEffect)(() => {
		const media = video.current;
		const frame = host.current;
		const captionsTrack = track.current;
		if (!media || !frame) return;
		if (playbackSession.current?.source !== src) {
			playbackSession.current = {
				source: src,
				session: createPromoPlaybackSession(src)
			};
			intent.current = "automatic";
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
			setNotice("");
			setCaptionStatus("loading");
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
		const motionQuery = typeof window.matchMedia === "function" ? window.matchMedia(REDUCED_QUERY$1) : null;
		let lastMotionEnabled = document.documentElement.dataset.motion === "on";
		let lastReduced = motionQuery?.matches ?? true;
		function isFullscreen() {
			return document.fullscreenElement === frame || nativeFullscreen;
		}
		function measureVisibility() {
			if (isFullscreen()) return true;
			const bounds = media.getBoundingClientRect();
			if (bounds.width <= 0 || bounds.height <= 0) return false;
			return Math.max(0, Math.min(bounds.right, window.innerWidth) - Math.max(bounds.left, 0)) * Math.max(0, Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0)) / (bounds.width * bounds.height) >= .35;
		}
		function policy() {
			return {
				ready,
				onscreen: isFullscreen() || onscreen,
				visible: document.visibilityState !== "hidden",
				motionEnabled: document.documentElement.dataset.motion === "on",
				reducedMotion: motionQuery?.matches ?? true,
				intent: intent.current,
				ended: media.ended,
				failed: fatalError,
				automaticBlocked: automaticBlocked.current,
				automaticAvailable: session.automaticAvailable()
			};
		}
		function pause(manual = false) {
			if (manual) intent.current = "paused";
			playRequest += 1;
			playPending = false;
			media.pause();
			if (!disposed) {
				setPending(false);
				setBuffering(false);
				setPlaying(false);
			}
		}
		function requestPlay(kind) {
			if (disposed || playPending) return;
			if (kind === "automatic" && frame.contains(document.activeElement)) return;
			intent.current = kind;
			onscreen = measureVisibility();
			if (!shouldPlayPromo(policy())) return;
			if (kind === "automatic") media.muted = true;
			playPending = true;
			const request = ++playRequest;
			setPending(true);
			setNotice("");
			try {
				Promise.resolve(media.play()).then(() => {
					if (disposed) return;
					if (request !== playRequest) {
						if (!shouldPlayPromo(policy())) media.pause();
						return;
					}
					playPending = false;
					setPending(false);
					if (!shouldPlayPromo(policy())) pause();
				}).catch((error) => {
					if (disposed || request !== playRequest) return;
					playPending = false;
					setPending(false);
					setPlaying(false);
					if (kind === "automatic") automaticBlocked.current = true;
					intent.current = "paused";
					if (error instanceof DOMException && error.name === "AbortError") return;
					setNotice(kind === "automatic" ? "Choose Play to watch the brand film." : "Playback could not start. Try Play again, or read the film description.");
				});
			} catch {
				playPending = false;
				setPending(false);
				intent.current = "paused";
				if (kind === "automatic") automaticBlocked.current = true;
				setNotice("Choose Play to watch the brand film.");
			}
		}
		function reconcile() {
			if (disposed) return;
			const current = policy();
			if (!current.ready || !current.onscreen || !current.visible) {
				if (intent.current === "manual") intent.current = "paused";
				if (!media.paused || playPending) pause();
				return;
			}
			if (!shouldPlayPromo(current)) {
				if (!media.paused || playPending) pause();
				return;
			}
			if (media.paused && !playPending && intent.current === "automatic") requestPlay("automatic");
		}
		function onPreferenceChange() {
			const motionEnabled = document.documentElement.dataset.motion === "on";
			const reduced = motionQuery?.matches ?? true;
			if (lastMotionEnabled && !motionEnabled || !lastReduced && reduced) {
				if (intent.current === "manual") intent.current = "paused";
			}
			lastMotionEnabled = motionEnabled;
			lastReduced = reduced;
			reconcile();
		}
		function onMetadata() {
			setMetadataDuration(validDuration(media.duration));
			setElapsed(Number.isFinite(media.currentTime) ? media.currentTime : 0);
			setFullscreenAvailable(typeof frame.requestFullscreen === "function" && document.fullscreenEnabled !== false || typeof media.webkitEnterFullscreen === "function");
		}
		function onTime() {
			setElapsed(Number.isFinite(media.currentTime) ? media.currentTime : 0);
		}
		function onPlaying() {
			if (nativeFullscreen && !playPending && ready) intent.current = "manual";
			if (!shouldPlayPromo(policy())) {
				pause();
				return;
			}
			if (intent.current !== "paused") session.recordStarted(intent.current);
			playPending = false;
			setPending(false);
			setBuffering(false);
			setPlaying(true);
			setEnded(false);
		}
		function onPause() {
			if (nativeFullscreen && !playPending && shouldPlayPromo(policy())) intent.current = "paused";
			setPlaying(false);
			setBuffering(false);
		}
		function onEnded() {
			intent.current = "paused";
			playPending = false;
			setPlaying(false);
			setPending(false);
			setBuffering(false);
			setEnded(true);
			onTime();
		}
		function onWaiting() {
			if (!media.paused) setBuffering(true);
		}
		function onVolume() {
			if (!hasAudio && !media.muted) media.muted = true;
			if (hasAudio && !media.muted && !media.paused) intent.current = "manual";
			setMuted(media.muted);
		}
		function onError() {
			fatalError = true;
			intent.current = "paused";
			pause();
			setFailed(true);
			setNotice("The film could not be loaded. You can try again or read the description below.");
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
			captionsTrack.track.mode = "showing";
			setCaptionStatus("ready");
			setCaptionsOn(true);
		}
		function onTrackError() {
			setCaptionStatus("unavailable");
		}
		driver.current = {
			toggle() {
				if (!ready) return;
				if (!media.paused || playPending) {
					pause(true);
					return;
				}
				if (media.ended) {
					try {
						media.currentTime = 0;
					} catch {}
					setEnded(false);
				}
				requestPlay("manual");
			},
			replay() {
				if (!ready) return;
				pause();
				try {
					media.currentTime = 0;
				} catch {}
				setElapsed(0);
				setEnded(false);
				requestPlay("manual");
			},
			seek(seconds) {
				if (!ready || !Number.isFinite(media.duration)) return;
				try {
					media.currentTime = Math.max(0, Math.min(seconds, media.duration));
					setElapsed(media.currentTime);
					setEnded(media.ended);
					if (!media.paused) intent.current = "manual";
				} catch {
					setNotice("Seeking is not available yet. The film is still loading.");
				}
			},
			sound() {
				if (!ready || !hasAudio) return;
				media.muted = !media.muted;
				if (!media.muted && !media.paused) intent.current = "manual";
				setMuted(media.muted);
			},
			captions() {
				if (!captionsTrack || captionsTrack.readyState !== 2) return;
				const show = captionsTrack.track.mode !== "showing";
				captionsTrack.track.mode = show ? "showing" : "hidden";
				setCaptionsOn(show);
			},
			fullscreen() {
				if (!ready) return;
				setNotice("");
				try {
					if (document.fullscreenElement === frame) document.exitFullscreen().catch(() => {
						if (!disposed) setNotice("Use your browser’s fullscreen control to return to the page.");
					});
					else if (nativeFullscreen && media.webkitExitFullscreen) media.webkitExitFullscreen();
					else if (frame.requestFullscreen && document.fullscreenEnabled !== false) frame.requestFullscreen().catch(() => {
						if (!disposed) setNotice("Fullscreen is unavailable here. You can watch the film in this player.");
					});
					else if (media.webkitEnterFullscreen) media.webkitEnterFullscreen();
				} catch {
					setNotice("Fullscreen is unavailable here. You can watch the film in this player.");
				}
			},
			retry() {
				if (!ready) return;
				fatalError = false;
				setFailed(false);
				setNotice("");
				media.load();
				requestPlay("manual");
			}
		};
		const listeners = [
			["loadedmetadata", onMetadata],
			["durationchange", onMetadata],
			["timeupdate", onTime],
			["seeked", onTime],
			["playing", onPlaying],
			["pause", onPause],
			["ended", onEnded],
			["waiting", onWaiting],
			["volumechange", onVolume],
			["error", onError],
			["webkitbeginfullscreen", onNativeFullscreenStart],
			["webkitendfullscreen", onNativeFullscreenEnd]
		];
		for (const [name, listener] of listeners) media.addEventListener(name, listener);
		media.defaultMuted = true;
		if (!hasAudio || intent.current === "automatic") media.muted = true;
		if (media.readyState >= 1) onMetadata();
		if (media.error) onError();
		const intersection = typeof IntersectionObserver === "function" ? new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (!entry) return;
			onscreen = isFullscreen() || entry.isIntersecting && entry.intersectionRatio >= .35;
			reconcile();
		}, { threshold: [
			0,
			.35,
			1
		] }) : null;
		intersection?.observe(media);
		if (!intersection) window.addEventListener("scroll", onViewport, { passive: true });
		window.addEventListener("resize", onViewport, { passive: true });
		document.addEventListener("visibilitychange", onVisibility);
		document.addEventListener("fullscreenchange", onFullscreen);
		const attributes = typeof MutationObserver === "function" ? new MutationObserver(onPreferenceChange) : null;
		attributes?.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-motion"]
		});
		if (motionQuery?.addEventListener) motionQuery.addEventListener("change", onPreferenceChange);
		else motionQuery?.addListener(onPreferenceChange);
		captionsTrack?.addEventListener("load", onTrackLoad);
		captionsTrack?.addEventListener("error", onTrackError);
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
			window.removeEventListener("scroll", onViewport);
			window.removeEventListener("resize", onViewport);
			document.removeEventListener("visibilitychange", onVisibility);
			document.removeEventListener("fullscreenchange", onFullscreen);
			if (motionQuery?.removeEventListener) motionQuery.removeEventListener("change", onPreferenceChange);
			else motionQuery?.removeListener(onPreferenceChange);
			captionsTrack?.removeEventListener("load", onTrackLoad);
			captionsTrack?.removeEventListener("error", onTrackError);
			for (const [name, listener] of listeners) media.removeEventListener(name, listener);
			media.pause();
		};
	}, [
		ready,
		src,
		hasAudio,
		hasCaptions,
		captionsSrc
	]);
	const active = playing || pending;
	const playLabel = active ? "Pause brand film" : ended ? "Replay brand film" : "Play brand film";
	const statusMessage = failed ? notice : notice || (buffering ? "Buffering the film…" : !ready ? "Confirm adult entry to play the film." : "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		ref: host,
		className: "hero-promo",
		"aria-labelledby": `${id}-title`,
		"data-playing": active,
		"data-error": failed,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "promo-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("video", {
					ref: video,
					id: `${id}-video`,
					className: "promo-media",
					src,
					poster,
					preload: "metadata",
					playsInline: true,
					muted,
					controls: !enhanced && ready,
					tabIndex: enhanced || !ready ? -1 : 0,
					"aria-label": "Academy brand film",
					"aria-describedby": paragraphs.length ? `${id}-description` : void 0,
					children: [
						hasCaptions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("track", {
							ref: track,
							kind: "captions",
							src: captionsSrc,
							srcLang: "en",
							label: "English captions",
							default: true
						}),
						"Your browser cannot play this film. ",
						ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: src,
							children: "Open the video file"
						}) : "Confirm adult entry to access the film."
					]
				}, src),
				failed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "promo-fallback",
					children: [!posterFailed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: poster,
						alt: "",
						onError: () => setPosterFailed(true)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "The film is taking a pause." })]
				}),
				enhanced && !active && !failed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "promo-play-overlay",
					disabled: !ready,
					onClick: () => {
						mainControl.current?.focus({ preventScroll: true });
						driver.current?.toggle();
					},
					"aria-label": playLabel,
					"aria-controls": `${id}-video`,
					children: [ended ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
						size: 25,
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
						size: 25,
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ended ? "Watch again" : "Play film" })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
			className: "promo-caption",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "promo-title-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						id: `${id}-title`,
						children: "Academy brand film"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: durationLabel(duration, hasAudio) })]
				}),
				enhanced && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "promo-controls",
					role: "group",
					"aria-label": "Brand film controls",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							ref: mainControl,
							type: "button",
							className: "promo-control promo-main-control",
							disabled: !ready || failed,
							onClick: () => driver.current?.toggle(),
							"aria-label": playLabel,
							"aria-controls": `${id}-video`,
							title: playLabel,
							children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
								size: 17,
								"aria-hidden": "true"
							}) : ended ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
								size: 17,
								"aria-hidden": "true"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
								size: 17,
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "promo-control promo-replay-control",
							disabled: !ready || failed,
							onClick: () => driver.current?.replay(),
							"aria-label": "Replay brand film from the start",
							title: "Replay from the start",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
								size: 15,
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "promo-seek",
							type: "range",
							min: 0,
							max: duration || 1,
							step: .1,
							value: Math.min(elapsed, duration || 1),
							disabled: !ready || failed || duration === null,
							onChange: (event) => driver.current?.seek(Number(event.target.value)),
							"aria-label": "Film position",
							"aria-valuetext": `${clock(elapsed)} of ${clock(duration)}`,
							"aria-controls": `${id}-video`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "promo-time",
							"aria-hidden": "true",
							children: [
								clock(elapsed),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["/ ", clock(duration)] })
							]
						}),
						hasAudio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "promo-control",
							disabled: !ready || failed,
							onClick: () => driver.current?.sound(),
							"aria-label": muted ? "Turn film sound on" : "Mute film sound",
							title: muted ? "Turn sound on" : "Mute sound",
							children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {
								size: 17,
								"aria-hidden": "true"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
								size: 17,
								"aria-hidden": "true"
							})
						}),
						hasCaptions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "promo-control",
							disabled: captionStatus !== "ready",
							onClick: () => driver.current?.captions(),
							"aria-label": "Show English captions",
							"aria-pressed": captionsOn,
							title: captionStatus === "ready" ? captionsOn ? "Hide captions" : "Show captions" : "Captions unavailable or loading",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Captions, {
								size: 17,
								"aria-hidden": "true"
							})
						}),
						fullscreenAvailable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "promo-control",
							disabled: !ready || failed,
							onClick: () => driver.current?.fullscreen(),
							"aria-label": fullscreen ? "Exit film fullscreen" : "Watch film fullscreen",
							title: fullscreen ? "Exit fullscreen" : "Fullscreen",
							children: fullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize, {
								size: 17,
								"aria-hidden": "true"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize, {
								size: 17,
								"aria-hidden": "true"
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "promo-status",
					role: "status",
					"aria-live": "polite",
					children: statusMessage
				}),
				failed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "promo-retry",
					disabled: !ready,
					onClick: () => driver.current?.retry(),
					children: "Try loading the film again"
				}),
				hasCaptions && captionStatus === "unavailable" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "promo-caption-notice",
					children: "Captions are unavailable. The written description remains below."
				}),
				paragraphs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "promo-transcript",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: transcriptLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						id: `${id}-description`,
						children: paragraphs.map((paragraph, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: paragraph }, index))
					})]
				})
			]
		})]
	});
}
function Landing({ ready = false, retryCatalog }) {
	const { catalog, identity, me, loadError } = useAcademy();
	const learnerHref = identity ? me?.profile ? "/dashboard" : "/onboarding" : "/signup";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hero",
			"aria-label": "Welcome to fleshsesh academy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "hero-image",
					src: "/images/ecampus.webp",
					alt: "A cinematic virtual campus with a softly lit library, tiered study spaces and welcoming lounges",
					width: 1672,
					height: 941,
					fetchPriority: "high"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hero-vignette",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hero-kicker",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), "YOUR CURIOSITY BELONGS HERE"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
							"Know more.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Feel more.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Be you." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A new kind of education for your most human questions. Explore consent, connection and sexual wellbeing — on your terms." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hero-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
								href: learnerHref,
								children: [identity && me?.profile ? "Continue your learning" : "Find your first chapter", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 19 })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								className: "hero-secondary",
								href: "/library",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 18 }), "Explore the Academy"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hero-trust",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }), "Start free"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 13 }), "Your learning. Your space."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "18+" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							className: "hero-demo-link",
							href: "/demo",
							children: ["Try the Academy Plus demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroPromoVideo, {
					ready,
					src: "/media/academy-new-chapter-v2.mp4",
					poster: "/media/academy-new-chapter-v2-poster.webp",
					durationSeconds: 25,
					hasAudio: false,
					transcript: [
						"A new, silent promotional film for the Adult Sexual Wellbeing Foundations curriculum. The imagined campus and fictional adult learners are AI-generated; the supplied Academy logo and curriculum titles are added separately. There is no spoken dialogue or music.",
						"0:00–0:05 — The camera moves through a charcoal-and-brass archway into a warmly lit campus library with curved stairs. Text: “Your curiosity belongs here.” “Know more.” “Consent, bodies and sexual wellbeing.”",
						"0:05–0:10 — Three fully clothed adults have a relaxed conversation around a lounge table. Text: “Open minds. Better connections.” “Feel more.” “Communication, boundaries and relationships.”",
						"0:10–0:14 — An open book rests beside a polished brass ribbon and a softly glowing pink orb. Text: “Learn at your own pace.” “Be you.” “Identity, inclusion and informed choice.”",
						"0:14–0:20 — The scene fades to a dark curriculum card: “Adult Sexual Wellbeing Foundations.” “48 written lessons.” “18 modules.” “12 core modules · 6 elective deep dives.” “Foundations Tutor · Practice Coach · Assessment Tutor.” “Fictional practice · Knowledge checks · Private progress.”",
						"0:20–0:25 — The glossy pink-and-gold fleshsesh academy logo fades in. Text: “There is room for your questions.” “Know more. Feel more. Be you.” “Your next chapter starts here.” “Non-accredited adult education · 18+.”"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "hero-scroll",
					href: "#discover",
					children: ["SCROLL TO DISCOVER ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hero-campus-label",
					children: "YOUR DIGITAL CAMPUS"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "statement-bar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Curiosity without judgement." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tiny-star",
					children: "✳"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Confidence without pressure." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tiny-star",
					children: "✳"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Every body. Every identity." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tiny-star",
					children: "✳"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your pace, always." })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "content-section",
			id: "discover",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				kicker: "A GOOD PLACE TO BEGIN",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Big questions.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Thoughtful answers." })
				] }),
				description: "Short lessons that make room for the things we weren’t always taught.",
				href: "/library"
			}), loadError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, {
				message: loadError,
				retry: retryCatalog
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "course-grid featured",
				children: catalog ? catalog.modules.slice(0, 4).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleCard, { module: m }, m.id)) : Array.from({ length: 4 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton course-skeleton" }, i))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "manifesto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "manifesto-art",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/connection.webp",
					alt: "Two hands reaching toward one another in warm light",
					loading: "lazy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Connection begins",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "with understanding." })
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "manifesto-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "LESS AWKWARD. MORE HUMAN."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"You don’t need",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"all the answers.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Just a little curiosity." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Maybe you want to find your words. Understand your body. Set a boundary. Or ask a question you’ve never felt comfortable asking." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "There’s room for all of that here. No expectations about who you are, who you love or how much experience you have." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
						href: "/about",
						variant: "outline",
						children: ["A different kind of Academy", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 18 })]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "content-section how-section",
			id: "how-it-works",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				kicker: "SMALL CHAPTERS. REAL UNDERSTANDING.",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"A little learning.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "A lot to take with you." })
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "how-grid",
				children: [
					{
						n: "01",
						icon: Compass,
						t: "Find your starting point",
						p: "Follow the foundations or explore a topic that’s on your mind. Start with consent, free."
					},
					{
						n: "02",
						icon: BookOpen,
						t: "Make it your own",
						p: "Read a short lesson, explore a scenario and ask the lesson guide to help make an idea clear."
					},
					{
						n: "03",
						icon: Sparkles,
						t: "See yourself grow",
						p: "Build understanding with knowledge checks. Earn private milestones and an assessed certificate of completion."
					}
				].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "how-step",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "step-top",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: x.n }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(x.icon, { size: 26 })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: x.t }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: x.p })
					]
				}, x.n))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "tutor-feature",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "A QUESTION IS A GOOD BEGINNING"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
					"Sometimes, you just",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"need to ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "ask." })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Meet three guides with distinct teaching styles. Learn with the Foundations Tutor, rehearse a fictional conversation with the Practice Coach, or review your learning with the Assessment Tutor." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
					href: "/tutor",
					children: ["Meet your tutors", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 18 })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Education, with clear limits. No personal disclosure required." })
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "tutor-preview",
				"aria-label": "Illustrative lesson guide conversation",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "guide-header",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "guide-avatar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 23 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Your lesson guide" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ILLUSTRATIVE EXAMPLE" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "chat-bubble example-user",
						children: "How do I say no without feeling awkward?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "chat-bubble example-guide",
						children: [
							"You don’t need an elaborate explanation. Try: “I’d like to spend time with you, but I’m not comfortable with that.”",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"A boundary can be kind and clear at the same time.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "source-chip",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 12 }), "Consent and autonomy"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "preview-input",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your questions are welcome here." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 18 })]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "content-section membership-intro",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "MORE UNDERSTANDING. LESS OVERTHINKING."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
					"Your next chapter",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"starts ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "from free." })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Try the foundations. Choose a single module. Or make space for your learning with an Academy membership." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
					href: "/pricing",
					children: ["Find your membership", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 18 })]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "membership-price",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ACADEMY MEMBERSHIP" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["A$19", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "/ month" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"All 48 written lessons. Your own pace.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"A whole new way to understand."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "subtle-tag",
						children: "Proposed launch pricing · AUD"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "numbers-band",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "48" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "thoughtful lessons" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "18" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "topics to explore" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "114" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "knowledge & assessment questions" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "You." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "at the centre of it all" })] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "closing",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "NO ONE HAS YOU FIGURED OUT LIKE YOU WILL."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
					"Let’s get a little",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "more comfortable." })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
					href: learnerHref,
					children: [identity && me?.profile ? "Back to my learning" : "Start your free chapter", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 18 })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No card needed. No pressure to keep going." })
			]
		})
	] });
}
function Library() {
	const { catalog, loadError } = useAcademy();
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const modules = catalog?.modules.filter((m) => (filter === "all" || m.kind === filter || filter === "free" && m.id === "C01") && `${m.title} ${m.summary}`.toLowerCase().includes(query.toLowerCase())) || [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {
				kicker: "THE COURSE LIBRARY",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Follow your ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "curiosity." })] }),
				description: "18 modules. 48 written lessons. One very personal journey. Start with the foundations, then make it your own."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "library-feature",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "YOUR FIRST CHAPTER · FREE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"Good connection starts",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"with ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "clear consent." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Three thoughtful lessons on choice, autonomy and checking in. A useful place for everyone to begin." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
						href: "/courses/C01",
						children: ["Explore consent & autonomy", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/connection.webp",
					alt: "Hands reaching toward one another"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "library-tools",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "filter-tabs",
					"aria-label": "Filter modules",
					children: [
						["all", "All topics"],
						["core", "Foundations"],
						["elective", "Deep dives"],
						["free", "Free to explore"]
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: filter === id ? "active" : "",
						onClick: () => setFilter(id),
						"aria-pressed": filter === id,
						children: label
					}, id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "search-box",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Find something on your mind…",
						"aria-label": "Search modules"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "results-label",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					modules.length,
					" ",
					modules.length === 1 ? "module" : "modules",
					" to explore"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 13 }), "Read at your own pace"] })]
			}),
			loadError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, { message: loadError }) : !catalog ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, {}) : modules.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "course-grid",
				children: modules.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleCard, { module: m }, m.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "empty-state",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 28 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "A different way to ask?" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Try a broader word, like consent, relationships or bodies." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "button outline",
						onClick: () => {
							setQuery("");
							setFilter("all");
						},
						children: "Show all topics"
					})
				]
			})
		]
	});
}
function Course({ id }) {
	const { catalog, me, checkout } = useAcademy();
	const module = catalog?.modules.find((m) => m.id === id);
	if (!catalog) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, {});
	if (!module) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, { message: "That module isn’t in the current curriculum." });
	const art = moduleArt[id] || moduleArt.C01;
	const completed = me?.progress?.completedLessonIds || [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
				className: "text-link back-link",
				href: "/library",
				children: "← All topics"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "course-detail-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "eyebrow",
						children: [
							module.kind === "core" ? "FOUNDATIONS" : "DEEP DIVE",
							" / ",
							id
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
						art.short.split(" & ")[0],
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: art.short.includes(" & ") ? "& " + art.short.split(" & ").slice(1).join(" & ") : "On your terms." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: module.summary }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "course-detail-meta",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 16 }),
								module.lessonCount,
								" written lessons"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [module.durationMinutes, " minutes"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: id === "C01" ? "Free to explore" : catalog.mode === "pilot" ? "Open during the beta" : "Included in membership" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
						href: `/learn/${module.lessons[0]?.id}`,
						children: ["Start this chapter", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `detail-art ${art.tone}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: `/images/${art.image}.webp`,
						alt: ""
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "two-column",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Inside this chapter" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: "Read, reflect privately, and check what you’ve learned."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lesson-list",
						children: [module.lessons.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							href: `/learn/${l.id}`,
							className: "lesson-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `lesson-index ${completed.includes(l.id) ? "done" : ""}`,
									children: completed.includes(l.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 }) : String(i + 1).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									"LESSON ",
									i + 1,
									" · ",
									l.durationMinutes,
									" MIN"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: l.title })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 20 })
							]
						}, l.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							href: `/assessment/${module.assessmentId}`,
							className: "lesson-row assessment-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "lesson-index",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { size: 20 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "MAKE IT STICK" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Chapter knowledge check" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										module.passingScore,
										" of ",
										module.questionCount,
										" correct · Unlimited retries"
									] })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 20 })
							]
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "panel learn-your-way",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 28 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Learning, on your terms." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "check-list",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "Text lessons with clear source references" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "Fictional examples welcome" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "Private optional reflection" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "No time limits or lost streaks" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "Knowledge checks with explanations" })
							]
						}),
						id !== "C01" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Prefer one topic at a time?" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "button outline full",
								onClick: () => checkout(`module:${id}`, `${art.short} · Single module`, 7),
								children: "Explore one-off access · A$7"
							})
						] })
					]
				})]
			})
		]
	});
}
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section about-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {
				kicker: "WHY WE’RE HERE",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Some things deserve",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "a better conversation." })
				] }),
				description: "fleshsesh academy makes room for the questions people carry about consent, bodies, connection and sexual wellbeing."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				className: "about-image",
				src: "/images/academy-hero.webp",
				alt: "An open terracotta loop in soft cinematic light"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "prose about-prose",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Open minds. Clear information." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We believe adults deserve education that is inclusive, practical and free from assumptions about their identity, relationships or experience. Curiosity belongs here. So does uncertainty. So does a confident no." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The Academy brings together 12 foundation modules and six deeper explorations, with short teaching texts, fictional scenarios, optional private reflection and knowledge checks." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "You set the pace." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Take a break whenever you need one. Use a fictional example. Leave a private exercise blank. You never need to share a sexual history, intimate image, health condition or personal relationship detail to complete this course." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Clear about what completion means." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Successful assessment leads to an Academy Certificate of Completion. This is non-accredited adult education. It is not an AQF qualification, a professional licence or a statement that someone is a safe partner." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Built with care. Released with care." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This beta contains the written curriculum. Specialist clinical and legal release reviews remain pending. Audio and video lessons have not yet been produced. The cinematic artwork supports the experience; the learning is currently text based." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
						href: "/library",
						children: ["Find your first chapter", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 })]
					})
				]
			})
		]
	});
}
var STORAGE_KEY = "fsa:motion:v1";
var PREFERENCE_EVENT = "fsa:motion-preference";
var REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
var EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
var memoryPreference = null;
function readPreference() {
	if (memoryPreference !== null) return memoryPreference;
	try {
		return window.localStorage.getItem(STORAGE_KEY) === "paused" ? "paused" : "system";
	} catch {
		return "system";
	}
}
function getSnapshot() {
	return `${typeof window.matchMedia !== "function" || window.matchMedia(REDUCED_QUERY).matches ? "reduced" : "full"}:${readPreference()}`;
}
function getServerSnapshot() {
	return "pending";
}
function subscribe(onChange) {
	const media = typeof window.matchMedia === "function" ? window.matchMedia(REDUCED_QUERY) : null;
	const onStorage = (event) => {
		if (event.key !== null && event.key !== STORAGE_KEY) return;
		memoryPreference = null;
		onChange();
	};
	if (media?.addEventListener) media.addEventListener("change", onChange);
	else media?.addListener(onChange);
	window.addEventListener("storage", onStorage);
	window.addEventListener(PREFERENCE_EVENT, onChange);
	return () => {
		if (media?.removeEventListener) media.removeEventListener("change", onChange);
		else media?.removeListener(onChange);
		window.removeEventListener("storage", onStorage);
		window.removeEventListener(PREFERENCE_EVENT, onChange);
	};
}
function writePreference(preference) {
	memoryPreference = preference;
	try {
		window.localStorage.setItem(STORAGE_KEY, preference);
		memoryPreference = null;
	} catch {}
	window.dispatchEvent(new Event(PREFERENCE_EVENT));
}
var REVEAL_SELECTOR = [
	".section-heading",
	".page-heading",
	".course-card",
	".manifesto-art",
	".manifesto-copy",
	".how-step",
	".tutor-feature > div",
	".membership-intro > div",
	".numbers-band > div",
	".closing > .eyebrow",
	".closing > h2",
	".closing > .button",
	".library-feature",
	".course-detail-hero > div",
	".dashboard-grid > *",
	".stat-grid > .stat-card",
	".dashboard-bottom > *",
	".badge-card",
	".certificate-section > div",
	".assessment-result"
].join(",");
var PROTECTED_CONTENT = ".reading-surface, .assessment-form, .chat-history, .worksheet-content, form";
var STAGGER_SELECTOR = ".course-card, .how-step, .stat-card, .numbers-band > div";
var COMPLETION_MESSAGE = /\b(?:chapter|lesson)\s+complete(?:d)?\b|\bcertificate\b.*\b(?:issued|earned|ready)\b/i;
/** Presentation only: never gates content, navigation, progress, or payments. */
function MotionDirector({ routeKey, ready }) {
	const snapshot = (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
	const resolved = snapshot !== "pending";
	const reduced = snapshot.startsWith("reduced:");
	const paused = snapshot.endsWith(":paused");
	const active = ready && resolved && !reduced && !paused;
	const previousRoute = (0, import_react.useRef)(null);
	const revealed = (0, import_react.useRef)(/* @__PURE__ */ new WeakSet());
	const heroSeen = (0, import_react.useRef)(/* @__PURE__ */ new WeakSet());
	const resultSeen = (0, import_react.useRef)(/* @__PURE__ */ new WeakSet());
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		const previous = root.getAttribute("data-motion");
		root.setAttribute("data-motion", active ? "on" : "off");
		return () => {
			if (previous === null) root.removeAttribute("data-motion");
			else root.setAttribute("data-motion", previous);
		};
	}, [active]);
	(0, import_react.useEffect)(() => {
		const routeChanged = previousRoute.current !== null && previousRoute.current !== routeKey;
		previousRoute.current = routeKey;
		if (!active) return;
		const main = document.getElementById("main");
		if (!main) return;
		let disposed = false;
		let scanFrame = 0;
		const animations = /* @__PURE__ */ new Map();
		const observing = /* @__PURE__ */ new WeakSet();
		const pendingResults = /* @__PURE__ */ new WeakSet();
		function animate(element, frames, options) {
			if (!element || disposed || !element.isConnected || typeof element.animate !== "function") return;
			if (document.visibilityState === "hidden" || element.contains(document.activeElement)) return;
			try {
				const animation = element.animate(frames, {
					easing: EASE_OUT,
					fill: "none",
					...options
				});
				animations.set(animation, element);
				const forget = () => animations.delete(animation);
				animation.addEventListener("finish", forget, { once: true });
				animation.addEventListener("cancel", forget, { once: true });
			} catch {}
		}
		function fadeUp(element, duration = 520, delay = 0, distance = 14) {
			const style = window.getComputedStyle(element);
			const endOpacity = Number.parseFloat(style.opacity) || 1;
			const baseTransform = style.transform === "none" ? "" : style.transform;
			const opacityOnly = element.matches(".course-card, .badge-card");
			animate(element, [{
				opacity: endOpacity * .58,
				...opacityOnly ? {} : { transform: `translateY(${distance}px) ${baseTransform}`.trim() }
			}, {
				opacity: endOpacity,
				...opacityOnly ? {} : { transform: baseTransform || "none" }
			}], {
				duration,
				delay,
				fill: delay ? "backwards" : "none"
			});
		}
		function settleIcon(element) {
			if (!element) return;
			const base = window.getComputedStyle(element).transform;
			const suffix = base === "none" ? "" : ` ${base}`;
			animate(element, [
				{
					transform: `scale(0.86)${suffix}`,
					opacity: .65
				},
				{
					transform: `scale(1.06)${suffix}`,
					opacity: 1,
					offset: .6
				},
				{
					transform: base === "none" ? "scale(1)" : base,
					opacity: 1
				}
			], { duration: 580 });
		}
		function reveal(element) {
			if (revealed.current.has(element) || element.closest(PROTECTED_CONTENT)) return;
			revealed.current.add(element);
			const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
			const index = Math.max(0, siblings.indexOf(element));
			const delay = element.matches(STAGGER_SELECTOR) ? Math.min(index, 3) * 55 : 0;
			fadeUp(element, element.matches(".assessment-result") ? 350 : 520, delay);
			if (pendingResults.has(element)) {
				pendingResults.delete(element);
				settleIcon(element.querySelector(".result-icon > svg"));
			}
		}
		const intersection = typeof IntersectionObserver === "function" ? new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				intersection?.unobserve(entry.target);
				reveal(entry.target);
			}
		}, {
			threshold: .08,
			rootMargin: "0px 0px -32px 0px"
		}) : null;
		function discover(initial) {
			if (disposed) return;
			const hero = main?.querySelector(".hero");
			if (hero && !heroSeen.current.has(hero)) {
				heroSeen.current.add(hero);
				const rect = hero.getBoundingClientRect();
				if (rect.bottom > 0 && rect.top < window.innerHeight) {
					const image = hero.querySelector(".hero-image");
					if (image) {
						const base = window.getComputedStyle(image).transform;
						animate(image, [{ transform: `scale(1.025)${base === "none" ? "" : ` ${base}`}` }, { transform: base === "none" ? "scale(1)" : base }], { duration: 1900 });
					}
					for (const [selector, delay] of [
						[".hero-promo", 0],
						[".hero-kicker", 60],
						["h1", 130],
						[".hero-content > p", 210],
						[".hero-actions", 280],
						[".hero-trust", 350],
						[".hero-scroll", 450]
					]) {
						const element = hero.querySelector(selector);
						if (element) fadeUp(element, 650, delay, selector === "h1" ? 18 : 10);
					}
					const orbit = hero.querySelector(".hero-orbit");
					if (orbit) {
						const opacity = Number.parseFloat(window.getComputedStyle(orbit).opacity) || 1;
						animate(orbit, [{ opacity: opacity * .45 }, { opacity }], {
							duration: 1600,
							delay: 180,
							fill: "backwards"
						});
					}
				}
			}
			for (const element of main?.querySelectorAll(REVEAL_SELECTOR) || []) {
				if (element.closest(PROTECTED_CONTENT)) continue;
				if (element.matches(".assessment-result") && !resultSeen.current.has(element)) {
					resultSeen.current.add(element);
					if (!initial && element.classList.contains("passed")) pendingResults.add(element);
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
		if (routeChanged && routeKey !== "/") animate(main, [{ opacity: .88 }, { opacity: 1 }], { duration: 190 });
		discover(true);
		const mutations = typeof MutationObserver === "function" ? new MutationObserver((records) => {
			if (!records.some((record) => Array.from(record.addedNodes).some((node) => node instanceof Element && (node.matches(`${REVEAL_SELECTOR},.hero`) || node.querySelector(`${REVEAL_SELECTOR},.hero`)))) || scanFrame) return;
			scanFrame = window.requestAnimationFrame(() => {
				scanFrame = 0;
				discover(false);
			});
		}) : null;
		mutations?.observe(main, {
			childList: true,
			subtree: true
		});
		const toast = document.querySelector(".academy .toast");
		let previousToast = toast?.textContent?.trim() || "";
		const toastMutations = toast && typeof MutationObserver === "function" ? new MutationObserver(() => {
			const message = toast.textContent?.trim() || "";
			const changed = message !== previousToast;
			previousToast = message;
			if (!changed || !toast.classList.contains("show") || !COMPLETION_MESSAGE.test(message)) return;
			settleIcon(toast.querySelector(":scope > svg"));
			if (/\bcertificate\b/i.test(message)) settleIcon(main.querySelector(".certificate-illustration > svg"));
			else settleIcon(main.querySelector(".lesson-complete > .button > svg"));
		}) : null;
		if (toast) toastMutations?.observe(toast, {
			childList: true,
			subtree: true,
			characterData: true,
			attributes: true,
			attributeFilter: ["class"]
		});
		function onFocus(event) {
			if (!(event.target instanceof Element)) return;
			for (const [animation, element] of animations) if (element.contains(event.target)) animation.cancel();
		}
		function cancelWhenHidden() {
			if (document.visibilityState !== "hidden") return;
			for (const animation of animations.keys()) animation.cancel();
			animations.clear();
		}
		document.addEventListener("focusin", onFocus);
		document.addEventListener("visibilitychange", cancelWhenHidden);
		return () => {
			disposed = true;
			intersection?.disconnect();
			mutations?.disconnect();
			toastMutations?.disconnect();
			window.cancelAnimationFrame(scanFrame);
			document.removeEventListener("focusin", onFocus);
			document.removeEventListener("visibilitychange", cancelWhenHidden);
			for (const animation of animations.keys()) animation.cancel();
			animations.clear();
		};
	}, [active, routeKey]);
	if (!ready || !resolved) return null;
	const label = reduced ? "Reduced motion" : paused ? "Resume motion" : "Pause motion";
	const description = reduced ? "Your device requests reduced motion. Decorative motion is paused." : paused ? "Resume decorative motion. Your device’s reduced-motion preference is always respected." : "Pause decorative motion. Your choice is remembered on this device when storage is available.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "motion-toggle",
		"data-state": reduced ? "reduced" : paused ? "paused" : "playing",
		disabled: reduced,
		onClick: () => writePreference(paused ? "system" : "paused"),
		"aria-label": reduced ? description : label,
		title: description,
		children: [paused && !reduced ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
			size: 13,
			"aria-hidden": "true"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
			size: 13,
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
var highlights = [
	{
		icon: BookOpen,
		title: "The complete library",
		description: "Open every core module and elective, including member lessons."
	},
	{
		icon: Trophy,
		title: "Progress that responds",
		description: "Complete a lesson, earn XP and see your demo dashboard change."
	},
	{
		icon: Check,
		title: "A ready-to-try assessment",
		description: "The C02 module check is unlocked. Submit answers and review your feedback."
	},
	{
		icon: MessageCircle,
		title: "Your learning guides",
		description: "Explore curriculum-grounded explanations and practice without using paid AI questions."
	},
	{
		icon: FileText,
		title: "Member worksheets",
		description: "Open the toolkit and try the reflection and planning resources."
	},
	{
		icon: GraduationCap,
		title: "Certificate preview",
		description: "View a clearly marked sample. Demo activity never creates a real credential."
	}
];
function DemoPage() {
	const { identity, me } = useAcademy();
	const [adult, setAdult] = (0, import_react.useState)(false), [acknowledged, setAcknowledged] = (0, import_react.useState)(false), [busy, setBusy] = (0, import_react.useState)(false), [error, setError] = (0, import_react.useState)(""), [expired, setExpired] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!me?.demo?.expiresAt) {
			setExpired(false);
			return;
		}
		const delay = new Date(me.demo.expiresAt).getTime() - Date.now();
		setExpired(delay <= 0);
		if (delay <= 0) return;
		const timer = setTimeout(() => setExpired(true), Math.min(delay + 50, 2147483647));
		return () => clearTimeout(timer);
	}, [me?.demo?.expiresAt]);
	const active = Boolean(me?.demo?.active && !expired && new Date(me.demo.expiresAt).getTime() > Date.now());
	async function start(event) {
		event.preventDefault();
		if (busy) return;
		setBusy(true);
		setError("");
		try {
			const result = await post("/api/demo", {
				action: "start",
				adultConfirmed: adult,
				educationAcknowledged: acknowledged
			});
			window.location.assign(result.redirectTo);
		} catch (cause) {
			setError(cause.message);
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section demo-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {
				kicker: "YOUR ACADEMY PLUS DEMO",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Take the whole",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "experience for a spin." })
				] }),
				description: "A private demonstration of the member experience, with sample progress and room to explore."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "demo-intro-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "demo-visual",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/ecampus.webp",
						alt: "A warm, welcoming virtual Academy campus"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "demo-visual-content",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "demo-pass",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 15 }), "ACADEMY PLUS · DEMO"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
								"Meet Alex.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Your demo learner."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Six sample lessons completed.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"One module check passed.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Your next discovery is up to you."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "demo-stat-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "18" }), "modules to explore"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "48" }), "written lessons"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "2h" }), "per demo session"] })
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel demo-start-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "ALL THE CURIOSITY. ZERO CHECKOUT."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: active ? "Your demo is ready." : "Make yourself at home." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The demo uses its own learner record. Your usual profile, subscription and learning progress stay separate." }),
						active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "demo-entry-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
								href: "/dashboard",
								children: ["Open my demo dashboard", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
								href: "/assessment/C02-TEST",
								variant: "outline",
								children: ["Try the unlocked assessment", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 })]
							})]
						}) : identity ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: start,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "check-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: adult,
										onChange: (event) => setAdult(event.target.checked),
										required: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "I confirm that I am 18 or older." })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "check-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: acknowledged,
										onChange: (event) => setAcknowledged(event.target.checked),
										required: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "I understand this is non-accredited adult education and that demo progress is a sample, not a learning credential." })]
								}),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, { message: error }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "button primary full",
									type: "submit",
									disabled: busy || !adult || !acknowledged,
									children: [busy ? "Preparing your demo…" : "Enter my Plus demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "demo-entry-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								className: "button primary full",
								href: "/login?next=/demo",
								target: "_top",
								children: ["Sign in to open the demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "microcopy",
								children: "Use your secure Academy account to keep this demonstration private to you. No shared password or payment details."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "demo-reassurance",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No charges, live AI spending or genuine certificate issuance. Reset or exit the demo at any time." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "microcopy",
							children: "Demo access expires after two hours. Resetting or exiting deletes this demo record; it does not alter your own account."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "demo-feature-grid",
				children: highlights.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel demo-feature",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { size: 24 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: item.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.description })
					]
				}, item.title))
			}),
			active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "demo-shortcuts",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
						href: "/learn/C03-L01",
						variant: "outline",
						children: ["Open a member lesson", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 17 })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
						href: "/resources",
						variant: "outline",
						children: ["Try the member toolkit", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 17 })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
						href: "/tutor",
						variant: "outline",
						children: ["Meet your guides", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 17 })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "button outline",
						onClick: () => {
							openPrivateHtml("/api/demo/certificate", "fleshsesh_academy_sample.html").catch((cause) => setError(cause.message));
						},
						children: ["Preview sample certificate", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { size: 17 })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "demo-return",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					href: "/library",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { size: 16 }), "Just browsing? Explore the course library."]
				})
			})
		]
	});
}
function DemoBanner() {
	const { identity, me } = useAcademy();
	const [status, setStatus] = (0, import_react.useState)(null), [busy, setBusy] = (0, import_react.useState)(null), [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!identity) {
			setStatus(null);
			return;
		}
		let active = true;
		request("/api/demo").then((value) => {
			if (active) setStatus(value);
		}).catch(() => {});
		return () => {
			active = false;
		};
	}, [identity?.email, me?.user?.userId]);
	const expiresAt = me?.demo?.expiresAt || status?.expiresAt;
	(0, import_react.useEffect)(() => {
		if (!expiresAt) return;
		const delay = new Date(expiresAt).getTime() - Date.now();
		if (delay <= 0) {
			setStatus((previous) => ({
				...previous,
				authenticated: true,
				active: false,
				expired: true,
				expiresAt,
				tier: "plus"
			}));
			return;
		}
		const timer = setTimeout(() => setStatus((previous) => ({
			...previous,
			authenticated: true,
			active: false,
			expired: true,
			expiresAt,
			tier: "plus"
		})), Math.min(delay + 50, 2147483647));
		return () => clearTimeout(timer);
	}, [expiresAt]);
	const expired = Boolean(status?.expired || expiresAt && new Date(expiresAt).getTime() <= Date.now());
	if (!me?.demo?.active && !status?.active && !expired) return null;
	async function action(kind) {
		if (busy) return;
		setBusy(kind);
		setError("");
		try {
			const result = await post("/api/demo", { action: kind });
			window.location.assign(result.redirectTo);
		} catch (cause) {
			setError(cause.message);
			setBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		className: `demo-banner ${expired ? "demo-expired" : ""}`,
		"aria-label": "Academy demonstration session",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "demo-banner-inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "demo-banner-copy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 19 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: expired ? "Demo session ended" : "Academy Plus demo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: expired ? "Restart your demo or exit to return to your own account." : "You’re exploring a separate sample learner. Progress here is for demonstration." })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "demo-banner-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							href: "/demo",
							children: "Demo guide"
						}),
						!expired && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => action("reset"),
							disabled: Boolean(busy),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 15 }), busy === "reset" ? "Resetting…" : "Reset demo"]
						}),
						expired && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							href: "/demo",
							children: ["Restart demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 15 })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => action("exit"),
							disabled: Boolean(busy),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 15 }), busy === "exit" ? "Exiting…" : "Exit demo"]
						})
					]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "demo-banner-error",
					role: "alert",
					children: [
						error,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							href: "/demo",
							children: "Open demo setup"
						})
					]
				})
			]
		})
	});
}
/** Shuffle presentation only; every choice retains its server-scored option index. */
function shuffleQuestionOptions(questions, random = Math.random) {
	return questions.map((question) => {
		const optionOrder = question.options.map((_, index) => index);
		for (let index = optionOrder.length - 1; index > 0; index--) {
			const swap = Math.floor(random() * (index + 1));
			[optionOrder[index], optionOrder[swap]] = [optionOrder[swap], optionOrder[index]];
		}
		return {
			...question,
			optionOrder
		};
	});
}
function useActionScope(key) {
	const scope = (0, import_react.useRef)(0);
	const inFlight = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		scope.current += 1;
		inFlight.current = false;
		return () => {
			scope.current += 1;
			inFlight.current = false;
		};
	}, [key]);
	return {
		scope,
		inFlight
	};
}
function accessRecovery(failure) {
	const code = failure.data && typeof failure.data === "object" ? failure.data.code : null;
	if (code === "demo_expired" || code === "learner_session_changed") return {
		href: "/demo",
		label: "Refresh or restart your demo"
	};
	if (failure.status === 401) return {
		href: "/login",
		label: "Sign in to continue"
	};
	if (failure.status === 402 || code === "membership_required") return {
		href: "/pricing",
		label: "Explore membership"
	};
	if (code === "onboarding_required" || code === "agreement_required") return {
		href: "/onboarding",
		label: "Complete your learner welcome"
	};
	if (code === "orientation_required") return {
		href: "/learn/orientation",
		label: "Complete orientation"
	};
	if (code === "prerequisites_required") return {
		href: "/progress",
		label: "See your remaining learning"
	};
	return null;
}
function scrollLearningTop(focusMain = false) {
	if (focusMain) document.getElementById("main")?.focus({ preventScroll: true });
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";
	window.scrollTo({
		top: 0,
		behavior: reduced ? "auto" : "smooth"
	});
}
function Dashboard() {
	const { me, catalog, loading } = useAcademy();
	if (loading || !catalog) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, {});
	if (!me?.profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WelcomeProfile, {});
	const completed = me.progress?.completedLessonIds || [];
	const lessons = catalog.modules.flatMap((m) => m.lessons);
	const coreLessons = catalog.modules.filter((module) => module.kind === "core").flatMap((module) => module.lessons);
	const coreCompleted = coreLessons.filter((lesson) => completed.includes(lesson.id)).length;
	const demo = me.billing?.mode === "demo";
	const activeAssessment = typeof me.profile.activeAssessmentId === "string" ? me.profile.activeAssessmentId : null;
	const next = lessons.find((l) => !completed.includes(l.id));
	const current = catalog.modules.find((m) => m.id === next?.moduleId) || catalog.modules[0];
	const firstName = String(me.profile.displayName || "curious human").split(" ")[0];
	const xp = me.progress?.xp || 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section dashboard",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {
				kicker: "YOUR LEARNING SPACE",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Welcome back, ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [firstName, "."] })] }),
				description: demo ? "Explore a separate Academy Plus demo with sample progress. Continue learning to try the full course experience." : "Make a little space for yourself. Your next chapter is waiting.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "xp-pill",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 17 }),
						xp,
						" ",
						demo ? "demo XP" : "XP",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Level ", me.progress?.level || Math.floor(xp / 300) + 1] })
					]
				})
			}),
			activeAssessment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "notice",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You have an assessed knowledge check open. Return to finish it or leave the assessment when you want full tutor guidance again." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
					href: `/assessment/${encodeURIComponent(activeAssessment)}`,
					variant: "outline",
					children: ["Return to my assessment", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dashboard-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "continue-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: `/images/${moduleArt[current.id]?.image || "connection"}.webp`,
							alt: ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "continue-shade" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "continue-content",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow",
									children: completed.length ? "PICK UP WHERE YOU LEFT OFF" : "A GOOD PLACE TO BEGIN"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: current.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: next?.title || "You have explored every written lesson. Revisit a favourite." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "course-meta",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 14 }),
										next?.durationMinutes || current.lessons[0]?.durationMinutes || 15,
										" minute lesson"
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 }), "25 XP per new completion"] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
									href: me.progress?.orientationCompleted ? `/learn/${next?.id || "C01-L01"}` : "/learn/orientation",
									children: [completed.length ? "Continue learning" : "Start learning", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 })]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dashboard-side",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel progress-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "panel-top",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow",
									children: "YOUR FOUNDATIONS"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { size: 18 })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [coreCompleted, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"/ ",
								coreLessons.length,
								" lessons"
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "progress-track",
								role: "progressbar",
								"aria-label": "Foundation lessons completed",
								"aria-valuemin": 0,
								"aria-valuemax": coreLessons.length,
								"aria-valuenow": coreCompleted,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${coreCompleted / Math.max(1, coreLessons.length) * 100}%` } })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A little understanding adds up." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								className: "text-link",
								href: "/progress",
								children: ["See your progress", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 16 })]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel gentle-goal",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Your pace is a good pace." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [String(me.profile.weeklyGoal || 3), " lessons a week is your intention. There’s no penalty for life happening."] })] })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stat-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stat-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 21 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: completed.length }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "chapters completed" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stat-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { size: 21 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: me.progress.passedAssessmentIds?.filter((id) => id.endsWith("-TEST")).length || 0 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "modules assessed" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stat-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 21 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: xp }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "private learning XP" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stat-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { size: 21 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: demo ? "Sample" : me.certificate?.issued ? "Earned" : "In progress" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "completion certificate" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				kicker: "YOUR NEXT CHAPTERS",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Stay ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "curious." })] }),
				href: "/library"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "course-grid featured",
				children: catalog.modules.slice(0, 4).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleCard, {
					module: m,
					compact: true
				}, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dashboard-bottom",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					className: "panel action-panel",
					href: "/tutor",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 25 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Something on your mind?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Find a clearer explanation with your lesson guide." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 20 })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					className: "panel action-panel",
					href: "/resources",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 25 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Take the learning with you." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Explore private worksheets, definitions and sources." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 20 })
					]
				})]
			})
		]
	});
}
function WelcomeProfile() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "page-section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "empty-state welcome-profile",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 35 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "LET’S MAKE THIS YOURS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
					"A little space.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Just for you." })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Set up your learner profile to save progress, collect milestones and find your own pace." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
					href: "/onboarding",
					children: ["Set up my profile", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 })]
				})
			]
		})
	});
}
function Onboarding() {
	const { me, identity, loading, refresh } = useAcademy();
	const router = useRouter$1();
	const [name, setName] = (0, import_react.useState)("");
	const [goal, setGoal] = (0, import_react.useState)(3);
	const [adult, setAdult] = (0, import_react.useState)(false);
	const [ack, setAck] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const inFlight = (0, import_react.useRef)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const currentAgreement = Boolean(me?.profile && typeof me.policyVersion === "string" && me.profile.acceptedVersion === me.policyVersion);
	(0, import_react.useEffect)(() => {
		if (!loading && currentAgreement && !busy && !saved) router.replace("/dashboard");
	}, [
		loading,
		currentAgreement,
		busy,
		saved,
		router
	]);
	(0, import_react.useEffect)(() => {
		const proposed = me?.profile?.displayName || identity?.name || "";
		if (proposed && !proposed.includes("@")) setName(proposed);
		const existingGoal = Number(me?.profile?.weeklyGoal);
		if ([
			2,
			3,
			5
		].includes(existingGoal)) setGoal(existingGoal);
	}, [
		me?.profile?.displayName,
		me?.profile?.weeklyGoal,
		identity?.name
	]);
	async function submit(e) {
		e.preventDefault();
		if (inFlight.current) return;
		inFlight.current = true;
		let savedOnServer = saved;
		setBusy(true);
		setError("");
		try {
			if (!savedOnServer) await post("/api/profile", {
				displayName: name.trim(),
				adultConfirmed: adult,
				educationAcknowledged: ack,
				weeklyGoal: goal
			});
			savedOnServer = true;
			setSaved(true);
			try {
				sessionStorage.setItem("fsa:adult:v1", "yes");
			} catch {}
			await refresh();
			router.push(me?.progress?.orientationCompleted ? "/dashboard" : "/learn/orientation");
		} catch (e) {
			setError(savedOnServer ? "Your profile is saved. Your learning space could not refresh. Select Continue to try loading it again." : e.message);
		} finally {
			inFlight.current = false;
			setBusy(false);
		}
	}
	if (loading || currentAgreement && !saved) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, { label: "Opening your learning space…" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "onboarding-layout",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "onboarding-image",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/wellbeing.webp",
				alt: "A softly lit form that evokes space and calm"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow",
				children: "YOUR NEXT CHAPTER"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
				"Come as you are.",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Learn as you like." })
			] })] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "onboarding-form",
			onSubmit: submit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "WELCOME TO YOUR ACADEMY"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
					"Let’s make",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "this your space." })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Just the essentials. Your private life stays yours." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "field",
					children: ["What should we call you?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						minLength: 1,
						maxLength: 80,
						disabled: busy || saved,
						required: true,
						autoComplete: "nickname",
						placeholder: "Your name or a nickname"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "goal-options",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "A little intention for your week" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: [
							[
								2,
								"Easy does it",
								"2 lessons"
							],
							[
								3,
								"A little momentum",
								"3 lessons"
							],
							[
								5,
								"Feeling curious",
								"5 lessons"
							]
						].map(([v, t, s]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: goal === v ? "selected" : "",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									disabled: busy || saved,
									name: "goal",
									value: v,
									checked: goal === v,
									onChange: () => setGoal(Number(v))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s })
							]
						}, v)) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Flexible, always. No lost streaks or catch-up pressure." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "check-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						disabled: busy || saved,
						checked: adult,
						onChange: (e) => setAdult(e.target.checked),
						required: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "I confirm that I am 18 years or older." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "check-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						disabled: busy || saved,
						checked: ack,
						onChange: (e) => setAck(e.target.checked),
						required: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"I understand this is non-accredited adult education, and have read the ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							href: "/terms",
							children: "terms"
						}),
						" and ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							href: "/privacy",
							children: "privacy information"
						}),
						"."
					] })]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, { message: error }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "button primary full",
					disabled: busy || !adult || !ack || !name.trim(),
					children: [busy ? saved ? "Opening your learning…" : "Creating your space…" : saved ? "Continue to my learning" : "Make yourself at home", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "microcopy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 13 }), "Your account stores learning progress, not personal reflections."]
				})
			]
		})]
	});
}
function Orientation() {
	const { refresh, me } = useAcademy();
	const router = useRouter$1();
	const [data, setData] = (0, import_react.useState)(null);
	const [checks, setChecks] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [retry, setRetry] = (0, import_react.useState)(0);
	const { scope, inFlight } = useActionScope("orientation");
	(0, import_react.useEffect)(() => {
		const controller = new AbortController();
		setError("");
		request("/api/orientation", { signal: controller.signal }).then(({ orientation }) => {
			if (!controller.signal.aborted) {
				setData(orientation);
				setChecks(orientation.acknowledgements.map(() => false));
			}
		}).catch((failure) => {
			if (!controller.signal.aborted) setError(failure.message);
		});
		return () => controller.abort();
	}, [retry]);
	async function complete() {
		if (inFlight.current || !data || !saved && (!checks.length || !checks.every(Boolean))) return;
		inFlight.current = true;
		const activeScope = scope.current;
		let savedOnServer = saved;
		setBusy(true);
		setError("");
		try {
			if (!savedOnServer) await post("/api/orientation", {});
			if (scope.current !== activeScope) return;
			savedOnServer = true;
			setSaved(true);
			await refresh();
			if (scope.current === activeScope) router.push("/learn/C01-L01");
		} catch (failure) {
			if (scope.current === activeScope) setError(savedOnServer ? "Your orientation is saved. Select Continue to retry opening your learning space." : failure.message);
		} finally {
			if (scope.current === activeScope) {
				inFlight.current = false;
				setBusy(false);
			}
		}
	}
	if (!me?.profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WelcomeProfile, {});
	if (error && !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "page-section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, {
			message: error,
			retry: () => setRetry((value) => value + 1)
		})
	});
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section lesson-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumb, { items: [{
			label: "Your learning",
			href: "/dashboard"
		}, { label: "Learning on your terms" }] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "reading-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "reading-surface",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "BEFORE YOUR FIRST CHAPTER"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
						"Learning on",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "your terms." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "reading-meta",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 15 }),
							"Orientation",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [data.durationMinutes ? `${data.durationMinutes} minutes · ` : "", "Go at your own pace"] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lesson-prose",
						children: data.content.map((paragraph, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: paragraph }, index))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "reflection-box",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { size: 20 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "A small place to begin" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data.activity })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Feel comfortable finding your way?" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "orientation-checks",
						children: data.acknowledgements.map((acknowledgement, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "check-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: checks[index] || false,
								disabled: busy || saved,
								onChange: (event) => {
									const checked = event.target.checked;
									setChecks((previous) => previous.map((value, position) => position === index ? checked : value));
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: acknowledgement })]
						}, index))
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, { message: error }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "button primary full",
						onClick: complete,
						disabled: busy || !saved && (!checks.length || !checks.every(Boolean)),
						children: [busy ? "Saving…" : saved ? "Continue to my first chapter" : "I’m ready for my first chapter", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "reading-aside",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 27 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "You’re in control." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pause, skip a private exercise, or return another day. All activities can use fictional adults." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							href: "/support",
							className: "text-link",
							children: ["Find support", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 16 })]
						})
					]
				})
			})]
		})]
	});
}
function CitedText({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: text.split(/(\[[A-Z]\d+(?:,\s*[A-Z]\d+)*\])/g).map((part, i) => /^\[[A-Z]\d/.test(part) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-citations",
		children: part.replace(/[\[\]]/g, "").split(/,\s*/).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: `#source-${id}`,
			"aria-label": `View source ${id}`,
			children: id
		}, id))
	}, i) : part) });
}
function LessonView({ id }) {
	const { me, refresh, toast, catalog } = useAcademy();
	const { scope, inFlight } = useActionScope(id);
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [recovery, setRecovery] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [syncNotice, setSyncNotice] = (0, import_react.useState)("");
	const [retry, setRetry] = (0, import_react.useState)(0);
	const [showReflection, setShowReflection] = (0, import_react.useState)(false);
	const [reflection, setReflection] = (0, import_react.useState)("");
	const [scenarioChoice, setScenarioChoice] = (0, import_react.useState)(null);
	const [scenarioNote, setScenarioNote] = (0, import_react.useState)(null);
	const [fontSize, setFontSize] = (0, import_react.useState)(17);
	(0, import_react.useEffect)(() => {
		const controller = new AbortController();
		setData(null);
		setError("");
		setRecovery(null);
		setSaved(false);
		setBusy(false);
		setSyncNotice("");
		setShowReflection(false);
		setReflection("");
		setScenarioChoice(null);
		setScenarioNote(null);
		request(`/api/lessons/${encodeURIComponent(id)}`, { signal: controller.signal }).then((value) => {
			if (!controller.signal.aborted) setData(value);
		}).catch((failure) => {
			if (!controller.signal.aborted) {
				setError(failure.message);
				setRecovery(accessRecovery(failure));
			}
		});
		return () => controller.abort();
	}, [id, retry]);
	async function mark() {
		if (inFlight.current || saved || me?.progress?.completedLessonIds?.includes(id) || data?.lesson.id !== id) return;
		inFlight.current = true;
		const activeScope = scope.current;
		setBusy(true);
		setError("");
		setRecovery(null);
		setSyncNotice("");
		try {
			await post("/api/progress", { lessonId: id });
			if (scope.current !== activeScope) return;
			setSaved(true);
			toast("Chapter completion saved. Learning XP is awarded once per lesson.");
			refresh().catch(() => {
				if (scope.current === activeScope) setSyncNotice("Your chapter is saved. Progress totals could not refresh; use the page’s retry control or reload to update them.");
			});
		} catch (failure) {
			if (scope.current === activeScope) {
				setError(failure.message);
				setRecovery(accessRecovery(failure));
			}
		} finally {
			if (scope.current === activeScope) {
				inFlight.current = false;
				setBusy(false);
			}
		}
	}
	if (error && !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, {
			message: error,
			retry: () => setRetry((value) => value + 1)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
			href: recovery?.href || "/library",
			children: [recovery?.label || "Back to the course library", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 })]
		})]
	});
	if (!data || data.lesson.id !== id) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, { label: "Opening your chapter…" });
	const { lesson, sources } = data;
	const module = catalog?.modules.find((m) => m.id === data.module.id) || data.module;
	const done = saved || me?.progress?.completedLessonIds?.includes(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section lesson-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumb, { items: [
			{
				label: "Your learning",
				href: "/dashboard"
			},
			{
				label: module.title,
				href: `/courses/${module.id}`
			},
			{ label: `Lesson ${lesson.order || (module.lessons?.findIndex((l) => l.id === id) ?? 0) + 1 || 1}` }
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "reading-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "reading-surface",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "reading-topline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "eyebrow",
							children: [
								module.id,
								" / ",
								moduleArt[module.id]?.tag || "YOUR NEXT CHAPTER"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "reading-controls",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setFontSize((s) => Math.max(15, s - 2)),
								"aria-label": "Smaller lesson text",
								disabled: fontSize <= 15,
								children: "A−"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setFontSize((s) => Math.min(24, s + 2)),
								"aria-label": "Larger lesson text",
								disabled: fontSize >= 24,
								children: "A+"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: lesson.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "reading-meta",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 15 }),
							lesson.durationMinutes,
							" min",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Written lesson" }),
							done && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "reading-done",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { size: 14 }), "Completed"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "objectives",
						open: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: ["What you’ll take away", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: lesson.objectives?.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: o }, i)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lesson-prose",
						style: { fontSize },
						children: lesson.content.split("\n\n").map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CitedText, { text: p }) }, i))
					}),
					data.scenario && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "scenario-box",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "LET’S TRY A FICTIONAL SCENARIO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: data.scenario.prompt }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "scenario-options",
								children: data.scenario.options.map((option, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										const lessonId = id;
										const choice = i;
										setScenarioChoice(choice);
										post(`/api/lessons/${encodeURIComponent(lessonId)}/scenario`, { choiceIndex: choice }).then((note) => setScenarioNote({
											lessonId,
											choice,
											correct: note.correct,
											feedback: note.feedback
										})).catch((failure) => setError(failure.message));
									},
									"aria-pressed": scenarioChoice === i,
									className: scenarioChoice === i ? "selected" : "",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String.fromCharCode(65 + i) }), option]
								}, i))
							}),
							scenarioNote && scenarioNote.lessonId === id && scenarioNote.choice === scenarioChoice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "scenario-feedback",
								role: "status",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: scenarioNote.correct ? "That’s a thoughtful choice." : "Let’s look at that choice." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: scenarioNote.feedback })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "reflection-box",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "A MOMENT FOR YOURSELF"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Pause. Think. Keep it yours." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: lesson.reflection?.prompt }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small-text",
								children: "Optional and unassessed. Use a fictional example. Anything typed here stays in this page’s memory and disappears when you leave or refresh."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "text-link",
								"aria-expanded": showReflection,
								"aria-controls": "lesson-private-reflection",
								onClick: () => setShowReflection((v) => !v),
								children: [showReflection ? "Close private space" : "Open a private thinking space", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								id: "lesson-private-reflection",
								hidden: !showReflection,
								children: showReflection && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: reflection,
									onChange: (e) => setReflection(e.target.value),
									maxLength: 5e3,
									rows: 5,
									placeholder: "You can also just think about it. Nothing to submit.",
									autoComplete: "off",
									spellCheck: false,
									"aria-label": "Optional private reflection"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "text-link",
									disabled: !reflection,
									onClick: () => setReflection(""),
									children: "Clear my reflection"
								})] })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "lesson-sources",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "WHERE THIS LEARNING COMES FROM"
						}), sources?.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							id: `source-${source.id}`,
							href: source.url,
							target: "_blank",
							rel: "noopener noreferrer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: source.id }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: source.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: source.publisher })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 })
							]
						}, source.id))]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, { message: error }),
					" ",
					error && recovery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						href: recovery.href,
						variant: "outline",
						children: recovery.label
					}),
					syncNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "notice",
						role: "status",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: syncNotice })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lesson-complete",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: done ? "A chapter to feel good about." : "Ready to keep this learning?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: done ? "Your completion is saved." : "Mark it complete, then check your understanding." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: `button ${done ? "outline" : "primary"}`,
							disabled: busy || done,
							onClick: mark,
							children: [busy ? "Saving…" : done ? "Completed" : "Mark as complete", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 18 })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lesson-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
							href: `/assessment/${lesson.assessmentId || id + "-CHECK"}`,
							variant: "outline",
							children: ["Check my understanding", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
						}), data.nextLessonId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							className: "text-link",
							href: `/learn/${data.nextLessonId}`,
							children: ["Next lesson", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "reading-aside",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel chapter-nav",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "IN THIS CHAPTER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: module.title }),
							module.lessons?.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								className: l.id === id ? "active" : "",
								"aria-current": l.id === id ? "page" : void 0,
								href: `/learn/${l.id}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: me?.progress?.completedLessonIds?.includes(l.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 13 }) : i + 1 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: l.title })]
							}, l.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								href: `/assessment/${module.assessmentId}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Chapter knowledge check" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel guide-invite",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 25 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Let’s make it clearer." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ask your lesson guide about an idea in this chapter." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								className: "text-link",
								href: `/tutor?lesson=${id}`,
								children: ["Ask a question", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "aside-note",
						children: [
							"Take a break whenever you need one.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/support",
								children: "Support is here."
							})
						]
					})
				]
			})]
		})]
	});
}
function Assessment({ id }) {
	const { refresh, me } = useAcademy();
	const router = useRouter$1();
	const { scope, inFlight } = useActionScope(id);
	const resultRef = (0, import_react.useRef)(null);
	const [started, setStarted] = (0, import_react.useState)(false);
	const [data, setData] = (0, import_react.useState)(null);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [error, setError] = (0, import_react.useState)("");
	const [recovery, setRecovery] = (0, import_react.useState)(null);
	const [syncNotice, setSyncNotice] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [retry, setRetry] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const controller = new AbortController();
		setData(null);
		setResult(null);
		setAnswers({});
		setStarted(me?.profile?.activeAssessmentId === id);
		setError("");
		setRecovery(null);
		setSyncNotice("");
		setBusy(false);
		request(`/api/assessments/${encodeURIComponent(id)}`, { signal: controller.signal }).then((value) => {
			if (!controller.signal.aborted) setData({
				...value,
				questions: shuffleQuestionOptions(value.questions)
			});
		}).catch((failure) => {
			if (!controller.signal.aborted) {
				setError(failure.message);
				setRecovery(accessRecovery(failure));
			}
		});
		return () => controller.abort();
	}, [id, retry]);
	(0, import_react.useEffect)(() => {
		if (!result) return;
		resultRef.current?.focus({ preventScroll: true });
		scrollLearningTop();
	}, [result]);
	function refreshSavedState(activeScope, message) {
		refresh().catch(() => {
			if (scope.current === activeScope) setSyncNotice(message);
		});
	}
	async function begin() {
		if (inFlight.current || !data || data.assessment.id !== id) return;
		inFlight.current = true;
		const activeScope = scope.current;
		setBusy(true);
		setError("");
		setRecovery(null);
		setSyncNotice("");
		try {
			await post(`/api/assessments/${encodeURIComponent(id)}/start`, {});
			if (scope.current !== activeScope) return;
			setStarted(true);
			refreshSavedState(activeScope, "Your assessment is open. Account details could not refresh; your answers can still be submitted here.");
		} catch (failure) {
			if (scope.current === activeScope) {
				setError(failure.message);
				setRecovery(accessRecovery(failure));
			}
		} finally {
			if (scope.current === activeScope) {
				inFlight.current = false;
				setBusy(false);
			}
		}
	}
	async function leave() {
		if (inFlight.current) return;
		inFlight.current = true;
		const activeScope = scope.current;
		setBusy(true);
		setError("");
		setRecovery(null);
		try {
			await post(`/api/assessments/${encodeURIComponent(id)}/end`, {});
			if (scope.current !== activeScope) return;
			refresh().catch(() => {});
			router.push("/progress");
		} catch (failure) {
			if (scope.current === activeScope) {
				setError(failure.message);
				setRecovery(accessRecovery(failure));
			}
		} finally {
			if (scope.current === activeScope) {
				inFlight.current = false;
				setBusy(false);
			}
		}
	}
	async function submit(event) {
		event.preventDefault();
		if (inFlight.current || result || !data || data.assessment.id !== id) return;
		if (data.questions.some((question) => !Number.isInteger(answers[question.id]))) {
			setError("Choose one answer for every question before submitting.");
			return;
		}
		inFlight.current = true;
		const activeScope = scope.current;
		const submittedAnswers = { ...answers };
		setBusy(true);
		setError("");
		setRecovery(null);
		setSyncNotice("");
		try {
			const saved = await post(`/api/assessments/${encodeURIComponent(id)}`, { answers: submittedAnswers });
			if (scope.current !== activeScope) return;
			setResult(saved);
			refreshSavedState(activeScope, "Your result is saved. Progress totals could not refresh; reload or use the page’s retry control to update them.");
		} catch (failure) {
			if (scope.current === activeScope) {
				setError(failure.message);
				setRecovery(accessRecovery(failure));
			}
		} finally {
			if (scope.current === activeScope) {
				inFlight.current = false;
				setBusy(false);
			}
		}
	}
	if (error && !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, {
			message: error,
			retry: () => setRetry((value) => value + 1)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
			href: recovery?.href || "/progress",
			children: [recovery?.label || "See your learning path", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
		})]
	});
	if (!data || data.assessment.id !== id) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, { label: "Preparing your knowledge check…" });
	const practice = data.assessment.kind === "lesson_practice";
	const criticalCount = data.assessment.criticalQuestionIds?.length || data.questions.filter((question) => question.critical).length;
	const instructions = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data.assessment.instructions || "Choose one response for each question. You’ll receive explanations after submitting." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "small-text",
		children: [
			data.assessment.passingScore,
			" of ",
			data.questions.length,
			" correct to pass.",
			criticalCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" ", id === "PLAN01" ? "All six applied planning decisions need to be correct." : "Every safety-critical item must also be correct."] }),
			" ",
			practice ? "This lesson practice is recorded separately and does not count toward the completion certificate." : "This check contributes to your learning record."
		]
	})] });
	if (!started && !practice) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section assessment-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumb, { items: [{
				label: "Your learning",
				href: "/progress"
			}, { label: "Knowledge check" }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {
				kicker: "A MOMENT TO BRING IT TOGETHER",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Ready to check your",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "understanding?" })
				] }),
				description: `${data.questions.length} questions. No timer. Unlimited retries.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel assessment-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { size: 29 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: data.assessment.title || "Your learning, in practice." }),
					instructions,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "While this assessed check is open, your guide can explain the process but will not suggest answers." }),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, { message: error }),
					" ",
					error && recovery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						href: recovery.href,
						variant: "outline",
						children: recovery.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "button primary",
						disabled: busy,
						onClick: begin,
						children: [busy ? "Opening…" : "Begin knowledge check", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
					})
				]
			})
		]
	});
	const answered = data.questions.filter((question) => Number.isInteger(answers[question.id])).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section assessment-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumb, { items: [{
				label: "Your learning",
				href: "/dashboard"
			}, { label: "Knowledge check" }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {
				kicker: id === "CAP01" ? "FOUNDATIONS CAPSTONE" : id === "PLAN01" ? "APPLIED PLANNING CASE" : "MAKE IT STICK",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Let’s check your",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "understanding." })
				] }),
				description: `${data.questions.length} questions. No timer. Unlimited retries. A chance to learn, not a reason to worry.`
			}),
			result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: resultRef,
				tabIndex: -1,
				className: `assessment-result ${result.passed ? "passed" : "revisit"}`,
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "result-icon",
					children: result.passed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { size: 30 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 30 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: result.passed ? "NICE WORK" : "ANOTHER CHANCE TO UNDERSTAND"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: result.passed ? "That learning is yours." : "Let’s revisit a few ideas." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						result.score,
						" of ",
						result.total,
						" correct. Your result is saved.",
						!result.passed && " Read the explanations below, then try again whenever you’re ready."
					] }),
					!result.criticalPassed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: id === "PLAN01" ? "All six applied planning decisions need to be correct." : "Every safety-critical item also needs to be correct." })
				] })]
			}),
			syncNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "notice",
				role: "status",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: syncNotice })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "assessment-form",
				"aria-busy": busy,
				children: [
					!practice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "text-link assessment-exit",
						disabled: busy,
						onClick: leave,
						children: ["Leave this assessment for now", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })]
					}),
					!result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel assessment-instructions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: data.assessment.title || "Your knowledge check" }), instructions]
					}),
					(data.planning?.case || id === "PLAN01") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "A FICTIONAL CASE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data.planning?.case || "Read the fictional scenario included in each question. Choose the option that best protects choice, communication, health and privacy." }),
							data.planning?.task && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data.planning.task })
						]
					}),
					data.questions.map((question, index) => {
						const item = result?.feedback.find((feedback) => feedback.questionId === question.id);
						const selected = item?.selectedIndex ?? answers[question.id];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
							className: "question-card",
							disabled: busy || Boolean(result),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "question-number",
									children: String(index + 1).padStart(2, "0")
								}), question.prompt] }),
								question.critical && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "small-text",
									children: "Safety-critical question"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "answer-options",
									children: (question.optionOrder || question.options.map((_, choice) => choice)).map((choice, displayIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: `${selected === choice ? "selected" : ""} ${result && item?.correctIndex === choice ? "correct-answer" : ""}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "radio",
												name: question.id,
												value: choice,
												checked: selected === choice,
												onChange: () => {
													if (!inFlight.current && !result) setAnswers((previous) => ({
														...previous,
														[question.id]: choice
													}));
												},
												disabled: busy || Boolean(result)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "answer-letter",
												children: String.fromCharCode(65 + displayIndex)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: question.options[choice] }),
											result && item?.correctIndex === choice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
												size: 18,
												"aria-hidden": "true"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "sr-only",
												children: "Correct answer"
											})] })
										]
									}, choice))
								}),
								result && item && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `question-feedback ${item.correct ? "good" : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.correct ? "Understood." : "Worth another look." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.feedback })]
								})
							]
						}, question.id);
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, { message: error }),
					" ",
					error && recovery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						href: recovery.href,
						variant: "outline",
						children: recovery.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "assessment-submit",
						children: !result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"aria-live": "polite",
							children: [
								answered,
								" / ",
								data.questions.length,
								" answered"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "button primary",
							disabled: busy || answered < data.questions.length,
							children: [busy ? "Checking your answers…" : "Check my understanding", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 })]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "button outline",
							disabled: busy,
							onClick: () => {
								if (inFlight.current) return;
								setResult(null);
								setAnswers({});
								setData((current) => current ? {
									...current,
									questions: shuffleQuestionOptions(current.questions)
								} : current);
								setStarted(false);
								setError("");
								setSyncNotice("");
								scrollLearningTop(true);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 16 }), "Try again"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
							href: data.assessment.moduleId ? `/courses/${data.assessment.moduleId}` : "/progress",
							children: [result.passed ? "Keep learning" : "Back to the learning", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
						})] })
					})
				]
			})
		]
	});
}
function ProgressPage() {
	const { me, catalog, loading, refresh, toast } = useAcademy();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [syncNotice, setSyncNotice] = (0, import_react.useState)("");
	const [certificateReady, setCertificateReady] = (0, import_react.useState)(false);
	const { scope, inFlight } = useActionScope("progress");
	if (loading || !catalog) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, {});
	if (!me?.profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WelcomeProfile, {});
	const demo = me.billing?.mode === "demo";
	const completed = me.progress?.completedLessonIds || [];
	const passed = me.progress?.passedAssessmentIds || [];
	const core = catalog.modules.filter((module) => module.kind === "core");
	const coreLessonCount = core.reduce((total, module) => total + module.lessons.length, 0);
	const remainingLessons = core.reduce((total, module) => total + module.lessons.filter((lesson) => !completed.includes(lesson.id)).length, 0);
	const remainingChecks = core.filter((module) => !passed.includes(module.assessmentId)).length;
	const remainingRequirements = [
		...!me.progress?.orientationCompleted ? ["orientation"] : [],
		...remainingLessons ? [`${remainingLessons} foundation ${remainingLessons === 1 ? "lesson" : "lessons"}`] : [],
		...remainingChecks ? [`${remainingChecks} module ${remainingChecks === 1 ? "check" : "checks"}`] : [],
		...!passed.includes("CAP01") ? ["the capstone"] : [],
		...!passed.includes("PLAN01") ? ["the applied case"] : []
	];
	const issued = Boolean(me.certificate?.issued) || certificateReady;
	const xp = me.progress?.xp || 0;
	const badges = [
		{
			id: "first",
			name: "First chapter",
			text: "Complete your first lesson",
			earned: completed.length > 0,
			icon: BookOpen
		},
		{
			id: "consent",
			name: "A clear beginning",
			text: "Pass Consent & autonomy",
			earned: passed.includes("C01-TEST"),
			icon: Heart
		},
		{
			id: "curious",
			name: "Curiosity in motion",
			text: "Complete 10 lessons",
			earned: completed.length >= 10,
			icon: CompassIcon
		},
		{
			id: "foundation",
			name: "Strong foundations",
			text: `Pass all ${core.length} core modules`,
			earned: core.length > 0 && core.every((module) => passed.includes(module.assessmentId)),
			icon: Flag
		},
		{
			id: "complete",
			name: "Your next chapter",
			text: "Meet every completion criterion",
			earned: Boolean(me.certificate?.eligible) || issued,
			icon: GraduationCap
		}
	];
	async function certificate() {
		if (inFlight.current || demo || issued || !me?.certificate?.eligible) return;
		inFlight.current = true;
		const activeScope = scope.current;
		setBusy(true);
		setError("");
		setSyncNotice("");
		try {
			await post("/api/certificate", {});
			if (scope.current !== activeScope) return;
			setCertificateReady(true);
			toast("Your completion certificate is issued. Use Download my certificate to save it.");
			refresh().catch(() => {
				if (scope.current === activeScope) setSyncNotice("Your certificate is issued and the download is ready. Account details could not refresh.");
			});
		} catch (failure) {
			if (scope.current === activeScope) setError(failure.message);
		} finally {
			if (scope.current === activeScope) {
				inFlight.current = false;
				setBusy(false);
			}
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {
				kicker: demo ? "YOUR DEMO LEARNING RECORD" : "YOUR PROGRESS, FOR YOUR EYES",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Look how far",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "curiosity takes you." })
				] }),
				description: demo ? "Explore sample milestones and continue learning in this separate demo record. These are not certified achievements." : "Every milestone reflects learning. No comparisons, rankings or expectations about your private life.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "xp-pill",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 18 }),
						xp,
						" ",
						demo ? "demo XP" : "XP",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Level ", me.progress?.level || Math.floor(xp / 300) + 1] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "badge-grid",
				children: badges.map((badge) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `badge-card ${badge.earned ? "earned" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(badge.icon, { size: 28 }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: badge.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: badge.text }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: badge.earned ? demo ? "DEMO MILESTONE" : "EARNED" : "STILL TO EXPLORE" })
					]
				}, badge.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				kicker: "ONE CHAPTER AT A TIME",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Your foundations ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "path." })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "path-list",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: "/learn/orientation",
						className: "path-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `path-marker ${me.progress?.orientationCompleted ? "done" : ""}`,
								children: me.progress?.orientationCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 17 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "START HERE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Learning on your terms" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: me.progress?.orientationCompleted ? "Orientation complete" : "Orientation" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 18 })
						]
					}),
					core.map((module, index) => {
						const count = module.lessons.filter((lesson) => completed.includes(lesson.id)).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							href: `/courses/${module.id}`,
							className: "path-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `path-marker ${passed.includes(module.assessmentId) ? "done" : ""}`,
									children: passed.includes(module.assessmentId) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }) : String(index + 1).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["FOUNDATIONS ", index + 1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: module.title })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "path-status",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										count,
										"/",
										module.lessons.length,
										" lessons"
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: passed.includes(module.assessmentId) ? "Knowledge check passed" : "Knowledge check to complete" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 18 })
							]
						}, module.id);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: "/assessment/CAP01",
						className: "path-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `path-marker ${passed.includes("CAP01") ? "done" : ""}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { size: 19 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "BRING IT TOGETHER" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Foundations capstone" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: passed.includes("CAP01") ? "Passed" : "10/12 + all critical items" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 18 })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: "/assessment/PLAN01",
						className: "path-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `path-marker ${passed.includes("PLAN01") ? "done" : ""}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { size: 19 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "APPLY YOUR UNDERSTANDING" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Fictional planning case" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: passed.includes("PLAN01") ? "Passed" : "6/6 applied decisions" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 18 })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "certificate-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "certificate-illustration",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "certificate-preview-logo",
							src: "/brand/flat-wordmark-dark.png",
							width: 1984,
							height: 604,
							alt: "fleshsesh academy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { size: 36 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "fleshsesh academy" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [
							"A chapter",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "worth recognising." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: demo ? "DEMONSTRATION · NOT VALID" : "ASSESSED CERTIFICATE OF COMPLETION" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: demo ? "A LOOK AT THE COMPLETION EXPERIENCE" : "YOUR LEARNING, RECOGNISED"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"Understanding",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "you can take with you." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Complete orientation, all ",
						coreLessonCount,
						" foundation lessons, the ",
						core.length,
						" module checks, capstone and applied case to earn your certificate."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small-text",
						children: "Non-accredited adult education. Not an AQF qualification, professional licence or guarantee of someone’s behaviour."
					}),
					demo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "notice",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This demo can show a sample certificate. It does not issue a real completion record or certify the sample progress." })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "button primary",
						onClick: () => {
							openPrivateHtml("/api/demo/certificate", "fleshsesh_academy_sample.html").catch((failure) => setError(failure.message));
						},
						children: ["Preview sample certificate", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 18 })]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						!issued && !me.certificate?.eligible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "certificate-requirements",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "small-text",
								children: [
									"Still to complete: ",
									new Intl.ListFormat("en-AU", {
										style: "long",
										type: "conjunction"
									}).format(remainingRequirements),
									"."
								]
							})
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, { message: error }),
						syncNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small-text",
							role: "status",
							children: syncNotice
						}),
						issued ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "button primary",
							onClick: () => {
								openPrivateHtml("/api/certificate?download=1", "fleshsesh_academy_certificate.html").catch((failure) => setError(failure.message));
							},
							children: ["Download my certificate", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 18 })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small-text",
							children: "Opens an HTML certificate. Use your browser’s print dialog to save it as a PDF."
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "button primary",
							disabled: busy || !me.certificate?.eligible,
							onClick: certificate,
							children: [busy ? "Preparing certificate…" : me.certificate?.eligible ? "Issue my certificate" : "Your certificate is ahead of you", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { size: 18 })]
						})
					] })
				] })]
			})
		]
	});
}
function CompassIcon({ size }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size });
}
function Pricing() {
	const { checkout, identity, me, catalog } = useAcademy();
	const router = useRouter$1();
	const [annual, setAnnual] = (0, import_react.useState)(false);
	const demo = me?.billing?.mode === "demo";
	const pilot = (me?.billing?.mode ?? catalog?.mode) !== "live";
	const subscriptionStatus = String(me?.billing?.subscriptionStatus || "");
	const existingSubscription = Boolean(subscriptionStatus && !["canceled", "incomplete_expired"].includes(subscriptionStatus));
	function choose(product, label, amount) {
		if (demo) {
			router.push("/library");
			return;
		}
		if (existingSubscription) {
			router.push("/account");
			return;
		}
		checkout(product, label, amount);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section pricing-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {
				kicker: "A LITTLE INVESTMENT IN YOU",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"More understanding.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "On your terms." })
				] }),
				description: "Begin for free. Learn one topic at a time. Or give your curiosity room to grow with a membership."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pricing-switch",
				role: "group",
				"aria-label": "Membership billing period",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: !annual ? "active" : "",
					onClick: () => setAnnual(false),
					"aria-pressed": !annual,
					children: "Monthly"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: annual ? "active" : "",
					onClick: () => setAnnual(true),
					"aria-pressed": annual,
					children: ["Yearly ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save 2 months" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pricing-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "price-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "A GOOD FIRST CHAPTER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Explore" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Let’s see where curiosity takes you." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "price",
								children: ["Free", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "always a place to begin" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
								href: identity ? me?.profile ? "/dashboard" : "/onboarding" : "/signup",
								variant: "outline",
								children: [identity && me?.profile ? "Back to my learning" : "Start exploring", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 17 })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "check-list",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "Consent foundation: 3 full lessons" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "Orientation and course previews" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "Glossary and trusted sources" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "Private learning progress" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "No payment card required" })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "price-card recommended",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "price-ribbon",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 13 }), "THE EVERYDAY ACADEMY"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "ROOM TO GROW"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Academy" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your whole learning journey, together." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "price",
								children: [
									"A$",
									annual ? 190 : 19,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["/", annual ? "year" : "month"] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "billing-note",
								children: annual ? "A$190 billed yearly · A$15.83/month equivalent" : "A$19 billed monthly"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "button primary full",
								onClick: () => choose(annual ? "academy_yearly" : "academy_monthly", `Academy · ${annual ? "Yearly" : "Monthly"}`, annual ? 190 : 19),
								children: [demo ? "Included in your demo" : existingSubscription ? "Manage membership" : "Choose Academy", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 17 })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "check-list",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "All 48 written lessons and 18 modules" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "All knowledge checks and assessments" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "10 optional private worksheets" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "50 AI tutor replies each month*" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "Private XP and learning milestones" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: demo ? "Sample certificate preview" : "Eligible completion certificate included" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "price-footer",
								children: "Everything you need for the foundations."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "price-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "A LITTLE MORE SUPPORT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Academy ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Plus" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "More room for the questions that matter." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "price",
								children: [
									"A$",
									annual ? 290 : 29,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["/", annual ? "year" : "month"] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "billing-note",
								children: annual ? "A$290 billed yearly · A$24.17/month equivalent" : "A$29 billed monthly"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "button outline full",
								onClick: () => choose(annual ? "plus_yearly" : "plus_monthly", `Academy Plus · ${annual ? "Yearly" : "Monthly"}`, annual ? 290 : 29),
								children: [demo ? "Explore your Plus demo" : existingSubscription ? "Manage membership" : "Choose Plus", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 17 })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "check-list",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "Everything in Academy" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "200 AI tutor replies each month*" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "Choose your weekly learning intention" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "More space for examples and recaps" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "All 6 elective deep dives included" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "No extra charge for assessments" })
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pricing-fineprint",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "All prices in Australian dollars. Total prices include applicable taxes. Annual plans renew yearly; monthly plans renew monthly. Cancel future renewal in your account." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [demo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Plus demo:" }), " these are proposed prices. Your separate demo has included course access, no payment collection and no live AI replies. "] }) : pilot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Beta:" }), " paid memberships are not active. "] }) : me?.billing?.checkoutAvailable !== true ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Checkout is currently unavailable." }), " "] }) : null, "*AI reply allowances apply when the connected AI service is enabled. The curriculum-based lesson guide remains available. Current teaching content is written; video and audio courses are not included."] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "micro-purchases",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "A TOPIC, NOT A COMMITMENT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
							"Just one chapter?",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "That’s good too." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pay for the module you want. No subscription, money wallet or surprise top-ups. Members already have every released module." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						className: "micro-purchase-card",
						href: "/library",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 25 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Single module" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A topic of your choice, its lessons and knowledge check." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["A$7 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "once" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-link",
								children: ["Find your topic", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 17 })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "micro-purchase-card",
						onClick: () => demo ? router.push("/tutor") : checkout("tutor_pack", "50 additional AI tutor replies", 5),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 25 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "A few more questions" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: demo ? "Your demo uses the curriculum guides. AI reply purchases are unavailable in demo mode." : "50 extra AI replies when your included monthly allowance runs out." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["A$5 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "once" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-link",
								children: [demo ? "Explore the demo guides" : "Explore a tutor booster", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 17 })]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "value-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 }), "Free assessment retries"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 }), "No paid XP"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 }), "No certificate add-on fee"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 }), "No pressure to upgrade"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "faq",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "GOOD QUESTIONS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["A little ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "clarity." })] }),
					[
						["Can I cancel my membership?", "Yes. Use Manage membership in your account to stop future renewal. Access continues until the end of your paid period. Any rights under Australian Consumer Law remain available." + (pilot ? " During the beta, no membership is charged." : "")],
						["Are the certificates accredited?", "No. You can earn an assessed Certificate of Completion after meeting the course criteria. It is non-accredited adult education, not an AQF qualification, professional registration or licence."],
						["Will a single module count toward my learning?", "Yes. Your recorded learning stays attached to your profile. A single module does not by itself meet the full foundations certificate requirements."],
						["Do I have to share personal experiences?", "No. Every activity can use fictional adults. Reflection is optional, unassessed and not sent to our server. You never need to share a sexual history or intimate images."],
						["What can the tutor help with?", "The lesson guide finds explanations and sources in the course. When AI is connected, its allowance supports educational questions and fictional scenarios. It cannot provide diagnosis, treatment, emergency monitoring, legal opinions or erotic roleplay."],
						["What happens if I take a break?", "Your saved learning remains on your profile. XP is private and does not decay. You will not lose a streak or pay to catch up."]
					].map(([q, a]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 18 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: a })] }, q))
				]
			})
		]
	});
}
function AuthPage({ mode }) {
	const { identity, me } = useAcademy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "auth-layout",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "auth-art",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/academy-hero.webp",
				alt: "Open terracotta sculpture"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow",
				children: "FLESHSESH ACADEMY"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
				"More understanding.",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"More confidence.",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "More you." })
			] })] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "auth-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "auth-brand-lockup",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/brand/glossy-master.png",
						width: 1299,
						height: 393,
						alt: "fleshsesh academy"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: mode === "login" ? "YOUR CHAPTER IS WAITING" : "EVERY JOURNEY STARTS SOMEWHERE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: mode === "login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Welcome",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "back." })
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"A new chapter.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "All yours." })
				] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: mode === "login" ? "Step back into your learning. Your progress is right where you left it." : "Create your learner profile and start exploring. No card, no pressure." }),
				identity ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "signed-in-summary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "You’re securely signed in." })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
					href: me?.profile ? "/dashboard" : "/onboarding",
					className: "full",
					children: [me?.profile ? "Go to my learning" : "Set up my learner profile", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecureAccountForm, { mode }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "microcopy",
					children: "Passwords are hashed by the sign-in service and are never stored with your lessons. Your learner profile and progress stay separate from that password."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "auth-divider" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "check-list",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "A private space for your progress" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "Consent foundation, free to explore" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCheck, { children: "Your pace, from any device" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "auth-switch",
					children: [
						mode === "login" ? "New to the Academy?" : "Already have a learner profile?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							href: mode === "login" ? "/signup" : "/login",
							children: mode === "login" ? "Make yourself at home" : "Welcome back"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "small-text",
					children: [
						"For adults 18+. By creating an Academy profile, you agree to our ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							href: "/terms",
							children: "terms"
						}),
						" and acknowledge our ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							href: "/privacy",
							children: "privacy information"
						}),
						"."
					]
				})
			]
		})]
	});
}
function Account() {
	const { me, identity, loading, refresh, toast } = useAcademy();
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)("");
	const inFlight = (0, import_react.useRef)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [syncNotice, setSyncNotice] = (0, import_react.useState)("");
	const [sessionChanged, setSessionChanged] = (0, import_react.useState)(false);
	const [deleteOpen, setDeleteOpen] = (0, import_react.useState)(false);
	const [deleteText, setDeleteText] = (0, import_react.useState)("");
	const name = draft?.displayName ?? String(me?.profile?.displayName || "");
	const goal = draft?.weeklyGoal ?? Number(me?.profile?.weeklyGoal || 3);
	const demo = me?.billing?.mode === "demo";
	const pilot = me?.billing?.mode !== "live";
	const hasCustomer = me?.billing?.hasCustomer === true;
	const tier = String(me?.billing?.tier || "explore");
	const planName = tier === "plus" ? "Academy Plus" : tier === "academy" ? "Academy" : "Explore";
	const periodEnd = typeof me?.billing?.periodEnd === "string" ? new Date(me.billing.periodEnd) : null;
	const periodEndLabel = periodEnd && Number.isFinite(periodEnd.getTime()) ? new Intl.DateTimeFormat("en-AU", {
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: "Australia/Perth"
	}).format(periodEnd) : null;
	const cancelAtPeriodEnd = me?.billing?.cancelAtPeriodEnd === true;
	const subscriptionStatus = String(me?.billing?.subscriptionStatus || "");
	const billingNeedsAttention = [
		"past_due",
		"unpaid",
		"incomplete"
	].includes(subscriptionStatus);
	const periodEnded = Boolean(periodEnd && periodEnd.getTime() < Date.now());
	const policyCurrent = !me?.profile || me.profile.acceptedVersion === me.policyVersion;
	const closeDelete = (0, import_react.useCallback)(() => {
		if (busy !== "delete") setDeleteOpen(false);
	}, [busy]);
	function showError(failure) {
		const error = failure;
		const code = error.data && typeof error.data === "object" ? error.data.code : null;
		setSessionChanged(code === "demo_expired" || code === "learner_session_changed");
		setError(error.message);
	}
	async function save(event) {
		event.preventDefault();
		if (inFlight.current || !me?.profile || !policyCurrent) return;
		inFlight.current = true;
		setBusy("save");
		setError("");
		setSyncNotice("");
		try {
			await post("/api/profile", {
				displayName: name.trim(),
				weeklyGoal: goal
			});
			toast(demo ? "Your demo preferences have been updated." : "Your profile has been updated.");
			try {
				await refresh();
				setDraft(null);
			} catch {
				setSyncNotice("Your preferences are saved. Account details could not refresh; use the page’s retry control or reload to update them.");
			}
		} catch (failure) {
			showError(failure);
		} finally {
			inFlight.current = false;
			setBusy("");
		}
	}
	async function portal() {
		if (inFlight.current || demo || !hasCustomer) return;
		inFlight.current = true;
		setBusy("billing");
		setError("");
		try {
			const data = await post("/api/billing/portal", {});
			if (typeof data.url !== "string" || !data.url.startsWith("https://billing.stripe.com/")) throw new Error("The secure billing portal could not be opened. Please try again.");
			window.location.assign(data.url);
		} catch (failure) {
			showError(failure);
		} finally {
			inFlight.current = false;
			setBusy("");
		}
	}
	async function exportData() {
		if (inFlight.current || demo || !me?.profile) return;
		inFlight.current = true;
		setBusy("export");
		setError("");
		try {
			const data = await request("/api/account/export");
			const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
			const link = document.createElement("a");
			link.href = url;
			link.download = "my-fleshsesh-academy-data.json";
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.setTimeout(() => URL.revokeObjectURL(url), 1e3);
			toast("Your learning data export is ready.");
		} catch (failure) {
			showError(failure);
		} finally {
			inFlight.current = false;
			setBusy("");
		}
	}
	async function remove() {
		if (inFlight.current || demo || deleteText !== "DELETE MY ACCOUNT") return;
		inFlight.current = true;
		setBusy("delete");
		setError("");
		try {
			await post("/api/account/delete", { confirmation: deleteText });
			window.location.assign("/");
		} catch (failure) {
			showError(failure);
		} finally {
			inFlight.current = false;
			setBusy("");
		}
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section account-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {
				kicker: "YOUR ACCOUNT",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Your space.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Your choices." })
				] }),
				description: "Keep your profile comfortable, manage membership and stay in control of your data."
			}),
			error && !deleteOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, { message: error }),
			error && sessionChanged && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
				href: "/demo",
				variant: "outline",
				children: "Refresh or restart your demo"
			}),
			syncNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "notice",
				role: "status",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: syncNotice })
			}),
			!policyCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "notice",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Complete the updated learner agreement before changing your profile." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
					href: "/onboarding",
					variant: "outline",
					children: "Review learner welcome"
				})]
			}),
			demo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "notice",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You’re editing a separate demo profile. Your real preferences, learning record and billing are unchanged. Use the demo controls to reset or leave this experience." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "account-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "panel account-panel",
					onSubmit: save,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "LEARNER PROFILE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Make yourself at home." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "field",
							children: ["Display name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: name,
								onChange: (event) => setDraft({
									displayName: event.target.value,
									weeklyGoal: goal
								}),
								minLength: 1,
								maxLength: 80,
								required: true,
								placeholder: "Your name or nickname",
								disabled: !!busy || !me?.profile
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "field",
							children: [
								"Sign-in email",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: identity?.email || "",
									readOnly: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Your sign-in email is managed by your secure account. It is not your public learner name." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "field",
							children: ["Weekly learning intention", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: goal,
								onChange: (event) => setDraft({
									displayName: name,
									weeklyGoal: Number(event.target.value)
								}),
								disabled: !!busy || !me?.profile,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 2,
										children: "2 lessons · easy does it"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 3,
										children: "3 lessons · a little momentum"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 5,
										children: "5 lessons · feeling curious"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "button primary",
							disabled: !!busy || !me?.profile || !policyCurrent || !name.trim(),
							children: [busy === "save" ? "Saving…" : "Save my preferences", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 })]
						}),
						!me?.profile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
							href: "/onboarding",
							children: "Create learner profile"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel account-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "YOUR MEMBERSHIP"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "account-plan",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: demo ? "Academy Plus" : pilot && !hasCustomer ? "Academy beta" : planName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tag",
								children: demo ? "Demo · no charges" : pilot && !hasCustomer ? "No charges" : billingNeedsAttention ? "Billing needs attention" : cancelAtPeriodEnd ? "Renewal cancelled" : "Account access"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: demo ? "Explore the included lessons, assessments, worksheets and curriculum guides. This temporary demonstration has no subscription, payment card or live AI replies." : pilot && !hasCustomer ? "Explore the current written Academy during the beta. No payment is collected." : billingNeedsAttention ? "The payment provider reports a billing issue. Open Manage membership to review the status and available access." : hasCustomer ? "Manage renewals, invoices and payment details securely." : "Your free learner profile is ready. Choose membership when you want to explore more." }),
						!demo && periodEndLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small-text",
							children: periodEnded ? `The last reported billing period ended ${periodEndLabel}. Review current access and renewal details in Manage membership.` : cancelAtPeriodEnd && tier !== "explore" ? `Current access continues until ${periodEndLabel}. Future renewal is cancelled.` : `Current billing period ends ${periodEndLabel}. Review renewal details in Manage membership.`
						}),
						!demo && hasCustomer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "button outline",
							onClick: portal,
							disabled: !!busy,
							children: [busy === "billing" ? "Opening…" : "Manage membership", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 16 })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							href: "/pricing",
							className: "text-link",
							children: ["Explore plans", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 16 })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel account-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "YOUR DATA, YOUR CALL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "A clear view of your learning." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: demo ? "Demo records are separate from your own account. Leave the demo to export or delete your real learning data." : "Export your profile, progress and assessment records. Private reflection notes are never sent to the Academy." }),
						demo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
							href: "/demo",
							variant: "outline",
							children: ["View demo controls", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "button outline",
							disabled: !!busy || !me?.profile,
							onClick: exportData,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 16 }), busy === "export" ? "Preparing…" : "Export my learning data"]
						})
					]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "account-bottom",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 22 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Ready to take a break?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your saved learning will be here when you return." })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AcademySignOut, {})]
			}),
			!demo && me?.profile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "delete-account",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "text-link",
					disabled: !!busy,
					onClick: () => {
						setDeleteText("");
						setError("");
						setDeleteOpen(true);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 }), "Delete my learner profile and progress"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: pilot && !hasCustomer ? "This removes your Academy learning record. It does not delete your secure sign-in account, and no payment is on file to cancel." : "Deleting your Academy profile also cancels any linked recurring subscription. It does not delete your secure sign-in account." })]
			}),
			!demo && deleteOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				title: "Delete learner profile",
				onClose: closeDelete,
				closeable: busy !== "delete",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "A PERMANENT GOODBYE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"Delete your",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Academy profile?" })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: pilot && !hasCustomer ? "This permanently removes your Academy profile, progress, assessment history and completion certificate. No payment is collected in this beta, so there is no renewal to cancel. Export your data first if you want a copy." : "This permanently removes your Academy profile, progress, assessment history and completion certificate. Any linked recurring subscription will be cancelled before the profile is deleted. Export your data first if you want a copy." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small-text",
						children: "Your secure sign-in account stays intact. The payment provider retains transaction records it is required to keep."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: ["Type DELETE MY ACCOUNT to confirm", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: deleteText,
							onChange: (event) => setDeleteText(event.target.value),
							autoComplete: "off",
							spellCheck: false,
							disabled: busy === "delete"
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, { message: error }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "button danger full",
						onClick: remove,
						disabled: deleteText !== "DELETE MY ACCOUNT" || !!busy,
						children: busy === "delete" ? "Deleting…" : pilot && !hasCustomer ? "Permanently delete profile" : "Cancel renewal & permanently delete profile"
					})
				]
			})
		]
	});
}
var Tutor = (0, import_react.lazy)(() => import("./tutor-DaFXvuKo.mjs"));
var BusinessPlanner = (0, import_react.lazy)(() => import("./business-BsXJDuzD.mjs"));
var Resources = (0, import_react.lazy)(() => import("./resources-CFc7NmJQ.mjs").then((m) => ({ default: m.Resources })));
var Support = (0, import_react.lazy)(() => import("./resources-CFc7NmJQ.mjs").then((m) => ({ default: m.Support })));
var Legal = (0, import_react.lazy)(() => import("./resources-CFc7NmJQ.mjs").then((m) => ({ default: m.Legal })));
var learnerNav = [
	{
		href: "/dashboard",
		title: "My learning",
		icon: LayoutDashboard
	},
	{
		href: "/library",
		title: "Explore topics",
		icon: Compass
	},
	{
		href: "/tutor",
		title: "My tutors",
		icon: MessageCircle
	},
	{
		href: "/progress",
		title: "My progress",
		icon: Flag
	},
	{
		href: "/resources",
		title: "My resources",
		icon: BookOpen
	}
];
function AcademyApp({ route, identity }) {
	const [retryKey, setRetryKey] = (0, import_react.useState)(0);
	const [catalog, setCatalog] = (0, import_react.useState)(null);
	const [me, setMe] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [loadError, setLoadError] = (0, import_react.useState)("");
	const [meError, setMeError] = (0, import_react.useState)("");
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [ageGate, setAgeGate] = (0, import_react.useState)(false);
	const [ageGateChecked, setAgeGateChecked] = (0, import_react.useState)(false);
	const menuButton = (0, import_react.useRef)(null);
	const [toastMessage, setToastMessage] = (0, import_react.useState)("");
	const [purchase, setPurchase] = (0, import_react.useState)(null);
	const [checkoutBusy, setCheckoutBusy] = (0, import_react.useState)(false);
	const [checkoutError, setCheckoutError] = (0, import_react.useState)("");
	const [renewalConsent, setRenewalConsent] = (0, import_react.useState)(false);
	useRouter$1();
	const learnerEpoch = (0, import_react.useRef)(0);
	const latestMeRequest = (0, import_react.useRef)(0);
	const refresh = (0, import_react.useCallback)(async () => {
		const epoch = learnerEpoch.current;
		const sequence = ++latestMeRequest.current;
		const current = () => epoch === learnerEpoch.current && sequence === latestMeRequest.current;
		try {
			const data = await request("/api/me");
			if (!current()) return;
			setMe({
				...data,
				progress: data.progress || {
					completedLessonIds: [],
					passedAssessmentIds: [],
					xp: 0
				}
			});
			setMeError("");
		} catch (error) {
			if (!current()) return;
			setMeError(error.message);
			throw error;
		}
	}, []);
	const toast = (0, import_react.useCallback)((message) => setToastMessage(message), []);
	const checkout = (0, import_react.useCallback)((product, label, amount) => {
		setPurchase({
			product,
			label,
			amount
		});
		setRenewalConsent(false);
		setCheckoutError("");
	}, []);
	const closePurchase = (0, import_react.useCallback)(() => {
		if (!checkoutBusy) setPurchase(null);
	}, [checkoutBusy]);
	(0, import_react.useEffect)(() => {
		const epoch = ++learnerEpoch.current;
		const sequence = ++latestMeRequest.current;
		resetLearnerExpectation();
		setLoading(true);
		setLoadError("");
		setMe(null);
		setMeError("");
		Promise.allSettled([request("/api/catalog"), request("/api/me")]).then(([course, account]) => {
			if (epoch !== learnerEpoch.current) return;
			if (course.status === "fulfilled") setCatalog(course.value);
			else setLoadError(course.reason?.message || "The course library could not load.");
			if (sequence === latestMeRequest.current) {
				if (account.status === "fulfilled") setMe({
					...account.value,
					progress: account.value.progress || {
						completedLessonIds: [],
						passedAssessmentIds: [],
						xp: 0
					}
				});
				else if (identity) setMeError(account.reason?.message || "Your progress could not load.");
			}
			setLoading(false);
		});
		try {
			if (sessionStorage.getItem("fsa:adult:v1") !== "yes") setAgeGate(true);
		} catch {
			setAgeGate(true);
		}
		setAgeGateChecked(true);
		return () => {
			learnerEpoch.current += 1;
			latestMeRequest.current += 1;
			resetLearnerExpectation();
		};
	}, [identity?.email, retryKey]);
	(0, import_react.useEffect)(() => {
		setMenuOpen(false);
		setPurchase(null);
		setCheckoutError("");
		setRenewalConsent(false);
	}, [route]);
	(0, import_react.useEffect)(() => {
		if (!menuOpen) return;
		function closeOnEscape(event) {
			if (event.key === "Escape") {
				setMenuOpen(false);
				menuButton.current?.focus();
			}
		}
		document.addEventListener("keydown", closeOnEscape);
		return () => document.removeEventListener("keydown", closeOnEscape);
	}, [menuOpen]);
	(0, import_react.useEffect)(() => {
		if (!toastMessage) return;
		const id = setTimeout(() => setToastMessage(""), 5500);
		return () => clearTimeout(id);
	}, [toastMessage]);
	(0, import_react.useEffect)(() => {
		if (me?.profile) {
			try {
				sessionStorage.setItem("fsa:adult:v1", "yes");
			} catch {}
			setAgeGate(false);
		}
	}, [me?.profile]);
	const acceptAge = (0, import_react.useCallback)(() => {
		try {
			sessionStorage.setItem("fsa:adult:v1", "yes");
		} catch {}
		setAgeGate(false);
	}, []);
	const context = (0, import_react.useMemo)(() => ({
		catalog,
		me,
		identity,
		loading,
		loadError,
		refresh,
		toast,
		checkout
	}), [
		catalog,
		me,
		identity,
		loading,
		loadError,
		refresh,
		toast,
		checkout
	]);
	const segment = route.split("/")[1] || "";
	const detailId = route.split("/")[2];
	const isApp = [
		"dashboard",
		"learn",
		"assessment",
		"tutor",
		"progress",
		"resources",
		"account",
		"business"
	].includes(segment);
	const noFooter = [
		"learn",
		"assessment",
		"tutor",
		"onboarding"
	].includes(segment);
	const isSubscription = !!purchase && /_(monthly|yearly)$/.test(purchase.product);
	const isYearly = purchase?.product.endsWith("_yearly");
	const live = me?.billing?.mode === "live" && me?.billing?.checkoutAvailable === true;
	const catalogDependent = [
		"library",
		"courses",
		"dashboard",
		"progress",
		"tutor",
		"resources"
	].includes(segment);
	async function pay() {
		if (!purchase) return;
		setCheckoutBusy(true);
		setCheckoutError("");
		try {
			const result = await post("/api/billing/checkout", {
				product: purchase.product.startsWith("module:") ? "module" : purchase.product === "tutor_booster" ? "tutor_pack" : purchase.product,
				moduleId: purchase.product.startsWith("module:") ? purchase.product.split(":")[1] : void 0,
				renewalConsent
			});
			if (!result.url || !/^https:\/\//.test(result.url)) throw new Error("A secure checkout link is not yet available.");
			window.location.assign(result.url);
		} catch (e) {
			setCheckoutError(e.message);
		} finally {
			setCheckoutBusy(false);
		}
	}
	let page;
	if (route === "/") page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landing, {
		ready: ageGateChecked && !ageGate,
		retryCatalog: () => setRetryKey((value) => value + 1)
	});
	else if (segment === "library") page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library, {});
	else if (segment === "pricing") page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {});
	else if (segment === "courses") page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Course, { id: detailId || "C01" });
	else if (segment === "about") page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {});
	else if (segment === "demo") page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoPage, {});
	else if (segment === "login" || segment === "signup") page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPage, { mode: segment });
	else if (segment === "onboarding") page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {});
	else if (segment === "dashboard") page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {});
	else if (segment === "learn") page = detailId === "orientation" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orientation, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonView, { id: detailId || "C01-L01" });
	else if (segment === "assessment") page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Assessment, { id: detailId || "C01-TEST" });
	else if (segment === "progress") page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressPage, {});
	else if (segment === "tutor") page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tutor, {});
	else if (segment === "account") page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Account, {});
	else if (segment === "resources") page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Resources, {});
	else if (segment === "support") page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Support, {});
	else if (segment === "privacy" || segment === "terms") page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legal, { type: segment });
	else if (segment === "business") page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessPlanner, {});
	else page = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landing, {
		ready: ageGateChecked && !ageGate,
		retryCatalog: () => setRetryKey((value) => value + 1)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AcademyContext.Provider, {
		value: context,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `academy ${isApp ? "learner-app" : ""} route-${segment || "home"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#main",
					className: "skip-link",
					children: "Skip to content"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: `site-header ${route === "/" ? "over-hero" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "header-inner",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { glossy: true }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								className: "main-nav",
								"aria-label": "Main navigation",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
										className: segment === "library" ? "active" : "",
										href: "/library",
										children: ["The Academy", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 13 })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
										className: segment === "about" ? "active" : "",
										href: "/about",
										children: "Our approach"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
										className: segment === "pricing" ? "active" : "",
										href: "/pricing",
										children: "Membership"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
										className: segment === "demo" ? "active" : "",
										href: "/demo",
										children: "Try the demo"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "header-actions",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										className: "quick-exit",
										href: "https://www.google.com",
										"aria-label": "Quick exit: open Google",
										title: "Opens Google. Does not clear browsing history.",
										onClick: (e) => {
											e.preventDefault();
											window.location.replace("https://www.google.com");
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Quick exit" })]
									}),
									identity ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
										className: "header-account",
										href: "/account",
										"aria-label": "Your account",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { size: 18 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
										href: me?.profile ? "/dashboard" : "/onboarding",
										variant: "small primary",
										children: ["My learning", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })]
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
										className: "login-link",
										href: "/login",
										children: "Log in"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
										href: "/signup",
										variant: "small primary",
										children: ["Start free", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										ref: menuButton,
										className: "icon-button mobile-menu",
										"aria-controls": "academy-mobile-nav",
										"aria-label": menuOpen ? "Close navigation" : "Open navigation",
										"aria-expanded": menuOpen,
										onClick: () => setMenuOpen((v) => !v),
										children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
									})
								]
							})
						]
					}), menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						id: "academy-mobile-nav",
						className: "mobile-nav",
						"aria-label": "Mobile navigation",
						onClick: (event) => {
							if (event.target.closest("a")) setMenuOpen(false);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/library",
								children: "Explore the Academy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/about",
								children: "Our approach"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/pricing",
								children: "Membership"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/demo",
								children: "Try Academy Plus demo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: identity ? "/dashboard" : "/login",
								children: identity ? "My learning" : "Log in"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/support",
								children: "Support"
							})
						]
					})]
				}),
				isApp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "learner-nav",
					"aria-label": "Learner navigation",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [learnerNav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: n.href,
						className: route.startsWith(n.href) ? "active" : "",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { size: 17 }), n.title]
					}, n.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: "/account",
						className: `learner-account ${segment === "account" ? "active" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Account" })]
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoBanner, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					id: "main",
					tabIndex: -1,
					children: loadError && catalogDependent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "page-section",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, {
							message: loadError,
							retry: () => setRetryKey((value) => value + 1)
						})
					}) : (isApp || segment === "onboarding") && meError && !me ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "page-section",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, {
							message: meError,
							retry: () => refresh().catch(() => {})
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						loadError && !catalogDependent && segment !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "page-section compact-section",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, {
								message: `The course library could not load. This page remains available. ${loadError}`,
								retry: () => setRetryKey((value) => value + 1)
							})
						}),
						isApp && meError && me && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "page-section compact-section",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, {
								message: `Your last loaded learning record is still available. Totals could not refresh: ${meError}`,
								retry: () => refresh().catch(() => {})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, {}),
							children: page
						}, `${route}:${me?.user?.userId || identity?.email || "visitor"}`)
					] })
				}),
				!noFooter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "site-footer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "footer-main",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "footer-brand",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { glossy: true }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Know more. Feel more. Be you." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										"A fleshsesh learning experience.",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"Part of the fourtee2 universe."
									] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Stay curious" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/library",
									children: "Explore the Academy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/pricing",
									children: "Membership"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/about",
									children: "Our approach"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Your space" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/dashboard",
									children: "My learning"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/tutor",
									children: "My tutors"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/progress",
									children: "My progress"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/demo",
									children: "Try the demo"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "A little support" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/support",
									children: "Find support"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/privacy",
									children: "Privacy & your data"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/terms",
									children: "Terms of learning"
								})
							] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "footer-bottom",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 fleshsesh academy." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Adult education, 18+. Non-accredited completion certificates.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								me?.billing?.mode === "live" ? "Written curriculum · Learn at your own pace." : "Public beta · Written curriculum · Specialist release reviews pending."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "footer-signoff",
								children: [
									"OPEN MINDS.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"BETTER CONNECTIONS."
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionDirector, {
					routeKey: route,
					ready: ageGateChecked && (!ageGate || [
						"privacy",
						"terms",
						"support"
					].includes(segment))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `toast ${toastMessage ? "show" : ""}`,
					role: "status",
					"aria-live": "polite",
					children: toastMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 18 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: toastMessage }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "icon-button",
							onClick: () => setToastMessage(""),
							"aria-label": "Dismiss notification",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 })
						})
					] })
				}),
				ageGate && ![
					"privacy",
					"terms",
					"support"
				].includes(segment) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
					title: "Adult learning space",
					onClose: acceptAge,
					closeable: false,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "age-brand",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/brand/glossy-master.png",
								width: 1299,
								height: 393,
								alt: "fleshsesh academy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "age-declaration",
								children: "18+"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "OPEN MINDS. GROWN-UP CONVERSATIONS."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
							"Made for adults.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Designed for you." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "fleshsesh academy is a consent-focused learning space about bodies, connection and sexual wellbeing. Please confirm that you’re 18 or older." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "button primary full",
							onClick: acceptAge,
							children: ["I’m 18 or older. Let’s explore.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "age-leave",
							href: "https://www.google.com",
							children: "I’m under 18 · Leave the Academy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "microcopy",
							children: [
								"This is an age declaration, not identity verification. ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/privacy",
									children: "Your privacy"
								}),
								" matters here."
							]
						})
					]
				}),
				purchase && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
					title: "Review Academy access",
					onClose: closePurchase,
					closeable: !checkoutBusy,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: live ? "MAKE ROOM FOR YOUR LEARNING" : "YOUR NEXT CHAPTER, COMING SOON"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: purchase.label.split(" · ")[0] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "checkout-total",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total in AUD" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
								"A$",
								purchase.amount,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: isSubscription ? ` / ${isYearly ? "year" : "month"}` : " once" })
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: !live ? "This is the proposed launch price. Nothing is billed during the beta, and no card details are collected." : isSubscription ? `Billed ${isYearly ? "annually" : "monthly"}. Renews at A$${purchase.amount} each ${isYearly ? "year" : "month"} until cancelled. Manage future renewal in your account. Access continues to the end of the paid period.` : "A single purchase for the named learning benefit. No recurring charge or automatic repurchase." }),
						!live && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "notice",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 21 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Explore the beta at no charge." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Paid checkout is not active yet. The current beta includes the written course. No payment details are collected here." })] })]
						}),
						live && isSubscription && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "check-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: renewalConsent,
								onChange: (e) => setRenewalConsent(e.target.checked)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "I agree to the recurring price and billing period above." })]
						}),
						checkoutError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, { message: checkoutError }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "checkout-actions",
							children: !identity ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
								href: "/signup",
								children: ["Create my free profile", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
							}) : !me?.profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
								href: "/onboarding",
								children: ["Set up my learner profile", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
							}) : live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "button primary full",
								onClick: pay,
								disabled: checkoutBusy || isSubscription && !renewalConsent,
								children: [checkoutBusy ? "Opening secure checkout…" : "Continue to secure checkout", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { size: 18 })]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
								href: "/library",
								children: ["Explore the Academy", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "microcopy",
							children: live ? "Payment handled by the connected provider. Your card details are never collected in this form." : "Proposed launch pricing. Live payments need provider connection and business acceptance."
						})
					]
				})
			]
		})
	});
}
var PAGES = /* @__PURE__ */ new Set([
	"library",
	"pricing",
	"about",
	"login",
	"signup",
	"privacy",
	"terms",
	"support",
	"demo",
	"resources",
	"dashboard",
	"onboarding",
	"tutor",
	"progress",
	"account",
	"business"
]);
var DETAILS = /* @__PURE__ */ new Set([
	"learn",
	"courses",
	"assessment"
]);
function known(pathname) {
	const parts = pathname.split("/").filter(Boolean);
	if (parts.length === 0) return true;
	const [head] = parts;
	if (DETAILS.has(head)) return parts.length === 2;
	return PAGES.has(head) && parts.length === 1;
}
function AcademyShell() {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const router = useRouter();
	const { user, isPending } = useCurrentUserState();
	const head = pathname.split("/").filter(Boolean)[0] ?? "";
	(0, import_react.useEffect)(() => {
		if (head === "sign-in" || head === "signin-with-chatgpt") router.navigate({
			href: "/login",
			replace: true
		});
		if (head === "sign-up" || head === "signup-alias") router.navigate({
			href: "/signup",
			replace: true
		});
	}, [head, router]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "academy",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, { label: "Opening the Academy…" })
	});
	if (!known(pathname) && head !== "sign-in" && head !== "sign-up") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "academy not-found",
		id: "main",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow",
				children: "FLESHSESH ACADEMY"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "That page isn’t on the campus." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The lesson, module or path may have moved. Your saved learning is unchanged." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "button primary",
				href: "/",
				children: "Back to the Academy"
			})
		]
	});
	const identity = user ? {
		name: user.displayName || "Learner",
		email: user.primaryEmail || ""
	} : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AcademyApp, {
		route: pathname || "/",
		identity
	});
}
//#endregion
export { Loading as a, useAcademy as c, Link$1 as i, useSearchParams as l, ButtonLink as n, PageHeading as o, ErrorPanel as r, request as s, AcademyShell as t };
