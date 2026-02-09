---
status: pending
priority: p2
issue_id: "011"
tags: [code-review, database, data-integrity]
dependencies: []
---

# DB Schema: Missing Triggers, Constraints, and Uniqueness

## Problem Statement
1. No `updated_at` trigger — timestamps are permanently stale.
2. Financial columns are nullable — can have NULL totals.
3. `admin_settings` singleton not enforced.
4. No UNIQUE on `(category, name)` for pricing_options.
5. Redundant index on quote_number (UNIQUE already creates one).
6. `deposit_percent` unit mismatch (DB stores 10, engine uses 0.10).

## Findings
- **data-integrity-guardian**: C2, C3, H3, H4, H7, H5, M2, M3.

**File:** `supabase/migrations/001_initial_schema.sql`

## Acceptance Criteria
- [ ] updated_at trigger function created
- [ ] Financial columns have NOT NULL where appropriate
- [ ] admin_settings has singleton constraint
- [ ] Redundant index removed
- [ ] Unit convention documented (fraction vs percentage)
