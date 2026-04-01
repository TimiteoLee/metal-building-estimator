---
status: pending
priority: p1
issue_id: "005"
tags: [code-review, architecture, data-integrity]
dependencies: []
---

# API Route Does Not Persist Data — Quotes Discarded

## Problem Statement
`POST /api/quote` computes pricing and generates a quote number, then discards everything via `console.log`. Customer receives a quote number that exists nowhere. Also logs PII (customer email) to console.

## Findings
- **data-integrity-guardian**: C1 — every quote submission silently thrown away.
- **architecture-strategist**: Critical — no data persistence, console.log only.
- **security-sentinel**: MEDIUM — PII logged to production logs.

**File:** `src/app/api/quote/route.ts` (lines 106-110)

## Proposed Solutions

### Option A: Add Supabase insert (requires env vars)
- **Effort:** Medium (requires Supabase project setup)

### Option B: Add TODO comment, remove PII from console.log, keep as placeholder
- **Effort:** Low

## Acceptance Criteria
- [ ] Customer email removed from console.log (or masked)
- [ ] Clear TODO comment for Supabase integration
- [ ] Return proper error if persistence fails (when wired up)
