---
status: pending
priority: p2
issue_id: "010"
tags: [code-review, quality]
dependencies: []
---

# ReviewStep: Silent Error Swallowing, No User Feedback

## Problem Statement
The catch block in ReviewStep's submit handler does nothing. Non-OK API responses are ignored. User sees no feedback on failure. JSON parse errors return 500 instead of 400.

## Findings
- **kieran-typescript-reviewer**: MEDIUM findings 10, 11, 12.

**Files:**
- `src/components/configurator/steps/ReviewStep.tsx` (lines 43-48)
- `src/app/api/quote/route.ts` (line 86)

## Acceptance Criteria
- [ ] Error state shown to user on submission failure
- [ ] Non-OK API responses parsed and displayed
- [ ] Malformed JSON returns 400, not 500
