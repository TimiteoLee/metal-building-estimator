---
status: pending
priority: p2
issue_id: "007"
tags: [code-review, performance]
dependencies: []
---

# 3D Scene Rebuilds on Every Config Change + Empty useFrame

## Problem Statement
1. `BuildingModel` subscribes to entire `config` object — any change rebuilds all geometry.
2. Empty `useFrame` callback registers unnecessary render loop hook.
3. Pricing recalculation is synchronous, causing double-render per interaction.
4. `useMemo` called inside JSX return (fragile hook ordering).

## Findings
- **performance-oracle**: CRITICAL-1, CRITICAL-2, CRITICAL-3. 60% reduction possible.
- **kieran-typescript-reviewer**: Findings 14, 15 — useMemo in JSX, empty useFrame.
- **code-simplicity-reviewer**: Empty useFrame callback is dead code.

**File:** `src/components/viewer/BuildingModel.tsx`

## Proposed Solutions

### Option A: Granular selectors + remove useFrame + debounce pricing
- Use individual selectors for dimensions, colors, walls, doors, leanTos
- Remove empty `useFrame(() => {})` entirely
- Debounce `recalculatePricing` (150ms)
- Move `useMemo` out of JSX return
- Extract `pitchMap` as module-level constant
- **Effort:** Medium

## Acceptance Criteria
- [ ] BuildingModel uses granular Zustand selectors
- [ ] Empty useFrame removed
- [ ] Pricing debounced
- [ ] useMemo at component top level, not in JSX
