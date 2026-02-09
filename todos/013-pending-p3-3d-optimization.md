---
status: pending
priority: p3
issue_id: "013"
tags: [code-review, performance]
dependencies: ["007"]
---

# 3D Optimization: Shared Materials, Color Lookup Maps, Mobile Performance

## Problem Statement
- Every mesh creates its own material instance (~21 materials where 5 would suffice)
- `findColorHex` does linear scan per render
- `import * as THREE` prevents tree-shaking (only `DoubleSide` used)
- ContactShadows + Environment expensive on mobile
- `preserveDrawingBuffer: true` has GPU cost on every frame

## Findings
- **performance-oracle**: OPT-1, OPT-4, OPT-7, OPT-8, OPT-12.

## Acceptance Criteria
- [ ] Shared materials via useMemo
- [ ] Pre-computed color lookup maps
- [ ] Named import: `import { DoubleSide } from 'three'`
- [ ] Conditional mobile rendering for shadows/environment
