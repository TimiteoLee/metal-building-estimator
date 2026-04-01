---
status: pending
priority: p1
issue_id: "003"
tags: [code-review, security, api]
dependencies: []
---

# No Rate Limiting on Quote Submission API

## Problem Statement
`POST /api/quote` has no rate limiting, CAPTCHA, or abuse prevention. Can be flooded to DoS the server, exhaust email quotas, and fill the database.

## Findings
- **security-sentinel**: HIGH (CVSS 7.4). Cost amplification, email abuse, DB flooding.

**File:** `src/app/api/quote/route.ts`

## Proposed Solutions

### Option A: Add IP-based rate limiting with in-memory LRU cache
- **Pros:** No external dependencies, works on Vercel
- **Cons:** Per-instance only (not shared across serverless instances)
- **Effort:** Low

### Option B: Use Vercel Edge Config / KV for distributed rate limiting
- **Pros:** Works across instances
- **Cons:** Requires Vercel KV setup
- **Effort:** Medium

## Acceptance Criteria
- [ ] API returns 429 after exceeding threshold (e.g., 5 requests/IP/hour)
