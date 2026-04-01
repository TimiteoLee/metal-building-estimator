---
status: pending
priority: p1
issue_id: "002"
tags: [code-review, security, database]
dependencies: []
---

# RLS Policies Expose All Customer PII and Grant Admin to All Users

## Problem Statement
1. `configurations` SELECT policy uses `USING (true)` — any anonymous user can read all customer PII.
2. All "admin" RLS policies use `auth.role() = 'authenticated'` — any signup gets full write access to pricing, settings, styles.

## Findings
- **security-sentinel**: HIGH (CVSS 8.1 + 7.5). Mass PII breach vector.
- **data-integrity-guardian**: H1 — all customer name, email, phone, zip exposed.

**File:** `supabase/migrations/001_initial_schema.sql` (lines 129-138)

## Proposed Solutions

### Option A: Restrict SELECT to quote_number lookup + require admin role for writes
- **Pros:** Proper security model
- **Cons:** Requires auth infrastructure
- **Effort:** Medium

### Option B: Comment out overly permissive policies, add restrictive stubs
- **Pros:** Quick fix, blocks the vulnerability
- **Cons:** Admin features won't work until proper roles set up
- **Effort:** Low

## Acceptance Criteria
- [ ] Anonymous users cannot SELECT all rows from configurations
- [ ] Authenticated users cannot write to pricing/settings without admin role
