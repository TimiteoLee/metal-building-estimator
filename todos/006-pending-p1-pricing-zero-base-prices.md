---
status: pending
priority: p1
issue_id: "006"
tags: [code-review, architecture, pricing]
dependencies: []
---

# Pricing Engine Produces $0 Base Prices — styles:[] Passed

## Problem Statement
The configurator store passes `styles: []` to the pricing engine, so `lookupBasePrice` always returns `0`. Every quote shows a base building estimate of $0. The hardcoded `DEFAULT_PRICING_DATA` has no styles array populated from seed data.

## Findings
- **architecture-strategist**: Critical — pricing produces $0 base prices.
- **data-integrity-guardian**: M6 — seed data lean-to prices absent from DEFAULT_PRICING_DATA.

**Files:**
- `src/store/configurator-store.ts` (recalculatePricing passes empty styles)
- `src/lib/pricing-engine.ts` (lookupBasePrice returns 0 when style not found)

## Proposed Solutions

### Option A: Hardcode seed data styles into DEFAULT_PRICING_DATA
- Add the 7 building styles from `supabase/seed.sql` to the default data
- **Effort:** Low
- **Risk:** Low — makes the demo functional

## Acceptance Criteria
- [ ] Selecting a building style shows non-zero base prices
- [ ] All 7 seed styles have base prices available
- [ ] Lean-to prices match seed data
