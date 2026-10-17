"use client";

import { useId, useState } from "react";
import "./business.css";

type ModelInputs = {
  members: number;
  plusShare: number;
  fixedCosts: number;
  extraCosts: number;
  moduleTakeUp: number;
  boosterTakeUp: number;
  deliveryMultiplier: number;
  refundReserve: number;
  internationalShare: number;
};

const DEFAULTS: ModelInputs = {
  members: 500,
  plusShare: 25,
  fixedCosts: 2000,
  extraCosts: 0,
  moduleTakeUp: 10,
  boosterTakeUp: 10,
  deliveryMultiplier: 1,
  refundReserve: 2,
  internationalShare: 0,
};

const currency = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});
const preciseCurrency = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const count = new Intl.NumberFormat("en-AU", { maximumFractionDigits: 1 });

// Calculated from the assumptions in docs/COMMERCIAL_MODEL.json.
// Averages represent planning volumes; they are never records of actual sales.
export function calculateBusinessScenario(input: ModelInputs) {
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
  const cardRate = 0.0165 * (1 - input.internationalShare / 100)
    + 0.035 * (input.internationalShare / 100);
  const cardFees = gross * cardRate
    + (input.members + moduleOrders + boosterOrders) * 0.3;
  const billingFees = subscriptions * 0.007 * 1.1;
  const refunds = gross * (input.refundReserve / 100);
  const delivery = (
    academyMembers * 2 + plusMembers * 4 + freeLearners * 0.1
    + moduleOrders * 0.05 + boosterOrders * 0.75
  ) * input.deliveryMultiplier;
  const contribution = netSales - cardFees - billingFees - refunds - delivery;
  const remainder = contribution - input.fixedCosts - input.extraCosts;

  return {
    academyMembers, plusMembers, freeLearners, moduleOrders, boosterOrders,
    subscriptions, modules, boosters, oneOffs, gross, gst, netSales,
    cardFees, billingFees, refunds, delivery, contribution, remainder,
  };
}

function NumberControl({
  label, value, onChange, min = 0, max, step = 1, prefix, suffix, hint, slider = false,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
  slider?: boolean;
}) {
  const id = useId();
  const update = (raw: string) => {
    const parsed = Number(raw);
    if (Number.isFinite(parsed)) onChange(Math.min(max, Math.max(min, parsed)));
  };

  return (
    <div className="field bp-control">
      <div className="bp-control-top">
        <label htmlFor={id}>{label}</label>
        <div className="bp-number-wrap">
          {prefix && <span aria-hidden="true">{prefix}</span>}
          <input
            id={id}
            type="number"
            inputMode={step < 1 ? "decimal" : "numeric"}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(event) => update(event.target.value)}
            aria-describedby={hint ? `${id}-hint` : undefined}
          />
          {suffix && <span aria-hidden="true">{suffix}</span>}
        </div>
      </div>
      {slider && (
        <input
          className="bp-range"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => update(event.target.value)}
          aria-label={`${label} slider`}
          aria-valuetext={`${prefix ?? ""}${value}${suffix ?? ""}`}
        />
      )}
      {hint && <p id={`${id}-hint`} className="bp-hint">{hint}</p>}
    </div>
  );
}

function LedgerRow({ label, amount, detail, total = false }: {
  label: string;
  amount: number;
  detail?: string;
  total?: boolean;
}) {
  return (
    <div className={`bp-ledger-row${total ? " bp-ledger-total" : ""}`}>
      <dt>{label}{detail && <span>{detail}</span>}</dt>
      <dd>{preciseCurrency.format(amount === 0 ? 0 : amount)}</dd>
    </div>
  );
}

export default function BusinessPlanner() {
  const [inputs, setInputs] = useState<ModelInputs>(DEFAULTS);
  const model = calculateBusinessScenario(inputs);
  const unitContribution = calculateBusinessScenario({ ...inputs, members: 1 }).contribution;
  const breakEven = unitContribution > 0
    ? Math.ceil((inputs.fixedCosts + inputs.extraCosts) / unitContribution)
    : null;
  const update = (key: keyof ModelInputs) => (value: number) => {
    setInputs((previous) => ({ ...previous, [key]: value }));
  };
  const share = (amount: number) => model.gross > 0 ? amount / model.gross * 100 : 0;

  return (
    <section className="page-section business-planner" aria-labelledby="bp-title">
      <header className="page-heading bp-heading">
        <div>
          <p className="eyebrow">THE ACADEMY / COMMERCIAL MODEL</p>
          <h1 id="bp-title">A clear path to<br />recurring revenue.</h1>
          <p className="bp-intro">Useful learning. Fair prices. A business that adds up.
            Explore what different membership numbers could mean for the Academy.</p>
        </div>
        <div className="bp-mode"><span aria-hidden="true" />Scenario planner<span className="bp-mode-currency">AUD</span></div>
      </header>

      <div className="bp-context-note">
        <span className="bp-note-mark" aria-hidden="true">i</span>
        <p><strong>Planning, with the assumptions in view.</strong> These figures are estimates,
          not live members, sales or a promise of profit. All scenarios below use monthly billing.</p>
      </div>

      <div className="bp-planner-grid">
        <aside className="panel bp-controls" aria-labelledby="bp-inputs-title">
          <div className="bp-panel-heading">
            <div><p className="eyebrow">01 / SET THE SCENE</p><h2 id="bp-inputs-title">Your assumptions</h2></div>
            <button className="button bp-reset" onClick={() => setInputs({ ...DEFAULTS })} type="button">Reset</button>
          </div>
          <NumberControl label="Paying members" value={inputs.members} onChange={update("members")}
            max={5000} slider hint="Active subscribers. Visitors and free accounts are separate." />
          <div className="bp-presets" aria-label="Paying member scenarios">
            {[100, 500, 1000].map((members) => (
              <button key={members} type="button" aria-pressed={inputs.members === members}
                onClick={() => update("members")(members)}>{count.format(members)} members</button>
            ))}
          </div>
          <NumberControl label="Academy Plus mix" value={inputs.plusShare} onChange={update("plusShare")}
            max={100} suffix="%" slider
            hint={`${count.format(model.academyMembers)} Academy + ${count.format(model.plusMembers)} Plus, as modelled averages.`} />
          <NumberControl label="Monthly operating costs" value={inputs.fixedCosts} onChange={update("fixedCosts")}
            max={100000} step={100} prefix="$"
            hint="Platform, content review and support overhead. A planning allowance, not a quote." />
          <NumberControl label="Marketing & founder pay" value={inputs.extraCosts} onChange={update("extraCosts")}
            max={100000} step={100} prefix="$"
            hint="Additional monthly allowance. At $0, these costs remain excluded." />

          <details className="bp-sensitivities">
            <summary>Fine-tune the model <span aria-hidden="true">+</span></summary>
            <div className="bp-sensitivity-content">
              <NumberControl label="Free learners buying a module" value={inputs.moduleTakeUp}
                onChange={update("moduleTakeUp")} max={100} suffix="%" slider
                hint="One $7 module per purchasing free learner each month." />
              <NumberControl label="Members buying a tutor booster" value={inputs.boosterTakeUp}
                onChange={update("boosterTakeUp")} max={100} suffix="%" slider
                hint="One $5 pack of 50 additional replies per purchasing member." />
              <NumberControl label="Delivery cost multiplier" value={inputs.deliveryMultiplier}
                onChange={update("deliveryMultiplier")} min={0.5} max={3} step={0.1} suffix="×" slider
                hint="Stress-test tutor, hosting and per-learner service consumption." />
              <NumberControl label="Refund & dispute reserve" value={inputs.refundReserve}
                onChange={update("refundReserve")} max={20} step={0.5} suffix="%" slider
                hint="Percentage of total receipts reserved. Not an actual refund rate." />
              <NumberControl label="International card share" value={inputs.internationalShare}
                onChange={update("internationalShare")} max={100} suffix="%" slider
                hint="International card rate: 3.5% + $0.30. Currency conversion remains excluded." />
            </div>
          </details>
          <p className="bp-controls-footnote">Model assumes {count.format(model.freeLearners)} additional active free learners:
            three for every paid member. Purchase rates are hypotheses to validate.</p>
        </aside>

        <div className="bp-results">
          <div className="stat-grid bp-stat-grid" aria-live="polite" aria-atomic="true">
            <div className="stat-card bp-stat">
              <span className="bp-stat-label">Subscription receipts / month</span>
              <strong>{currency.format(model.subscriptions)}</strong>
              <span>Recurring; GST included</span>
            </div>
            <div className="stat-card bp-stat">
              <span className="bp-stat-label">One-off receipts / month</span>
              <strong>{currency.format(model.oneOffs)}</strong>
              <span>Module passes + tutor boosters</span>
            </div>
            <div className="stat-card bp-stat">
              <span className="bp-stat-label">Net sales / month</span>
              <strong>{currency.format(model.netSales)}</strong>
              <span>After GST; before other costs</span>
            </div>
            <div className={`stat-card bp-stat bp-stat-result${model.remainder < 0 ? " bp-stat-negative" : ""}`}>
              <span className="bp-stat-label">Operating estimate / month</span>
              <strong>{currency.format(model.remainder)}</strong>
              <span>After entered costs; before income tax</span>
            </div>
          </div>

          <div className="panel bp-income-panel">
            <div className="bp-panel-heading"><div><p className="eyebrow">02 / THE REVENUE MIX</p><h2>Membership first.</h2></div>
              <span className="bp-total-receipts">{currency.format(model.gross)}<small>total monthly receipts</small></span>
            </div>
            <figure className="bp-income-chart">
              <div className="bp-stacked-bar" role="img"
                aria-label={`Estimated receipts: subscriptions ${preciseCurrency.format(model.subscriptions)}, modules ${preciseCurrency.format(model.modules)}, tutor boosters ${preciseCurrency.format(model.boosters)}.`}>
                <span className="bp-bar-subscriptions" style={{ width: `${share(model.subscriptions)}%` }} />
                <span className="bp-bar-modules" style={{ width: `${share(model.modules)}%` }} />
                <span className="bp-bar-boosters" style={{ width: `${share(model.boosters)}%` }} />
              </div>
              <figcaption className="bp-chart-legend">
                <span><i className="bp-dot-subscriptions" aria-hidden="true" />Subscriptions<strong>{currency.format(model.subscriptions)}</strong></span>
                <span><i className="bp-dot-modules" aria-hidden="true" />Module passes<strong>{currency.format(model.modules)}</strong></span>
                <span><i className="bp-dot-boosters" aria-hidden="true" />Tutor boosters<strong>{currency.format(model.boosters)}</strong></span>
              </figcaption>
            </figure>
            <p className="bp-hint">{count.format(model.moduleOrders)} module purchases by nonmembers and {count.format(model.boosterOrders)} tutor packs.
              Members already have access to all released modules.</p>
          </div>

          <div className="panel bp-ledger-panel">
            <div className="bp-panel-heading"><div><p className="eyebrow">03 / FOLLOW THE MONEY</p><h2>From receipts to remainder.</h2></div></div>
            <dl className="bp-ledger">
              <LedgerRow label="Customer payments" amount={model.gross} detail="Subscriptions + named one-off products" />
              <LedgerRow label="GST provision" amount={-model.gst} detail="1/11 of GST-inclusive receipts" />
              <LedgerRow label="Card processing" amount={-model.cardFees} detail="Domestic 1.65% / international 3.5%, plus $0.30 per payment" />
              <LedgerRow label="Subscription billing" amount={-model.billingFees} detail="0.7% of subscription volume, plus GST provision" />
              <LedgerRow label="Refund & dispute reserve" amount={-model.refunds} detail={`${inputs.refundReserve}% of total receipts`} />
              <LedgerRow label="Tutor & delivery allowance" amount={-model.delivery} detail={`${inputs.deliveryMultiplier}× the per-learner service budget`} />
              <LedgerRow label="Contribution after variable costs" amount={model.contribution} total />
              <LedgerRow label="Monthly operating allowance" amount={-inputs.fixedCosts} />
              <LedgerRow label="Marketing & founder pay allowance" amount={-inputs.extraCosts} />
              <LedgerRow label="Estimated operating remainder" amount={model.remainder} total
                detail="Before income tax and any unbudgeted costs" />
            </dl>
            <div className="bp-break-even">
              <span className="bp-break-even-number">{breakEven === null ? "—" : count.format(breakEven)}</span>
              <p><strong>{breakEven === null ? "Costs exceed the modelled contribution." : "Paying members to cover the entered allowances."}</strong>
                {breakEven === null
                  ? " Under these assumptions, adding members alone will not cover the costs."
                  : ` Approximately ${preciseCurrency.format(unitContribution)} contribution per paid member, including the associated free learners. This is a scenario threshold, not a forecast.`}</p>
            </div>
            <p className="bp-exclusions"><strong>Still outside this estimate:</strong> income tax, initial build and production,
              new audio/video, one-off specialist reviews, currency conversion, provider reserves and app-store commissions.
              Marketing and founder pay are included only to the amount entered above. This remainder is not take-home profit.</p>
          </div>
        </div>
      </div>

      <section className="panel bp-pricing-panel" aria-labelledby="bp-pricing-title">
        <div className="bp-panel-heading"><div><p className="eyebrow">THE LAUNCH OFFER</p><h2 id="bp-pricing-title">Simple to join. Easy to understand.</h2></div>
          <span className="bp-small-tag">AUD · inclusive totals</span></div>
        <div className="bp-table-scroll" role="region" aria-label="Proposed launch pricing" tabIndex={0}>
          <table className="bp-pricing-table">
            <caption className="bp-sr-only">Proposed membership prices and specific non-recurring products</caption>
            <thead><tr><th scope="col">Offer</th><th scope="col">Price</th><th scope="col">The value</th></tr></thead>
            <tbody>
              <tr><th scope="row">Explore</th><td>Free</td><td>Consent foundation, previews and learning progress. No card.</td></tr>
              <tr><th scope="row">Academy<span className="bp-table-label">Core membership</span></th><td><strong>$19 / month</strong><span>$190 billed yearly · save $38</span></td><td>All released written modules, assessments, workbook, eligible completion certificate and 50 tutor replies/month.</td></tr>
              <tr><th scope="row">Academy Plus</th><td><strong>$29 / month</strong><span>$290 billed yearly · save $58</span></td><td>Everything in Academy, 200 tutor replies/month and structured learning plans.</td></tr>
              <tr><th scope="row">Module pass</th><td>$7 once</td><td>A named module for nonmembers. Included in paid memberships.</td></tr>
              <tr><th scope="row">Tutor booster</th><td>$5 once</td><td>50 extra replies. A specific service allowance with no automatic repurchase.</td></tr>
            </tbody>
          </table>
        </div>
        <div className="bp-pricing-notes">
          <p><strong>Annual cash is not monthly revenue.</strong> An annual payment covers the full year;
            this planner models monthly plans only. Annual savings compare twelve monthly payments.</p>
          <p><strong>Fair by design.</strong> Keep retries, XP and completion eligibility free of extra charges.
            Give members a visible cancellation option and clear access-until date.</p>
        </div>
      </section>

      <details className="panel bp-assumptions-panel">
        <summary><span><span className="eyebrow">THE SMALL PRINT, MADE READABLE</span>Assumptions & sources</span><span aria-hidden="true">+</span></summary>
        <div className="bp-assumptions-content">
          <div>
            <h3>What the calculation assumes</h3>
            <p>GST registration and taxable sales; GST is reserved at 1/11 of receipts. Card fees include GST.
              Billing is budgeted at 0.7% plus a 10% GST provision; no input-tax credits are claimed.</p>
            <p>Base delivery budgets are $2 per Academy member, $4 per Plus member, $0.10 per active free learner,
              $0.05 per module order and $0.75 per booster. They are planning allowances to replace with actual costs.</p>
            <p>Paying members, their plan split and purchase volumes are modelled averages. No toolkit,
              unpublished media or other unavailable paid product contributes to these receipts.</p>
          </div>
          <div>
            <h3>What needs to be true at launch</h3>
            <p>Payment-provider acceptance must be confirmed for the actual educational content and business.
              Stripe prohibits adult content intended for sexual gratification; educational branding alone is not approval.</p>
            <p>Display inclusive prices, the renewal amount and date, and the full annual total. Keep consumer-law
              remedies intact. The Academy offers non-accredited education and a completion certificate.</p>
            <p>Current source check: <time dateTime="2026-10-17">17 October 2026</time>. Prices, provider policies and tax treatment require review before live billing.</p>
          </div>
          <nav className="bp-source-links" aria-label="Official commercial model sources">
            <a href="https://stripe.com/au/pricing" target="_blank" rel="noreferrer">Stripe AU pricing <span aria-hidden="true">↗</span></a>
            <a href="https://stripe.com/au/legal/restricted-businesses" target="_blank" rel="noreferrer">Processor restrictions <span aria-hidden="true">↗</span></a>
            <a href="https://www.accc.gov.au/consumers/pricing/price-displays" target="_blank" rel="noreferrer">ACCC price guidance <span aria-hidden="true">↗</span></a>
            <a href="https://www.aqf.edu.au/help-qualifications/accreditation-and-certification-qualifications" target="_blank" rel="noreferrer">Qualification status <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </details>
    </section>
  );
}
