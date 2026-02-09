---
status: pending
priority: p3
issue_id: "012"
tags: [code-review, simplicity]
dependencies: []
---

# Remove Dead Code: Admin Stubs, Unused PDF, Duplicate Functions

## Problem Statement
~662 lines (19%) of removable code:
- Admin section: 323 lines of non-functional placeholder
- PDF ProposalDocument: 188 lines never imported anywhere
- Supabase clients: never imported
- Duplicate formatCurrency (3 copies)
- ~60 lines of unused types
- forwardRef on Button/Select is premature (never used with refs)

## Findings
- **code-simplicity-reviewer**: Detailed line-by-line analysis.
- **kieran-typescript-reviewer**: Finding 19 — duplicate formatCurrency.

## Acceptance Criteria
- [ ] Admin pages removed or consolidated
- [ ] PDF component either wired up or removed
- [ ] Single formatCurrency in shared util
- [ ] Unused types removed
