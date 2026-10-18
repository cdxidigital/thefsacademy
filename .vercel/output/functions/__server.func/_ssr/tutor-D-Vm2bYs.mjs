import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as ClipboardCheck, M as ExternalLink, U as BookOpen, V as Check, W as ArrowUpRight, s as Trash2, u as ShieldCheck, v as MessageCircle } from "../_libs/lucide-react.mjs";
import { a as Loading, c as useAcademy, i as Link$1, l as useSearchParams, n as ButtonLink, o as PageHeading, r as ErrorPanel, s as request } from "./shell-CkijGP05.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutor-D-Vm2bYs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_TUTOR_ROLE = "foundations_tutor";
var TUTOR_PERSONAS = [
	{
		id: "foundations_tutor",
		title: "Foundations Tutor",
		shortTitle: "Foundations",
		character: "Calm, clear and curious",
		symbol: "book",
		description: "Understand one idea at a time, with plain language and sources you can check.",
		scope: "Concepts · lesson explanations · trusted sources",
		welcome: "Let’s make one idea a little clearer.",
		introduction: "Choose a lesson, ask a question, or begin with a short recap. You can keep every example fictional.",
		defaultMode: "explain",
		prompts: [
			{
				text: "Explain this lesson in plain language.",
				mode: "explain"
			},
			{
				text: "Summarise the ideas I should remember.",
				mode: "recap"
			},
			{
				text: "How is a bodily response different from consent?",
				mode: "explain"
			},
			{
				text: "Where can I find a trusted source for this topic?",
				mode: "explain"
			}
		]
	},
	{
		id: "practice_coach",
		title: "Practice Coach",
		shortTitle: "Practice",
		character: "Encouraging, practical and unhurried",
		symbol: "conversation",
		description: "Try a fictional two-choice situation, then explore the reasoning together.",
		scope: "Fictional adults · communication · ungraded practice",
		welcome: "A small situation. Room to try.",
		introduction: "There is no performance to prove. Try either choice, see the course reasoning, and take your time.",
		defaultMode: "scenario",
		prompts: [
			{
				text: "Give me a fictional practice example.",
				mode: "scenario"
			},
			{
				text: "Can we use a nonsexual example instead?",
				mode: "scenario"
			},
			{
				text: "Help me practise accepting a boundary.",
				mode: "scenario"
			},
			{
				text: "Explain what this practice is helping me learn.",
				mode: "explain"
			}
		]
	},
	{
		id: "assessment_tutor",
		title: "Assessment Tutor",
		shortTitle: "Assessment",
		character: "Precise, patient and fair",
		symbol: "checklist",
		description: "Find your next step, understand assessment rules, and revisit released feedback.",
		scope: "Your saved progress · assessment process · approved feedback",
		welcome: "Know where you are. See what comes next.",
		introduction: "I use the course rules and your own saved results. During a marked assessment, I can help with the process and access options.",
		defaultMode: "explain",
		prompts: [
			{
				text: "What do I still need to complete?",
				mode: "explain"
			},
			{
				text: "Explain my latest submitted assessment feedback.",
				mode: "recap"
			},
			{
				text: "What if I need more time or another attempt?",
				mode: "explain"
			},
			{
				text: "How can I raise a confusing marked question?",
				mode: "explain"
			}
		]
	}
];
function tutorPersona(role) {
	return TUTOR_PERSONAS.find((persona) => persona.id === role);
}
var ICONS = {
	foundations_tutor: BookOpen,
	practice_coach: MessageCircle,
	assessment_tutor: ClipboardCheck
};
function countValue(value) {
	const parsed = Number(value);
	return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}
function internalLink(url) {
	return /^\/(learn|assessment)\/[A-Za-z0-9-]+$/.test(url) || [
		"/progress",
		"/support",
		"/privacy"
	].includes(url);
}
function ownResults(value) {
	return Array.isArray(value) ? value.filter((item) => Boolean(item) && typeof item === "object" && typeof item.assessmentId === "string") : [];
}
function Tutor() {
	const { catalog, me, loading, loadError, refresh } = useAcademy();
	const requestedLesson = useSearchParams().get("lesson");
	const [topic, setTopic] = (0, import_react.useState)({
		query: requestedLesson,
		lesson: requestedLesson ?? "C01-L01"
	});
	const [role, setRole] = (0, import_react.useState)(DEFAULT_TUTOR_ROLE);
	const [selectedAssessment, setSelectedAssessment] = (0, import_react.useState)("");
	const candidate = topic.query === requestedLesson ? topic.lesson : requestedLesson ?? "C01-L01";
	const lessonId = (catalog?.modules.flatMap((module) => module.lessons) ?? []).some((lesson) => lesson.id === candidate) ? candidate : "C01-L01";
	const results = ownResults(me?.progress?.assessmentResults);
	const assessmentId = results.some((result) => result.assessmentId === selectedAssessment) ? selectedAssessment : "";
	const conversationKey = [
		String(me?.user?.userId ?? me?.profile?.userId ?? "signed-out"),
		me?.demo?.active ? me.demo.expiresAt : "real",
		role,
		role === "assessment_tutor" ? assessmentId : lessonId
	].join(":");
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, { label: "Opening your tutors…" });
	if (loadError || !catalog) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, {
			message: loadError || "The course could not load.",
			retry: () => {
				refresh();
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
			href: "/library",
			children: ["Back to the course library", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 17 })]
		})]
	});
	if (!me?.profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {
			kicker: "YOUR LEARNING TUTORS",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"A little space.",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "For your questions." })
			] }),
			description: "Set up your adult learner profile to explore the course with three distinct learning guides."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
			href: me?.user ? "/onboarding" : "/signup?next=/tutor",
			children: [me?.user ? "Set up my learner profile" : "Create my learner profile", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 17 })]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section tutor-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {
				kicker: "THREE WAYS TO FIND YOUR NEXT STEP",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"A little clarity.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "In your own way." })
				] }),
				description: "An explanation, room to practise, or a clear next step. Choose a tutor for what you need today. Your private life never needs to be part of the question."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tutor-personas",
				role: "group",
				"aria-label": "Choose your tutor",
				children: TUTOR_PERSONAS.map((persona) => {
					const Icon = ICONS[persona.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `tutor-persona ${role === persona.id ? "selected" : ""}`,
						"aria-pressed": role === persona.id,
						onClick: () => setRole(persona.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tutor-persona-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 23 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tutor-persona-content",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: persona.title }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tutor-persona-character",
										children: persona.character
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: persona.description }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: persona.scope })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tutor-persona-selected",
								"aria-hidden": "true",
								children: role === persona.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 15 })
							})
						]
					}, persona.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tutor-role-note",
				children: [me.demo?.active ? "Demonstration uses written curriculum guides. No external AI calls or paid replies." : me.tutor?.mode === "ai" ? "All three tutors are ready in their own voices, using the written course. Leave the AI box ticked and ask. Two-choice options stay exact, so those buttons always match the lesson." : "These tutors currently use written curriculum guidance. Live AI is not connected.", " Changing tutor, lesson or learner starts a fresh conversation."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TutorSession, {
				role,
				lessonId,
				assessmentId,
				me,
				results,
				onLesson: (lesson) => setTopic({
					query: requestedLesson,
					lesson
				}),
				onAssessment: setSelectedAssessment
			}, conversationKey)
		]
	});
}
function TutorSession({ role, lessonId, assessmentId, me, results, onLesson, onAssessment }) {
	const { catalog, refresh } = useAcademy();
	const persona = tutorPersona(role);
	const Icon = ICONS[role];
	const [mode, setMode] = (0, import_react.useState)(persona.defaultMode);
	const [input, setInput] = (0, import_react.useState)("");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [errorLink, setErrorLink] = (0, import_react.useState)(null);
	const [usageNotice, setUsageNotice] = (0, import_react.useState)("");
	const [consentChoice, setConsentChoice] = (0, import_react.useState)(null);
	const bottom = (0, import_react.useRef)(null);
	const requestController = (0, import_react.useRef)(null);
	const inFlight = (0, import_react.useRef)(false);
	const mounted = (0, import_react.useRef)(false);
	const messageId = (0, import_react.useRef)(0);
	const demo = me.demo?.active === true || me.billing?.mode === "demo";
	const activeAssessment = typeof me.profile?.activeAssessmentId === "string" ? me.profile.activeAssessmentId : null;
	const aiAvailable = !demo && !activeAssessment && me.tutor?.mode === "ai";
	const storedConsent = me.tutor?.externalProcessingConsent === true;
	const consent = consentChoice ?? (aiAvailable || storedConsent);
	const monthlyLimit = countValue(me.tutor?.monthlyLimit);
	const remaining = Math.max(0, monthlyLimit - countValue(me.tutor?.monthlyUsed));
	const extraQuestions = countValue(me.tutor?.extraQuestions);
	const aiReady = aiAvailable && consent && (remaining > 0 || extraQuestions > 0);
	const bucket = typeof me.tutor?.bucket === "string" ? me.tutor.bucket : "";
	const resetDate = /^\d{4}-\d{2}$/.test(bucket) ? /* @__PURE__ */ new Date(`${bucket}-01T00:00:00Z`) : null;
	if (resetDate) resetDate.setUTCMonth(resetDate.getUTCMonth() + 1);
	const resetLabel = resetDate && Number.isFinite(resetDate.getTime()) ? new Intl.DateTimeFormat("en-AU", {
		day: "numeric",
		month: "long",
		timeZone: "Australia/Perth"
	}).format(resetDate) : null;
	const latestPracticeMessage = messages.filter((message) => message.role === "guide" && message.practice).at(-1);
	const pendingPractice = latestPracticeMessage?.practice?.stage === "question" ? latestPracticeMessage.practice : null;
	const ownAssessmentTitle = (id) => catalog?.modules.find((module) => module.assessmentId === id)?.title ?? (id === "CAP01" ? "Capstone" : id === "PLAN01" ? "Applied planning" : id);
	(0, import_react.useEffect)(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
			requestController.current?.abort();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";
		bottom.current?.scrollIntoView({
			behavior: reduced ? "auto" : "smooth",
			block: "nearest"
		});
	}, [
		messages,
		busy,
		error
	]);
	async function send(event, textOverride, modeOverride, practiceOverride) {
		event?.preventDefault();
		const question = (textOverride ?? input).trim();
		if (inFlight.current || !question) return;
		if (question.length > 1200) {
			setError("Keep your question to 1,200 characters or fewer.");
			return;
		}
		const chosenMode = modeOverride ?? mode;
		if (modeOverride) setMode(modeOverride);
		const typedChoice = /^(?:option\s*)?([ab12])[.!]?$/i.exec(question);
		const practice = practiceOverride ?? (role === "practice_coach" && pendingPractice && typedChoice ? {
			scenarioId: pendingPractice.scenarioId,
			choiceIndex: ["a", "1"].includes(typedChoice[1].toLowerCase()) ? 0 : 1
		} : void 0);
		const history = messages.slice(-4).map((message) => ({
			role: message.role === "user" ? "user" : "assistant",
			content: message.text.slice(0, 500)
		}));
		const body = {
			message: question,
			role,
			...role === "assessment_tutor" ? { assessmentId: assessmentId || void 0 } : { lessonId },
			...aiAvailable ? { consentToAI: consent } : {},
			mode: chosenMode,
			history,
			practice
		};
		while (history.length && new TextEncoder().encode(JSON.stringify(body)).length > 5800) history.shift();
		if (new TextEncoder().encode(JSON.stringify(body)).length > 6e3) {
			setError("This question is too large to send. Please shorten it a little.");
			return;
		}
		inFlight.current = true;
		setBusy(true);
		setError("");
		setErrorLink(null);
		setUsageNotice("");
		setInput("");
		const userMessageId = ++messageId.current;
		setMessages((previous) => [...previous, {
			id: userMessageId,
			role: "user",
			text: question
		}]);
		const controller = new AbortController();
		requestController.current = controller;
		try {
			const data = await request("/api/tutor", {
				method: "POST",
				signal: controller.signal,
				body: JSON.stringify(body)
			});
			if (!mounted.current) return;
			if (typeof data.answer !== "string" || !data.answer.trim()) throw new Error("The tutor returned an incomplete response. Please try again.");
			if (role === "practice_coach" && data.practice?.stage === "feedback") setMode("explain");
			setMessages((previous) => [...previous, {
				id: ++messageId.current,
				role: "guide",
				text: data.answer,
				mode: data.mode,
				tutorRole: data.role,
				sources: (data.sources ?? []).filter((source) => typeof source.url === "string" && source.url.startsWith("https://")),
				lessonLinks: (data.lessonLinks ?? []).filter((link) => typeof link.url === "string" && internalLink(link.url)),
				notice: data.notice,
				practice: data.practice,
				feedback: data.assessment?.feedback,
				assessmentOverride: data.assessmentOverride
			}]);
			if (data.externalProcessing || data.allowanceReached || aiAvailable && consent !== storedConsent) refresh().catch(() => {
				if (mounted.current) setUsageNotice("Your reply is ready. Usage totals could not refresh; reload the page to update the allowance.");
			});
		} catch (failure) {
			if (!mounted.current) return;
			const problem = failure;
			const details = problem.data && typeof problem.data === "object" ? problem.data : {};
			setMessages((previous) => previous.filter((message) => message.id !== userMessageId));
			setInput(question);
			setError(problem.message);
			if (problem.status === 402) setErrorLink({
				url: "/pricing",
				title: "See membership options"
			});
			if (["agreement_required", "onboarding_required"].includes(details.code ?? "")) setErrorLink({
				url: "/onboarding",
				title: "Review your learner agreement"
			});
			if (["demo_expired", "learner_session_changed"].includes(details.code ?? "")) setErrorLink({
				url: "/demo",
				title: "Review or restart your learner session"
			});
		} finally {
			inFlight.current = false;
			if (mounted.current) setBusy(false);
			if (requestController.current === controller) requestController.current = null;
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `tutor-layout tutor-role-${role}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "tutor-settings panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "guide-avatar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 25 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: persona.title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tutor-personality",
					children: persona.character
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mode-badge",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot" }), demo ? "Demo curriculum guide" : activeAssessment ? "Assessment process only" : aiReady ? "Ready · course knowledge" : "Curriculum guide"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: persona.description }),
				activeAssessment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "tutor-assessment-notice",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["A marked assessment is open. Every tutor is limited to process guidance until you submit or close it. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
						href: `/assessment/${activeAssessment}`,
						children: "Return to assessment."
					})] })]
				}),
				role === "assessment_tutor" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "field",
					children: ["Which submitted assessment?", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: assessmentId,
						onChange: (event) => onAssessment(event.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Latest attempt / overall progress"
						}), results.map((result) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: result.assessmentId,
							children: ownAssessmentTitle(result.assessmentId)
						}, result.assessmentId))]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "field",
					children: ["What are we exploring?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: lessonId,
						onChange: (event) => onLesson(event.target.value),
						children: catalog?.modules.map((module) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
							label: module.title,
							children: module.lessons.map((lesson) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: lesson.id,
								children: lesson.title
							}, lesson.id))
						}, module.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "field",
					children: ["How would you like to learn?", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: mode,
						onChange: (event) => setMode(event.target.value),
						disabled: busy,
						children: [
							role === "practice_coach" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "scenario",
								children: "Try a two-choice situation"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "explain",
								children: role === "practice_coach" ? "Explore the reasoning" : "Explain an idea"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "recap",
								children: "Recap the key ideas"
							})
						]
					})]
				})] }),
				aiAvailable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "check-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: consent,
							onChange: (event) => setConsentChoice(event.target.checked),
							disabled: busy
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Use AI explanations when allowance is available. I agree to send my question, a short recent conversation and lesson context to the Academy AI service. I will avoid personal or sensitive details." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small-text",
						children: "Untick this if you want the written lesson instead. Your choice is saved when you ask. Two-choice practice still uses the course’s exact options."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "tutor-privacy",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
								remaining,
								" of ",
								monthlyLimit,
								" included AI replies left."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							extraQuestions,
							" purchased replies available.",
							resetLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								" Monthly allowance resets ",
								resetLabel,
								"."
							] })
						] })]
					}),
					remaining === 0 && extraQuestions === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small-text",
						children: "Written guidance and practice remain available."
					})
				] }),
				role === "assessment_tutor" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small-text",
					children: "This tutor only uses your saved progress and the published rules. It will not reveal an answer key or another learner’s record."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "tutor-privacy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Conversation stays in this page’s memory and is not saved to your learner profile. A short recent context may accompany a follow-up. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
						href: "/privacy",
						children: "Privacy details."
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "text-link",
					disabled: busy,
					onClick: () => {
						setMessages([]);
						setError("");
						setErrorLink(null);
						setUsageNotice("");
						setInput("");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 }), "Clear this conversation"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					href: "/support",
					className: "text-link",
					children: ["Looking for personal support?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "chat-panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "chat-panel-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }), persona.title] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: demo ? "Demonstration · no AI usage" : activeAssessment ? "Marked assessment in progress" : aiReady ? `${persona.character} · course knowledge` : "Written curriculum guidance" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "chat-history",
					role: "log",
					"aria-label": `${persona.title} conversation`,
					"aria-live": "polite",
					"aria-relevant": "additions text",
					children: [
						!messages.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "chat-welcome",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "guide-avatar",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 30 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: persona.welcome }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: persona.introduction }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "prompt-grid",
									children: persona.prompts.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											send(void 0, prompt.text, prompt.mode);
										},
										disabled: busy,
										children: [prompt.text, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 14 })]
									}, prompt.text))
								})
							]
						}),
						messages.map((message) => {
							const ReplyIcon = ICONS[message.tutorRole ?? role];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `chat-message ${message.role}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "chat-speaker",
										children: message.role === "guide" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReplyIcon, { size: 14 }),
											message.mode === "support-guide" ? "Support information" : message.assessmentOverride ? "Assessment process" : tutorPersona(message.tutorRole ?? role).title,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "tutor-reply-kind",
												children: message.mode === "ai" ? "AI reply" : "Course guide"
											})
										] }) : "YOU"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "chat-message-text",
										children: message.text.split("\n").map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: line || "\xA0" }, index))
									}),
									message.practice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `tutor-practice ${message.practice.stage === "feedback" ? "has-feedback" : ""}`,
										role: "group",
										"aria-label": "Ungraded practice choices",
										children: [message.practice.options.map((option, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: message.practice?.stage === "feedback" && message.practice.selectedIndex === index ? "chosen" : "",
											disabled: busy || message.practice?.stage === "feedback" || message.id !== latestPracticeMessage?.id,
											onClick: () => {
												send(void 0, `I choose ${index === 0 ? "A" : "B"}.`, "scenario", {
													scenarioId: message.practice.scenarioId,
													choiceIndex: index
												});
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: index === 0 ? "A" : "B" }),
												option,
												message.practice?.stage === "feedback" && message.practice.selectedIndex === index && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 15 })
											]
										}, index)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Fictional, optional and ungraded. No assessment or completion record changes." })]
									}),
									Boolean(message.feedback?.length) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
										className: "tutor-feedback",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
												"Approved explanations for your submitted assessment (",
												message.feedback.length,
												")"
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "small-text",
												children: "These are the explanations released on submission. Selected answers are not retained, so this is not a reconstruction of your item-by-item mistakes."
											}),
											message.feedback?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.questionId }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.feedback })] }, item.questionId))
										]
									}),
									message.notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "small-text",
										children: message.notice
									}),
									Boolean(message.lessonLinks?.length) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "chat-sources",
										children: message.lessonLinks?.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
											href: link.url,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 12 }),
												link.title,
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 11 })
											]
										}, link.id))
									}),
									Boolean(message.sources?.length) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
										className: "tutor-source-details",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
											message.sources.length,
											" course ",
											message.sources.length === 1 ? "source" : "sources"
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "chat-sources",
											children: message.sources?.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: source.url,
												target: "_blank",
												rel: "noopener noreferrer",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 12 }),
													source.id,
													" · ",
													source.title,
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 11 })
												]
											}, source.id))
										})]
									})
								]
							}, message.id);
						}),
						busy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "guide-thinking",
							role: "status",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
								role === "assessment_tutor" ? "Checking your saved course records…" : role === "practice_coach" ? "Finding the practice guidance…" : "Finding a clear explanation…"
							]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, { message: error }),
						errorLink && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							className: "text-link",
							href: errorLink.url,
							children: [errorLink.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 14 })]
						}),
						usageNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small-text",
							role: "status",
							children: usageNotice
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: bottom })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "chat-composer",
					onSubmit: send,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "tutor-question",
							children: "Your educational question"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "tutor-question",
							value: input,
							onChange: (event) => setInput(event.target.value),
							rows: 2,
							maxLength: 1200,
							disabled: busy,
							placeholder: pendingPractice ? "Choose A or B, or ask another question…" : role === "assessment_tutor" ? "What would you like to check?" : "What would you like to understand?",
							"aria-describedby": "tutor-input-help",
							onKeyDown: (event) => {
								if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
									event.preventDefault();
									send();
								}
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "icon-button send-button",
							type: "submit",
							disabled: busy || !input.trim(),
							"aria-label": "Send question",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 23 })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "chat-disclaimer",
					id: "tutor-input-help",
					children: ["Up to 1,200 characters. Shift + Enter for a new line. Educational guidance, not diagnosis, treatment, legal advice or emergency support. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
						href: "/support",
						children: "Find personal support."
					})]
				})
			]
		})]
	});
}
//#endregion
export { Tutor as default };
