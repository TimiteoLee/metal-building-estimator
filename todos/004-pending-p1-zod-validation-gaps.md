---
status: pending
priority: p1
issue_id: "004"
tags: [code-review, security, typescript]
dependencies: []
---

# Incomplete Zod Validation — z.any() and Weak Typing

## Problem Statement
Lean-to `walls` and `doors` use `z.any()`, lean-to `roofPitch`/`gauge`/`brace` use `z.string()` instead of enums. Main `walls` uses `z.record()` instead of strict 4-key object. `screenshotUrls` accepts arbitrary strings (SSRF risk). Door dimensions are unbounded.

## Findings
- **security-sentinel**: MEDIUM (CVSS 5.3 + 5.0). Stored data injection, SSRF in PDF generation.
- **kieran-typescript-reviewer**: CRITICAL findings 1-3. Type safety bypassed.
- **data-integrity-guardian**: H6. Triple-layer mismatch (TS type, Zod schema, DB).
- **architecture-strategist**: Lax lean-to validation noted.

**File:** `src/app/api/quote/route.ts` (lines 34, 54-58, 68-72, 81)

## Proposed Solutions

### Option A: Mirror TypeScript types exactly in Zod schema
- Replace `z.any()` with proper `WallConfig`/`DoorPlacement` Zod objects
- Replace `z.record()` with `z.object({ front, back, left, right })`
- Replace `z.string()` with `z.enum()` for lean-to roofPitch/gauge/brace
- Add `.url().max(8)` to screenshotUrls
- Add `.min(1).max(20)` to door dimensions
- **Effort:** Medium

## Acceptance Criteria
- [ ] No `z.any()` in the codebase
- [ ] Walls validated as strict 4-key object
- [ ] screenshotUrls validated as URL array with max length
- [ ] Door dimensions bounded
- [ ] Remove the `as Parameters<...>` cast on line 99
