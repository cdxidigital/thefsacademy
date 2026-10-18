import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const service = readFileSync(new URL("../src/lib/academy/service.ts", import.meta.url), "utf8");
const pricing = readFileSync(new URL("../src/components/academy/membership.tsx", import.meta.url), "utf8");

// Safety regression gate while paid membership remains a pilot proposal.
// Once payment processing is implemented, replace these checks with live billing,
// webhook signature, idempotency, expiry and entitlement integration tests.
test("pilot billing endpoints explicitly remain unavailable", () => {
  assert.match(service, /const PILOT\s*=\s*true\s*;/);
  assert.match(service, /path === "\/api\/billing\/checkout"/);
  assert.match(service, /path === "\/api\/billing\/portal"/);
  assert.match(service, /throw new ApiError\(503,\s*"Paid checkout is not active in this beta/);
});

test("pilot pricing clearly discloses that paid memberships are not active", () => {
  assert.match(pricing, /paid memberships are not active/);
  assert.match(pricing, /checkoutAvailable/);
});
