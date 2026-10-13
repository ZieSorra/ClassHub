# UAT Frontend ClassHub

Branch under test: `frontend-audit`
Scope: frontend prototype only. All records are dummy. Do not connect or create a backend/database as part of this UAT.

## Preconditions
- Run `npm install`, then `npm run lint` and `npm run build`.
- Run `npm run dev` and test in desktop and mobile viewport sizes.
- Use the demo login shown on the login page: NIS `20260512`, password `fauzan123`.
- Use the reset-demo control before repeating a scenario if available.

## A. Navigation and layout
- [ ] Teacher: open Dashboard, Data Siswa, Presensi, Kas Kelas, Pembayaran, Daftar Tugas, Handnote, Bank Soal, and Pengaturan. Confirm each tab opens the expected screen.
- [ ] Teacher mobile: menu opens; selecting an item navigates and closes the menu; tapping the overlay closes the menu.
- [ ] Student: open Beranda, Presensi, Pembayaran, Tugas, Handnote, Bank Soal, and Profil Saya.
- [ ] Student mobile: menu opens; selecting an item navigates and closes the menu.
- [ ] Verify no horizontal page overflow at 320px, 375px, 768px, 1024px, and desktop width.
- [ ] Keyboard: Tab/Shift+Tab can reach navigation, inputs, and primary actions; focus remains visible; Enter/Space activates buttons.

## B. Login demo
- [ ] Correct demo NIS/password enters student portal.
- [ ] Wrong password and unknown NIS show an in-app error without entering the portal.
- [ ] Show/hide password control has a clear accessible label.
- [ ] Confirm screen clearly states that login is a frontend simulation, not production authentication.

## C. Attendance
- [ ] Change a student from absent to present; the summary count/rate changes once.
- [ ] Change that same student from present to sick/permission/absent; the count/rate reverses correctly.
- [ ] Save attendance in batch; the student summary and recent history show the same status.
- [ ] Refresh the page; attendance and summaries remain consistent.
- [ ] Repeat the same update twice; counts do not drift.

## D. Payments
- [ ] Verify a pending transaction; its status becomes paid and the matching student's outstanding amount decreases by the transaction amount.
- [ ] Verify the same transaction again; outstanding amount does not decrease a second time.
- [ ] Confirm a missing transaction ID produces an in-app error rather than a crash.
- [ ] Refresh the page; transaction status and student outstanding amount remain consistent.
- [ ] Confirm pending/unverified transactions are not counted as validated receipts.

## E. Student profile
- [ ] Profile displays official/demo identity fields read-only.
- [ ] Save a valid nickname; it updates and remains after refresh.
- [ ] Blank nickname is rejected.
- [ ] Password simulation rejects fewer than 8 characters and mismatched confirmation.
- [ ] Password form clearly says it does not store or change an actual password.

## F. Assignment and quiz state
- [ ] Update assignment progress, refresh, and confirm the expected demo state remains.
- [ ] Complete a practice quiz, refresh, and confirm score/XP/log state remains as designed.
- [ ] Confirm unpublished teacher materials are not shown in the student library (prototype behavior only).

## G. Release gate
- [ ] No console errors during the scenarios above.
- [ ] No dead primary buttons, broken navigation, clipped dialogs, or inaccessible controls.
- [ ] All UI values remain internally consistent after repeat actions and refresh.
- [ ] Record any failure with screen, viewport size, steps to reproduce, expected result, and actual result.

Do not mark frontend audit complete until every applicable item passes. Authentication, role switching, and browser storage remain prototype-only and are not production security.
