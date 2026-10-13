# ClassHub Frontend Audit

Status: **In progress — frontend is not yet approved for backend work.**

This repository contains the Google AI Studio React/TypeScript prototype. All sample records are dummy data. This audit tracks frontend behavior only; no backend/database work is included.

## Confirmed code-level findings

- [ ] Login demo accepts any non-empty password for recognized demo NIS values. Make demo credentials explicit and label authentication as simulated.
- [ ] `verifyTransaction()` marks a transaction paid without reducing the student's `kasPendingAmount`; reconcile the transaction and outstanding amount in one consistent update.
- [ ] Student attendance history uses a check icon for every status; render status-specific labels/icons/colors.
- [ ] Student profile is described in project documentation but is not in `StudentNavTab` or the student navigation list.
- [ ] The application metadata and student login still mention "SD Bintang Bangsa"; align with the agreed dummy identity "SD Islam Darul Mu'minin".
- [ ] Assignment and quiz state, XP, activity logs, and handnotes are not persisted in localStorage. Define expected demo persistence behavior.
- [ ] Attendance updates assign fixed attendance rates (98/86/94) rather than deriving them from recorded history.
- [ ] Validate responsive UI and keyboard/accessibility behavior in a browser.
- [ ] Run dependency installation, TypeScript check, and production build.

## Acceptance criteria

1. All declared frontend modules are accessible through working navigation.
2. No dead primary actions; confirmation and toast UI remain in-app (no native `alert/confirm/prompt`).
3. Payment verification updates transaction status and student outstanding balance once, without double deduction.
4. Student attendance history reflects actual stored statuses.
5. Student-only views and teacher/admin views are clearly separated as *prototype simulation*, not security enforcement.
6. Demo identity and related UI copy are consistent.
7. Refresh behavior for each simulated feature is deliberate and documented.
8. Desktop/tablet/mobile and keyboard navigation checks pass.
9. Build/typecheck complete successfully.
10. Only after these criteria pass may frontend be marked complete. Backend/database are explicitly out of scope until then.

## Working rules

- Use `frontend-audit` branch for audit changes; keep `main` as baseline.
- All data is dummy; differences from real school data are not defects by themselves.
- Fix consistency of the demo scenario, not production-data fidelity.
- Do not expand or split the agreed roadmap.
