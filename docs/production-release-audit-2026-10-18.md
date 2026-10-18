# fleshsesh academy | Production technical audit (18 October 2026)

Source: `cdxidigital/thefsacademy` (`main` at audit start). Scope: repository inspection only, not verified live deployment or executed test suite.

## Evidence-backed inventory
- App framework: TanStack Start/Router, React 19, Vite, TypeScript, PostgreSQL with Neon configuration and embedded PGLite fallback (`package.json`, `src/lib/db.ts`).
- Learner account and progress storage: `profiles`, `lesson_progress`, `assessment_attempts`, `assessment_results`, `entitlements`, `tutor_usage`, `certificates` (`migrations/0002_academy.sql`).
- Course learning, assessment grading, certificate issuance, learner data export and record deletion are present in `src/lib/academy/service.ts`.
- Current prices shown in `src/components/academy/membership.tsx`: Explore free; Academy A$19/month or A$190/year; Academy Plus A$29/month or A$290/year; module A$7, tutor booster A$5. These are *existing UI proposals*, not evidence that payment collection is active.
- Backend currently returns 503 for `/api/billing/checkout` and `/api/billing/portal`; subscription purchase, cancellation, webhook verification and reconciliation must NOT be advertised as live.
- `const PILOT = true` in academy service bypasses paid module restrictions and enables toolkit access for pilot learners. Do not remove until billing and existing entitlement migration are verified.
- Assessment and progress endpoints have server-side verified learner identity, and mutating JSON endpoints use same-origin and size checks in `readJson`.
- `src/lib/db.ts` uses an in-memory embedded DB if `DATABASE_URL` is absent. Verify the deployed environment has a persistent Postgres database BEFORE a public launch.

## Release blockers and next changes (ordered)

### P0: deployment and data integrity
1. Confirm Vercel project/domain points to this repository and correct branch. Repository selection alone does not prove domain routing.
2. Verify production `DATABASE_URL`, backup/restore procedure, migration health, and persistence after cold starts. No production migrations or destructive tests without backup.
3. Inspect `npm run build` chain: currently `vite build && npm run db:migrate`; ensure DB migrations do not run implicitly in branch builds and protect production DB against preview/CI environments. Adopt explicit, independently auditable production migration job.
4. Add CI gates for typecheck, test, lint, build, and negative payment/entitlement tests on pull requests.

### P0: payments and entitlements
5. Specify merchant eligibility and payment-provider approval for an adult-industry-branded education business BEFORE adding live checkout. Never assume a processor permits the intended use.
6. Implement verified server-side checkout, idempotent webhook events, billing states, expiry/grace periods, customer self-service and audit trails. Never trust client-side pricing or premium flags.
7. Replace pilot access with entitlement enforcement only after tests prove free users, existing paid learners, refunds, cancellation and demo mode remain correct.
8. Reconcile frontend price display and server-side product catalogue; no production price changes without explicit product decision.

### P1: education and trust
9. Automated accessibility/mobile smoke tests for signup, onboarding, lessons, assessments, certificate, account controls and playback/transcripts.
10. Content review for accurate claims, sensitive topics, source freshness, age gate, privacy, and non-accredited certificate wording.
11. Add privacy-preserving funnel events and support/incident procedures; avoid intimate content or tutor transcripts in analytics.

## Acceptance gates
- Existing learner identity, progress, certificates and demo isolation preserved.
- Builds and tests pass on a non-production branch.
- No live checkout until approval, verified webhooks and entitlement tests pass.
- No `main` merge or production deployment without review and successful checks.

## Audit limitations
No production environment variable values, payment processor approval, remote deployment mapping, live user records, executed tests or smoke-test logs were available in this connector-only review. These remain unverified.
