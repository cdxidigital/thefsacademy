import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/business-BsXJDuzD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULTS = {
	members: 500,
	plusShare: 25,
	fixedCosts: 2e3,
	extraCosts: 0,
	moduleTakeUp: 10,
	boosterTakeUp: 10,
	deliveryMultiplier: 1,
	refundReserve: 2,
	internationalShare: 0
};
var currency = new Intl.NumberFormat("en-AU", {
	style: "currency",
	currency: "AUD",
	maximumFractionDigits: 0
});
var preciseCurrency = new Intl.NumberFormat("en-AU", {
	style: "currency",
	currency: "AUD",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});
var count = new Intl.NumberFormat("en-AU", { maximumFractionDigits: 1 });
function calculateBusinessScenario(input) {
	const academyMembers = input.members * (1 - input.plusShare / 100);
	const plusMembers = input.members * (input.plusShare / 100);
	const freeLearners = input.members * 3;
	const moduleOrders = freeLearners * (input.moduleTakeUp / 100);
	const boosterOrders = input.members * (input.boosterTakeUp / 100);
	const subscriptions = academyMembers * 19 + plusMembers * 29;
	const modules = moduleOrders * 7;
	const boosters = boosterOrders * 5;
	const oneOffs = modules + boosters;
	const gross = subscriptions + oneOffs;
	const gst = gross / 11;
	const netSales = gross - gst;
	const cardFees = gross * (.0165 * (1 - input.internationalShare / 100) + .035 * (input.internationalShare / 100)) + (input.members + moduleOrders + boosterOrders) * .3;
	const billingFees = subscriptions * .007 * 1.1;
	const refunds = gross * (input.refundReserve / 100);
	const delivery = (academyMembers * 2 + plusMembers * 4 + freeLearners * .1 + moduleOrders * .05 + boosterOrders * .75) * input.deliveryMultiplier;
	const contribution = netSales - cardFees - billingFees - refunds - delivery;
	return {
		academyMembers,
		plusMembers,
		freeLearners,
		moduleOrders,
		boosterOrders,
		subscriptions,
		modules,
		boosters,
		oneOffs,
		gross,
		gst,
		netSales,
		cardFees,
		billingFees,
		refunds,
		delivery,
		contribution,
		remainder: contribution - input.fixedCosts - input.extraCosts
	};
}
function NumberControl({ label, value, onChange, min = 0, max, step = 1, prefix, suffix, hint, slider = false }) {
	const id = (0, import_react.useId)();
	const update = (raw) => {
		const parsed = Number(raw);
		if (Number.isFinite(parsed)) onChange(Math.min(max, Math.max(min, parsed)));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "field bp-control",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bp-control-top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: id,
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bp-number-wrap",
					children: [
						prefix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: prefix
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id,
							type: "number",
							inputMode: step < 1 ? "decimal" : "numeric",
							min,
							max,
							step,
							value,
							onChange: (event) => update(event.target.value),
							"aria-describedby": hint ? `${id}-hint` : void 0
						}),
						suffix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: suffix
						})
					]
				})]
			}),
			slider && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "bp-range",
				type: "range",
				min,
				max,
				step,
				value,
				onChange: (event) => update(event.target.value),
				"aria-label": `${label} slider`,
				"aria-valuetext": `${prefix ?? ""}${value}${suffix ?? ""}`
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: `${id}-hint`,
				className: "bp-hint",
				children: hint
			})
		]
	});
}
function LedgerRow({ label, amount, detail, total = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `bp-ledger-row${total ? " bp-ledger-total" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", { children: [label, detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: detail })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: preciseCurrency.format(amount === 0 ? 0 : amount) })]
	});
}
function BusinessPlanner() {
	const [inputs, setInputs] = (0, import_react.useState)(DEFAULTS);
	const model = calculateBusinessScenario(inputs);
	const unitContribution = calculateBusinessScenario({
		...inputs,
		members: 1
	}).contribution;
	const breakEven = unitContribution > 0 ? Math.ceil((inputs.fixedCosts + inputs.extraCosts) / unitContribution) : null;
	const update = (key) => (value) => {
		setInputs((previous) => ({
			...previous,
			[key]: value
		}));
	};
	const share = (amount) => model.gross > 0 ? amount / model.gross * 100 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section business-planner",
		"aria-labelledby": "bp-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "page-heading bp-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "THE ACADEMY / COMMERCIAL MODEL"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						id: "bp-title",
						children: [
							"A clear path to",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"recurring revenue."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "bp-intro",
						children: "Useful learning. Fair prices. A business that adds up. Explore what different membership numbers could mean for the Academy."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bp-mode",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true" }),
						"Scenario planner",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bp-mode-currency",
							children: "AUD"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bp-context-note",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bp-note-mark",
					"aria-hidden": "true",
					children: "i"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Planning, with the assumptions in view." }), " These figures are estimates, not live members, sales or a promise of profit. All scenarios below use monthly billing."] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bp-planner-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "panel bp-controls",
					"aria-labelledby": "bp-inputs-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bp-panel-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "01 / SET THE SCENE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "bp-inputs-title",
								children: "Your assumptions"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "button bp-reset",
								onClick: () => setInputs({ ...DEFAULTS }),
								type: "button",
								children: "Reset"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberControl, {
							label: "Paying members",
							value: inputs.members,
							onChange: update("members"),
							max: 5e3,
							slider: true,
							hint: "Active subscribers. Visitors and free accounts are separate."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bp-presets",
							"aria-label": "Paying member scenarios",
							children: [
								100,
								500,
								1e3
							].map((members) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-pressed": inputs.members === members,
								onClick: () => update("members")(members),
								children: [count.format(members), " members"]
							}, members))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberControl, {
							label: "Academy Plus mix",
							value: inputs.plusShare,
							onChange: update("plusShare"),
							max: 100,
							suffix: "%",
							slider: true,
							hint: `${count.format(model.academyMembers)} Academy + ${count.format(model.plusMembers)} Plus, as modelled averages.`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberControl, {
							label: "Monthly operating costs",
							value: inputs.fixedCosts,
							onChange: update("fixedCosts"),
							max: 1e5,
							step: 100,
							prefix: "$",
							hint: "Platform, content review and support overhead. A planning allowance, not a quote."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberControl, {
							label: "Marketing & founder pay",
							value: inputs.extraCosts,
							onChange: update("extraCosts"),
							max: 1e5,
							step: 100,
							prefix: "$",
							hint: "Additional monthly allowance. At $0, these costs remain excluded."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "bp-sensitivities",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: ["Fine-tune the model ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "+"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bp-sensitivity-content",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberControl, {
										label: "Free learners buying a module",
										value: inputs.moduleTakeUp,
										onChange: update("moduleTakeUp"),
										max: 100,
										suffix: "%",
										slider: true,
										hint: "One $7 module per purchasing free learner each month."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberControl, {
										label: "Members buying a tutor booster",
										value: inputs.boosterTakeUp,
										onChange: update("boosterTakeUp"),
										max: 100,
										suffix: "%",
										slider: true,
										hint: "One $5 pack of 50 additional replies per purchasing member."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberControl, {
										label: "Delivery cost multiplier",
										value: inputs.deliveryMultiplier,
										onChange: update("deliveryMultiplier"),
										min: .5,
										max: 3,
										step: .1,
										suffix: "×",
										slider: true,
										hint: "Stress-test tutor, hosting and per-learner service consumption."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberControl, {
										label: "Refund & dispute reserve",
										value: inputs.refundReserve,
										onChange: update("refundReserve"),
										max: 20,
										step: .5,
										suffix: "%",
										slider: true,
										hint: "Percentage of total receipts reserved. Not an actual refund rate."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberControl, {
										label: "International card share",
										value: inputs.internationalShare,
										onChange: update("internationalShare"),
										max: 100,
										suffix: "%",
										slider: true,
										hint: "International card rate: 3.5% + $0.30. Currency conversion remains excluded."
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "bp-controls-footnote",
							children: [
								"Model assumes ",
								count.format(model.freeLearners),
								" additional active free learners: three for every paid member. Purchase rates are hypotheses to validate."
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bp-results",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "stat-grid bp-stat-grid",
							"aria-live": "polite",
							"aria-atomic": "true",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "stat-card bp-stat",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bp-stat-label",
											children: "Subscription receipts / month"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currency.format(model.subscriptions) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Recurring; GST included" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "stat-card bp-stat",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bp-stat-label",
											children: "One-off receipts / month"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currency.format(model.oneOffs) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Module passes + tutor boosters" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "stat-card bp-stat",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bp-stat-label",
											children: "Net sales / month"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currency.format(model.netSales) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "After GST; before other costs" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `stat-card bp-stat bp-stat-result${model.remainder < 0 ? " bp-stat-negative" : ""}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bp-stat-label",
											children: "Operating estimate / month"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currency.format(model.remainder) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "After entered costs; before income tax" })
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel bp-income-panel",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bp-panel-heading",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "eyebrow",
										children: "02 / THE REVENUE MIX"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Membership first." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "bp-total-receipts",
										children: [currency.format(model.gross), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "total monthly receipts" })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
									className: "bp-income-chart",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bp-stacked-bar",
										role: "img",
										"aria-label": `Estimated receipts: subscriptions ${preciseCurrency.format(model.subscriptions)}, modules ${preciseCurrency.format(model.modules)}, tutor boosters ${preciseCurrency.format(model.boosters)}.`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "bp-bar-subscriptions",
												style: { width: `${share(model.subscriptions)}%` }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "bp-bar-modules",
												style: { width: `${share(model.modules)}%` }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "bp-bar-boosters",
												style: { width: `${share(model.boosters)}%` }
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
										className: "bp-chart-legend",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
													className: "bp-dot-subscriptions",
													"aria-hidden": "true"
												}),
												"Subscriptions",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currency.format(model.subscriptions) })
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
													className: "bp-dot-modules",
													"aria-hidden": "true"
												}),
												"Module passes",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currency.format(model.modules) })
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
													className: "bp-dot-boosters",
													"aria-hidden": "true"
												}),
												"Tutor boosters",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currency.format(model.boosters) })
											] })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "bp-hint",
									children: [
										count.format(model.moduleOrders),
										" module purchases by nonmembers and ",
										count.format(model.boosterOrders),
										" tutor packs. Members already have access to all released modules."
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel bp-ledger-panel",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bp-panel-heading",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "eyebrow",
										children: "03 / FOLLOW THE MONEY"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "From receipts to remainder." })] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "bp-ledger",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
											label: "Customer payments",
											amount: model.gross,
											detail: "Subscriptions + named one-off products"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
											label: "GST provision",
											amount: -model.gst,
											detail: "1/11 of GST-inclusive receipts"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
											label: "Card processing",
											amount: -model.cardFees,
											detail: "Domestic 1.65% / international 3.5%, plus $0.30 per payment"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
											label: "Subscription billing",
											amount: -model.billingFees,
											detail: "0.7% of subscription volume, plus GST provision"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
											label: "Refund & dispute reserve",
											amount: -model.refunds,
											detail: `${inputs.refundReserve}% of total receipts`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
											label: "Tutor & delivery allowance",
											amount: -model.delivery,
											detail: `${inputs.deliveryMultiplier}× the per-learner service budget`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
											label: "Contribution after variable costs",
											amount: model.contribution,
											total: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
											label: "Monthly operating allowance",
											amount: -inputs.fixedCosts
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
											label: "Marketing & founder pay allowance",
											amount: -inputs.extraCosts
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
											label: "Estimated operating remainder",
											amount: model.remainder,
											total: true,
											detail: "Before income tax and any unbudgeted costs"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bp-break-even",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bp-break-even-number",
										children: breakEven === null ? "—" : count.format(breakEven)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: breakEven === null ? "Costs exceed the modelled contribution." : "Paying members to cover the entered allowances." }), breakEven === null ? " Under these assumptions, adding members alone will not cover the costs." : ` Approximately ${preciseCurrency.format(unitContribution)} contribution per paid member, including the associated free learners. This is a scenario threshold, not a forecast.`] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "bp-exclusions",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Still outside this estimate:" }), " income tax, initial build and production, new audio/video, one-off specialist reviews, currency conversion, provider reserves and app-store commissions. Marketing and founder pay are included only to the amount entered above. This remainder is not take-home profit."]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel bp-pricing-panel",
				"aria-labelledby": "bp-pricing-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bp-panel-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "THE LAUNCH OFFER"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "bp-pricing-title",
							children: "Simple to join. Easy to understand."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bp-small-tag",
							children: "AUD · inclusive totals"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bp-table-scroll",
						role: "region",
						"aria-label": "Proposed launch pricing",
						tabIndex: 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "bp-pricing-table",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
									className: "bp-sr-only",
									children: "Proposed membership prices and specific non-recurring products"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: "Offer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: "Price"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: "The value"
									})
								] }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "row",
											children: "Explore"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Free" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Consent foundation, previews and learning progress. No card." })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
											scope: "row",
											children: ["Academy", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "bp-table-label",
												children: "Core membership"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "$19 / month" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "$190 billed yearly · save $38" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "All released written modules, assessments, workbook, eligible completion certificate and 50 tutor replies/month." })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "row",
											children: "Academy Plus"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "$29 / month" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "$290 billed yearly · save $58" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Everything in Academy, 200 tutor replies/month and structured learning plans." })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "row",
											children: "Module pass"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "$7 once" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "A named module for nonmembers. Included in paid memberships." })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "row",
											children: "Tutor booster"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "$5 once" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "50 extra replies. A specific service allowance with no automatic repurchase." })
									] })
								] })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bp-pricing-notes",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Annual cash is not monthly revenue." }), " An annual payment covers the full year; this planner models monthly plans only. Annual savings compare twelve monthly payments."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Fair by design." }), " Keep retries, XP and completion eligibility free of extra charges. Give members a visible cancellation option and clear access-until date."] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "panel bp-assumptions-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "THE SMALL PRINT, MADE READABLE"
				}), "Assumptions & sources"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: "+"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bp-assumptions-content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "What the calculation assumes" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "GST registration and taxable sales; GST is reserved at 1/11 of receipts. Card fees include GST. Billing is budgeted at 0.7% plus a 10% GST provision; no input-tax credits are claimed." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Base delivery budgets are $2 per Academy member, $4 per Plus member, $0.10 per active free learner, $0.05 per module order and $0.75 per booster. They are planning allowances to replace with actual costs." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Paying members, their plan split and purchase volumes are modelled averages. No toolkit, unpublished media or other unavailable paid product contributes to these receipts." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "What needs to be true at launch" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Payment-provider acceptance must be confirmed for the actual educational content and business. Stripe prohibits adult content intended for sexual gratification; educational branding alone is not approval." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Display inclusive prices, the renewal amount and date, and the full annual total. Keep consumer-law remedies intact. The Academy offers non-accredited education and a completion certificate." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Current source check: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									dateTime: "2026-10-17",
									children: "17 October 2026"
								}),
								". Prices, provider policies and tax treatment require review before live billing."
							] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "bp-source-links",
							"aria-label": "Official commercial model sources",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://stripe.com/au/pricing",
									target: "_blank",
									rel: "noreferrer",
									children: ["Stripe AU pricing ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "↗"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://stripe.com/au/legal/restricted-businesses",
									target: "_blank",
									rel: "noreferrer",
									children: ["Processor restrictions ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "↗"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://www.accc.gov.au/consumers/pricing/price-displays",
									target: "_blank",
									rel: "noreferrer",
									children: ["ACCC price guidance ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "↗"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://www.aqf.edu.au/help-qualifications/accreditation-and-certification-qualifications",
									target: "_blank",
									rel: "noreferrer",
									children: ["Qualification status ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "↗"
									})]
								})
							]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { calculateBusinessScenario, BusinessPlanner as default };
