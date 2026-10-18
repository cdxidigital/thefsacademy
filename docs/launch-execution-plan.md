# fleshsesh academy | Launch execution plan

Updated: 18 October 2026. Status: preparation, not approved for public paid launch.

## Stage 1 — protect the existing product (current draft PR)
- [x] Audit application source and document release risks.
- [x] Add pilot payment disclosure regression tests.
- [x] Add isolated GitHub Actions PR checks (typecheck, tests, lint, build).
- [ ] Observe a green GitHub Actions run; fix existing test or lint failures.
- [ ] Confirm the live domain deploys from `cdxidigital/thefsacademy` and identify Vercel production/preview environment settings.
- [ ] Confirm persistent Neon/PostgreSQL and test backups, restores and cold-start persistence.
- [ ] Separate database schema migration approval from the build pipeline. Currently `npm run build` invokes `db:migrate`; production deploys may apply schema changes automatically. Do not change this blindly without mapping current Vercel deployment behavior.

**Exit:** green CI, verified deployment map, confirmed persistence and rollback.

## Stage 2 — paid membership readiness
- [ ] Obtain processor approval for the specific adult-industry-branded education model.
- [ ] Confirm price architecture: existing Academy A$19/month or A$190/year; Plus A$29/month or A$290/year; single module A$7; tutor booster A$5. Do not silently switch to earlier proposed alternative prices.
- [ ] Implement server-owned product IDs and prices, verified checkout session creation and customer binding.
- [ ] Verify webhook signatures, replay protection, idempotency, ordering and reconciliation.
- [ ] Implement cancellation, expiry, refunds, payment failures and support flows.
- [ ] Add automated tests for free, module, Academy, Plus, demo, expired and refunded access.
- [ ] Remove `PILOT` access bypass only after entitlement migration and staged verification.

**Exit:** successful sandbox purchase, renewal, cancellation, refund, expiry and replay tests with correct access.

## Stage 3 — learning quality and compliance
- [ ] Verify 18-module/48-lesson inventory, sources, teaching accuracy and assessments against live content.
- [ ] Check 18+ onboarding, privacy, optional reflections and AI tutor consent.
- [ ] Verify completion certificate is clearly non-accredited and not marketed as an AQF qualification.
- [ ] Test mobile, desktop, keyboard access, transcripts, login recovery, account deletion and export.
- [ ] Review terms, privacy, Australian Consumer Law disclosures and customer support contact.

**Exit:** content sign-off and no high-severity usability, security or compliance issues.

## Stage 4 — limited launch
- [ ] Pilot with consenting adult testers using sandbox billing, then a controlled real-money cohort only after approval.
- [ ] Measure registration-to-lesson, completion, free-to-paid, payment failure and support tickets without collecting intimate content.
- [ ] Set up monitoring, incident response, refund escalation and rollback owner.
- [ ] Publish launch page and support documentation only when live billing is operational.

**Exit:** successful pilot, support coverage and explicit go/no-go approval.

## Roles and dependencies
- Product owner: approve pricing, claims, launch cohort and go/no-go.
- Engineering: CI, persistence, billing and entitlement verification.
- Content reviewer: curriculum, assessment and certificate accuracy.
- Compliance/payment reviewer: processor approval, privacy, consumer terms and marketing claims.
- Support owner: cancellations, disputes, account access and incidents.

## Evidence still missing
Vercel project mapping, live production DB persistence, payment provider account and policy approval, successful CI results, actual customer numbers and existing subscriber commitments. No launch date or revenue target should be represented as guaranteed without these inputs.
