import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as ChevronDown, D as HeartHandshake, G as ArrowRight, N as Download, S as Lock, U as BookOpen, W as ArrowUpRight, f as Search, h as Phone, j as FileText, s as Trash2, u as ShieldCheck, v as MessageCircle, w as LifeBuoy } from "../_libs/lucide-react.mjs";
import { a as Loading, c as useAcademy, i as Link$1, n as ButtonLink, o as PageHeading, r as ErrorPanel, s as request } from "./shell-CkijGP05.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resources-DqGvqRY6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RESOURCE_TABS = [
	{
		id: "worksheets",
		label: "Worksheets"
	},
	{
		id: "glossary",
		label: "Glossary"
	},
	{
		id: "sources",
		label: "Trusted sources"
	}
];
function safeExternalUrl(value) {
	try {
		const url = new URL(value);
		return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
	} catch {
		return null;
	}
}
function ExternalSource({ href, children, className = "text-link" }) {
	const url = safeExternalUrl(href);
	if (!url) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: url,
		className,
		target: "_blank",
		rel: "noopener noreferrer",
		children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
				size: 15,
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: " (opens in a new tab)"
			})
		]
	});
}
function downloadBlankWorksheet(worksheet) {
	if (!worksheet.instructions || !Array.isArray(worksheet.prompts)) return;
	const text = [
		"FLESHSESH ACADEMY — BLANK WORKSHEET",
		`${worksheet.id} · ${worksheet.title}`,
		worksheet.instructions,
		"Use fictional adults or leave any prompt blank. No personal disclosure or sexual activity is required.",
		...worksheet.prompts.map((prompt, index) => `${index + 1}. ${prompt}\n\n__________________________________________________\n`),
		"This file contains the blank prompts only. Private notes entered in the Academy are not included.",
		"Keep this download somewhere appropriate for your device. Anyone with access to the file may be able to read it."
	].join("\n\n");
	const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = `Fleshsesh_Academy_${worksheet.id.replace(/[^a-zA-Z0-9_-]/g, "")}_Blank_Worksheet.txt`;
	document.body.appendChild(anchor);
	anchor.click();
	anchor.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function WorksheetCard({ worksheet, available, unlockHref, unlockLabel }) {
	const [notes, setNotes] = (0, import_react.useState)("");
	const { toast } = useAcademy();
	if (!(available && !worksheet.locked && Array.isArray(worksheet.prompts) && typeof worksheet.instructions === "string")) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "resource-card panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "eyebrow",
				children: [worksheet.id, " · PRIVATE WORKSHEET"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: worksheet.title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A guided exercise you can complete with a fictional example." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
				href: unlockHref,
				variant: "outline",
				className: "small",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
					size: 15,
					"aria-hidden": "true"
				}), unlockLabel]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "resource-card panel worksheet-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "eyebrow",
				children: [worksheet.id, " · OPTIONAL EXERCISE"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: worksheet.title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-link",
				children: ["Open worksheet", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					size: 17,
					"aria-hidden": "true"
				})]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "worksheet-content",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: worksheet.instructions }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: worksheet.prompts?.map((prompt, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: prompt }, `${worksheet.id}-${index}`)) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "field",
					htmlFor: `notes-${worksheet.id}`,
					children: ["Your optional scratchpad", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: `notes-${worksheet.id}`,
						rows: 5,
						maxLength: 6e3,
						autoComplete: "off",
						spellCheck: false,
						value: notes,
						onChange: (event) => setNotes(event.target.value),
						"aria-describedby": `notes-privacy-${worksheet.id}`,
						placeholder: "Use a fictional example, or leave this blank."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small-text muted",
					id: `notes-privacy-${worksheet.id}`,
					children: "Unsaved. These notes stay in this page’s memory and are not submitted. Changing sections, filtering worksheets or reloading can clear them."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "resource-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "button small outline",
						onClick: () => {
							downloadBlankWorksheet(worksheet);
							toast("Your blank worksheet is ready. Private notes were not included.");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							size: 16,
							"aria-hidden": "true"
						}), "Download blank worksheet"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "text-link",
						disabled: !notes,
						onClick: () => {
							setNotes("");
							toast("This scratchpad has been cleared.");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
							size: 14,
							"aria-hidden": "true"
						}), "Clear notes"]
					})]
				})
			]
		})]
	});
}
function Resources() {
	const { catalog, me, identity, loading: academyLoading, loadError, refresh } = useAcademy();
	const [tab, setTab] = (0, import_react.useState)("worksheets");
	const [query, setQuery] = (0, import_react.useState)("");
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [accessIssue, setAccessIssue] = (0, import_react.useState)(null);
	const [retry, setRetry] = (0, import_react.useState)(0);
	const learnerKey = me?.user?.userId || identity?.email || "";
	const hasProfile = Boolean(me?.profile);
	const accessKey = JSON.stringify([
		me?.billing?.mode,
		me?.billing?.tier,
		me?.billing?.entitlements,
		me?.profile?.acceptedVersion,
		me?.policyVersion
	]);
	(0, import_react.useEffect)(() => {
		const controller = new AbortController();
		setData(null);
		setError("");
		setAccessIssue(null);
		if (!learnerKey || !hasProfile) {
			setLoading(false);
			return () => controller.abort();
		}
		setLoading(true);
		request("/api/resources", { signal: controller.signal }).then((result) => {
			if (!controller.signal.aborted) setData(result);
		}).catch((failure) => {
			if (controller.signal.aborted) return;
			if (failure.status === 401) setAccessIssue("signin");
			else if (failure.status === 403) setAccessIssue("welcome");
			else setError(failure.message);
		}).finally(() => {
			if (!controller.signal.aborted) setLoading(false);
		});
		return () => controller.abort();
	}, [
		learnerKey,
		hasProfile,
		accessKey,
		retry
	]);
	function selectTab(next) {
		setTab(next);
		setQuery("");
	}
	function navigateTabs(event, current) {
		let next = current;
		if (event.key === "ArrowRight") next = (current + 1) % RESOURCE_TABS.length;
		else if (event.key === "ArrowLeft") next = (current + RESOURCE_TABS.length - 1) % RESOURCE_TABS.length;
		else if (event.key === "Home") next = 0;
		else if (event.key === "End") next = RESOURCE_TABS.length - 1;
		else return;
		event.preventDefault();
		selectTab(RESOURCE_TABS[next].id);
		document.getElementById(`resource-tab-${RESOURCE_TABS[next].id}`)?.focus();
	}
	const search = query.trim().toLocaleLowerCase("en-AU");
	const worksheets = (data?.worksheets || catalog?.worksheets || []).filter((item) => `${item.title} ${item.id}`.toLocaleLowerCase("en-AU").includes(search));
	const glossary = (data?.glossary || catalog?.glossary || []).filter((item) => `${item.term} ${item.definition}`.toLocaleLowerCase("en-AU").includes(search));
	const sources = (data?.sources || catalog?.sources || []).filter((item) => `${item.title} ${item.publisher || ""} ${item.id}`.toLocaleLowerCase("en-AU").includes(search));
	const count = tab === "worksheets" ? worksheets.length : tab === "glossary" ? glossary.length : sources.length;
	const unlockHref = !learnerKey || accessIssue === "signin" ? "/signup" : !hasProfile || accessIssue === "welcome" ? "/onboarding" : "/pricing";
	const unlockLabel = !learnerKey || accessIssue === "signin" ? "Create a learner profile" : !hasProfile || accessIssue === "welcome" ? "Complete your welcome" : "Explore toolkit access";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section resources-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {
				kicker: "A LITTLE CLARITY, TO KEEP",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Useful tools.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Your own way." })
				] }),
				description: "Make space for a thought, find the right word, or follow an idea back to its source.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
					href: "/support",
					variant: "outline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeBuoy, {
						size: 17,
						"aria-hidden": "true"
					}), "Find support"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "notice resource-privacy",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
					size: 20,
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every exercise is optional. Use fictional adults and share only what you choose. Scratchpad notes are not saved or sent; downloads contain blank prompts only." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tabs",
				role: "tablist",
				"aria-label": "Resource collections",
				children: RESOURCE_TABS.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					id: `resource-tab-${item.id}`,
					role: "tab",
					className: tab === item.id ? "active" : "",
					"aria-selected": tab === item.id,
					"aria-controls": `resource-panel-${item.id}`,
					tabIndex: tab === item.id ? 0 : -1,
					onClick: () => selectTab(item.id),
					onKeyDown: (event) => navigateTabs(event, index),
					children: item.label
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "resource-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "search-box",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							size: 18,
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "sr-only",
							children: ["Search ", RESOURCE_TABS.find((item) => item.id === tab)?.label]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "search",
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: tab === "worksheets" ? "Find a worksheet…" : tab === "glossary" ? "Find a word or idea…" : "Find a topic or publisher…"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "small-text muted",
					"aria-live": "polite",
					children: [
						count,
						" ",
						tab === "sources" ? "references" : tab === "glossary" ? "definitions" : "worksheets"
					]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, {
				message: error,
				retry: () => setRetry((value) => value + 1)
			}),
			loadError && !catalog && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, {
				message: loadError,
				retry: () => void refresh()
			}),
			RESOURCE_TABS.filter((item) => item.id !== tab).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: `resource-panel-${item.id}`,
				role: "tabpanel",
				"aria-labelledby": `resource-tab-${item.id}`,
				hidden: true
			}, item.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: `resource-panel-${tab}`,
				role: "tabpanel",
				"aria-labelledby": `resource-tab-${tab}`,
				tabIndex: 0,
				children: academyLoading && !catalog ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, { label: "Opening your resource library…" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					tab === "worksheets" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, { label: "Checking your toolkit access…" }),
						!loading && !data?.toolkitAvailable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "notice",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
								size: 19,
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: !learnerKey || accessIssue === "signin" ? "Create a learner profile to explore the toolkit. The glossary, source register and support directory are available here without signing in." : !hasProfile || accessIssue === "welcome" ? "Complete your learner welcome to check toolkit access. Definitions and source links are open below." : "Worksheets are included with eligible membership or the toolkit. Definitions, source links and urgent support remain open." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "resource-grid",
							children: worksheets.map((worksheet) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorksheetCard, {
								worksheet,
								available: Boolean(data?.toolkitAvailable),
								unlockHref,
								unlockLabel
							}, `${learnerKey}-${worksheet.id}`))
						})
					] }),
					tab === "glossary" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "resource-grid glossary-grid",
						children: glossary.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "resource-card panel",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "glossary-term",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: entry.term })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: entry.definition })]
						}, entry.id))
					}),
					tab === "sources" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small-text muted",
						children: "Follow the course’s reference register back to its publishers. References support education; personal health decisions belong with a qualified clinician."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "resource-grid source-grid",
						children: sources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "resource-card panel",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "eyebrow",
									children: [
										source.id,
										" · ",
										source.publisher || "COURSE REFERENCE"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: source.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalSource, {
									href: source.url,
									children: "Read the source"
								})
							]
						}, source.id))
					})] }),
					count === 0 && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "empty-state",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								size: 25,
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No matches just yet." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Try a broader word, or browse the whole collection." }),
							query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "button outline",
								onClick: () => setQuery(""),
								children: "Clear search"
							})
						]
					})
				] })
			})
		]
	});
}
function Support() {
	const { me, catalog } = useAcademy();
	const live = (me?.billing?.mode ?? catalog?.mode) === "live";
	const demo = me?.billing?.mode === "demo";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section support-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {
				kicker: "YOU CAN PAUSE HERE",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"A little support.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "A next step." })
				] }),
				description: "You do not need the right words, a course result or a membership to seek help. These independent Australian services are open to you."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel urgent-support",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "IMMEDIATE DANGER OR A MEDICAL EMERGENCY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "In Australia, call 000." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ask for police, fire or ambulance. If you are outside Australia, contact your local emergency service." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "tel:000",
						className: "button primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
							size: 19,
							"aria-hidden": "true"
						}), "Call 000"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalSource, {
						href: "https://www.healthdirect.gov.au/contact-us",
						children: "Emergency and health guidance"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "resource-grid support-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "resource-card panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, {
								size: 24,
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "VIOLENCE, PRESSURE OR ABUSE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "1800RESPECT" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "National support for people affected by domestic, family or sexual violence. Phone and text support are available around the clock." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "resource-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: "button outline",
									href: "tel:1800737732",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
										size: 16,
										"aria-hidden": "true"
									}), "1800 737 732"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: "text-link",
									href: "sms:0458737732",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
										size: 16,
										"aria-hidden": "true"
									}), "Text 0458 737 732"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalSource, {
								href: "https://1800respect.org.au/texting-1800respect",
								children: "Contact options and what to expect"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "resource-card panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeBuoy, {
								size: 24,
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "A HEALTH QUESTION"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "healthdirect" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Speak with a registered nurse about a health concern, 24 hours a day. They can help you work out an appropriate next step." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								className: "button outline",
								href: "tel:1800022222",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
									size: 16,
									"aria-hidden": "true"
								}), "1800 022 222"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalSource, {
								href: "https://www.healthdirect.gov.au/contact-us",
								children: "Health advice and access options"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "resource-card panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
								size: 24,
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "LGBTIQ+ PEER SUPPORT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "QLife" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Peer support and referral for questions about sexuality, gender, bodies, feelings or relationships. Check QLife’s website for current opening hours." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								className: "button outline",
								href: "tel:1800184527",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
									size: 16,
									"aria-hidden": "true"
								}), "1800 184 527"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalSource, {
								href: "https://www.qlife.org.au/get-help",
								children: "Webchat and current service hours"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "resource-card panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
								size: 24,
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "INTIMATE IMAGES OR ONLINE HARM"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "eSafety" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Find reporting routes and practical information about image-based abuse and other serious online harm. You do not need to upload images to the Academy." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalSource, {
								href: "https://www.esafety.gov.au/report",
								className: "button outline",
								children: "Find reporting help"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalSource, {
								href: "https://www.esafety.gov.au/key-topics/image-based-abuse",
								children: "Understand image-based abuse"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel prose support-academy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "USING YOUR ACADEMY"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Make learning comfortable." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "I need to take a break." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pause whenever you choose. Saved lesson progress stays in your account. Private scratchpad notes are unsaved, so clear them before leaving a shared device. Quick exit changes the page; it does not erase browser history or downloads." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "I have a billing or account question." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Open your account to review your profile, export your learning record or manage a connected subscription. ",
							demo ? "Demo mode cannot access your real billing or account records. Leave the demo to manage your own account." : live ? "A connected membership can be managed through the secure billing portal." : "Payment collection is disabled during the beta.",
							" For an unresolved issue, contact your beta organiser; this preview does not offer a staffed live support inbox."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
							href: "/account",
							variant: "outline",
							children: ["Open my account", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								size: 16,
								"aria-hidden": "true"
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "A lesson or question does not feel right." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You can stop, revisit its source and leave the assessment. No personal disclosure is needed to complete the course. If you raise a concern with your beta organiser, the lesson or question ID and a brief description are enough; do not send intimate images or private histories." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
							href: "/resources",
							variant: "outline",
							children: ["Browse learning resources", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
								size: 16,
								"aria-hidden": "true"
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small-text muted",
						children: "The Academy is an education service. It does not monitor emergencies or provide individual diagnosis, therapy or legal decisions. Service details above were checked on 17 October 2026; use each provider’s site for current information."
					})
				]
			})
		]
	});
}
function Legal({ type }) {
	const { me } = useAcademy();
	const isLive = me?.billing?.mode === "live";
	const demo = me?.billing?.mode === "demo";
	const privacy = type === "privacy";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section legal-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {
				kicker: privacy ? "YOUR INFORMATION, EXPLAINED" : "CLEAR EXPECTATIONS",
				title: privacy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Privacy.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "With room for choice." })
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Learning here.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "On clear terms." })
				] }),
				description: privacy ? "A plain-language explanation of the current Academy’s account records, optional AI processing and your controls." : "How adult learning, course completion and the proposed paid offers work."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "tabs",
				"aria-label": "Policies",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
					href: "/privacy",
					className: privacy ? "active" : "",
					"aria-current": privacy ? "page" : void 0,
					children: "Privacy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
					href: "/terms",
					className: !privacy ? "active" : "",
					"aria-current": !privacy ? "page" : void 0,
					children: "Learning terms"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "panel prose legal-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "BETA EDITION · 17 OCTOBER 2026"
					}),
					privacy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Your profile and learning record" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sign-in uses this Academy’s own account service. Passwords are hashed and are not stored in the learning database. Google or X sign-in is handled by those providers; the Academy keeps only the verified account id, name and email. You can choose a separate learner display name." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The application stores your profile, learning intention, consent acknowledgements, lesson completion, assessment scores and attempts, course access, tutor usage counters and any issued completion record in a Cloudflare-hosted database. These records let you resume learning, check assessments and manage access. Sexual history, intimate photographs and private worksheet answers are not required." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Trying the subscribed demo" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The optional Academy Plus demo uses a temporary, separate learning record. It begins with labelled sample progress, lets you try lessons and checks, and offers a sample certificate marked as not valid. Resetting or leaving the demo does not change your real learning, profile or billing. Payment, real certificate issuance, account export and account deletion are unavailable within the demo." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Private reflections stay optional" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Scratchpad text stays in the current page’s memory. The Academy does not save or submit it. Blank worksheet downloads exclude your notes. Your own downloads, browser history, extensions or a shared device can still reveal activity, so avoid entering anything you would be uncomfortable leaving on that device." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Choosing an AI tutor" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The curriculum guides process your question and short conversation context within the Academy service without sending them to an external AI service. If the AI tutor is enabled and you opt in, The Academy AI service receives your question, approved course excerpts and source details, plus up to four recent conversation messages of at most 500 characters each. The Academy does not retain tutor message text in its application database; it records usage totals and your processing choice." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "External processing is subject to the provider’s own data controls and retention. Technical or security records may also be kept by the services operating the site. This is not a promise of anonymity or zero logs. Avoid names, account credentials, intimate images and unnecessary personal details." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Payments and marketing" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "If paid checkout is enabled, Stripe handles payment-card entry on its hosted checkout. The Academy stores payment customer/subscription identifiers and access status, not card details. Payment-provider records are managed separately. This beta does not use your learning record or tutor questions for retail targeting." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Your controls" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Use your account to update your learner name and learning intention, export your Academy record, or delete the profile and its associated progress, assessment history and completion record. During this beta no payment is collected, so deletion only removes the learning record. When a paid membership is connected later, deletion is meant to cancel that renewal first. It does not delete your secure sign-in account." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
							href: "/account",
							variant: "outline",
							children: ["Open account controls", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								size: 16,
								"aria-hidden": "true"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalSource, {
							href: "https://www.oaic.gov.au/privacy/your-privacy-rights",
							children: "Australian privacy information"
						}) })
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "An adult learning space" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The Academy is for adults aged 18 and over. Its admission policy is separate from the legal age of consent in any jurisdiction. You may use fictional examples, skip private reflection and pause whenever you need. Completion never requires a partner, sexual activity, an intimate image or a personal sexual history." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Keep your account for your own learning, respect other people’s privacy and use the content for education. Do not attempt to access another learner’s records or alter assessment results." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Curriculum and completion" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The current written curriculum is a beta authoring edition awaiting clinical and legal release review. It supports education and informed questions; it does not provide individual diagnosis, treatment, therapy or legal decisions. Only formats actually available in the learning player are included." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The Academy’s assessed Certificate of Completion records the stated course requirements. It is non-accredited adult education, not an AQF qualification, VET Statement of Attainment, professional licence or guarantee of a person’s future conduct. The core award requires orientation, all core lessons and module checks, the capstone and the applied planning assessment." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Access, prices and renewals" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [demo ? "The subscribed demo does not collect payments or create a recurring subscription. Displayed prices describe the planned paid offers." : isLive ? "Review the offer and secure checkout before committing to a purchase." : "The beta does not collect payments. Membership and individual-purchase prices shown during beta describe the planned offers.", " Prices are in Australian dollars. A paid checkout shows the amount, billing interval and access period before you confirm."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A recurring membership renews at the stated monthly or annual interval until cancelled. When a subscription is connected, manage or cancel it from your account’s billing portal; check the displayed end date for remaining access. Individual module passes and toolkit purchases are separate one-time offers. Their stated access period and included material apply; they do not automatically create a membership." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "AI questions are subject to the allowance stated for the offer and to actual service availability. A paid tier does not imply an unlimited tutor or a staffed clinician. Free consent essentials and independent urgent support are available without a paid membership." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Consumer rights" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nothing in these terms removes rights under Australian Consumer Law. A subscription cancellation and a remedy for a faulty or misdescribed service are different matters. Applicable consumer guarantees continue to apply; there is no blanket “no refunds” rule." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalSource, {
							href: "https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees",
							children: "Consumer rights and guarantees"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalSource, {
							href: "https://www.accc.gov.au/consumers/problem-with-a-product-or-service-you-bought/repair-replace-refund-cancel",
							children: "Refunds, cancellation and remedies"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Your information and support" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"The ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/privacy",
								className: "text-link",
								children: "privacy page"
							}),
							" explains saved learning records, optional AI processing, export and deletion. The ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/support",
								className: "text-link",
								children: "support directory"
							}),
							" links to independent Australian services and explains the current beta’s account-help options."
						] })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "notice",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "These pages describe the current beta. The operator’s formal contact details, final paid-service policies and specialist release review must be completed before public paid enrolment. No lawyer-reviewed compliance or external accreditation is claimed." })
					})
				]
			})
		]
	});
}
//#endregion
export { Legal, Resources, Support };
