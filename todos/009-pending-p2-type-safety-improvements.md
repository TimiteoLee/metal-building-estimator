---
status: pending
priority: p2
issue_id: "009"
tags: [code-review, typescript]
dependencies: []
---

# Type Safety: Weak Record<string> Keys, Unsafe Casts, Schema Divergence

## Problem Statement
Multiple `Record<string, ...>` should use typed keys. `DEFAULT_BUILDING_CONFIG` needs `satisfies BuildingConfig`. `STEP_COMPONENTS` should use `Record<WizardStep, ...>`. CustomerInfo schema diverges from TS type.

## Findings
- **kieran-typescript-reviewer**: HIGH findings 5, 8, 9. MEDIUM finding 16, 17, 24.
- **architecture-strategist**: Schema duplication between types and Zod.

**Files:**
- `src/lib/constants.ts` (DEFAULT_BUILDING_CONFIG)
- `src/components/configurator/ConfiguratorLayout.tsx` (STEP_COMPONENTS)
- `src/components/configurator/steps/StyleStep.tsx` (STYLES_BY_CATEGORY)
- `src/components/viewer/BuildingModel.tsx` (pitchMap, wallType prop)

## Acceptance Criteria
- [ ] All Record<string> replaced with appropriate typed keys
- [ ] DEFAULT_BUILDING_CONFIG uses `satisfies BuildingConfig`
- [ ] Downstream `as BuildingConfig` casts removed
