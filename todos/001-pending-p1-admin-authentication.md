---
status: pending
priority: p1
issue_id: "001"
tags: [code-review, security]
dependencies: []
---

# Admin Panel Has Zero Authentication

## Problem Statement
The entire `/admin` route tree is accessible without any authentication. No `middleware.ts` exists. The login page's `handleLogin` only sets an error message. Any anonymous user can access `/admin/quotes`, `/admin/pricing`, `/admin/settings`.

## Findings
- **security-sentinel**: CRITICAL (CVSS 9.8). No Next.js middleware to intercept unauthenticated requests.
- **architecture-strategist**: Admin layout has no auth guard.
- **data-integrity-guardian**: Combined with RLS `USING (true)`, all PII is exposed.

**Files:**
- `src/app/admin/layout.tsx`
- `src/app/admin/login/page.tsx`

## Proposed Solutions

### Option A: Create Next.js middleware with Supabase auth check
- **Pros:** Standard pattern, works with Supabase Auth
- **Cons:** Requires Supabase to be connected
- **Effort:** Medium
- **Risk:** Low

### Option B: Remove admin pages entirely (they're non-functional stubs)
- **Pros:** Eliminates the attack surface immediately, reduces 323 lines of dead code
- **Cons:** No admin UI available when Supabase is eventually connected
- **Effort:** Low
- **Risk:** Low

## Recommended Action
Option B for now — remove admin stubs since they provide no functionality without Supabase. Re-add when Supabase integration is built.

## Acceptance Criteria
- [ ] No `/admin` routes accessible without authentication, OR admin routes removed
- [ ] No middleware.ts needed if admin pages are removed
