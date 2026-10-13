# ClassHub — Sistem Guru SD & Portal Siswa Kelas V

ClassHub is a comprehensive, production-grade primary education workspace designed specifically for Indonesian elementary schools (*Kelas V SD*). The application seamlessly bridges teacher administration (*Wali Kelas*) and student learning (*Portal Siswa*) into a unified, delightful experience matching the "Ruang Belajar Ceria" design system.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following key decisions were confirmed through Phase 1 user input:
> - **Navigation Model**: Seamless role toggle in the header with persistent access between the Teacher Workspace and Student Portal, coupled with authentic dedicated login screens and autofill credentials for testing.
> - **Data Persistence**: Robust client-side reactive store persisted via `localStorage` with initial pre-populated data (28 students, attendance records, financial transactions, and tasks) and a one-click "Reset Data Demo" option.
> - **Interactivity Scope**: Full interactive dialogs and workflows across all screens: Input Presensi, Catat Kas & Kuitansi, Tambah Siswa Baru, Nonaktifkan Akun, Handnote Reader, and an interactive Bank Soal quiz runner with instant scoring.

---

## 1. Overview & Core Concept

- **What It Does**: Provides an all-in-one classroom operations and learning portal for Indonesian 5th-grade elementary classes (*Kelas V-A & V-B*). Teachers can record attendance, manage class funds (*Kas Kelas* & *Outing*), assign homework, publish illustrated Handnotes, and track student mastery. Students can view personal attendance, check pending fees, submit assignments, read illustrated notes, and practice exam simulations with gamified XP rewards.
- **Target Audience**: 
  - **Ibu Nurul Aini, S.Pd.** (Wali Kelas V-A): Handles daily morning roll calls, financial ledgers, student profiles, and parent communication via WhatsApp.
  - **Ahmad Fauzan & Classmates** (Elementary students aged 10–11): Engage with homework, track achievements (*Bintang Prestasi*), and access interactive study guides.
- **Key Value**: Replaces scattered paper roll books, physical cash envelopes, and fragmented chat threads with an integrated, child-friendly digital classroom hub.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Teacher Dashboard (Workspace Guru)**:
   - High-level KPIs: Total Siswa (28), Kehadiran Hari Ini (96.4%), Tagihan Tertunggak (Rp 680.000), Tugas Aktif (3).
   - Quick Action Bar: *Input Presensi*, *Catat Bayar*, *Tugas Baru*, *Unggah Note*.
   - Live Attendance Summary: Segmented participatory bar, status breakdown (Hadir, Sakit, Izin, Alpa), and medical excuse note preview for Ahmad Rayhan.
   - Financial Ledger (*Ikhtisar Keuangan*): Multi-category progress (Kas Mingguan, Outing Museum Sains, Modul Literasi), detailed transaction table with *Kwitansi* popup and *Cek Bukti* verification.
   - Learning Triad: Active assignments with submission bars, teacher Handnotes with view/download triggers, and Bank Soal question packs with average class scores.

2. **Student Directory & Detail Profile (Data Siswa)**:
   - Directory Table: Complete roster of 28 students with photos/initials, NIS/NISN, gender, parent contacts, account status (*Aktif* / *Nonaktif*), and search/filtering.
   - Interactive Modals: *Tambah Siswa Baru* (full validation and auto-generated default PIN) and *Konfirmasi Nonaktifkan Akun Siswa* (temporary portal suspension).
   - Deep Student Profile (*Ahmad Fauzan*): Full bio, verified medical history, parent WhatsApp direct messaging link (`wa.me`), 5-day attendance log, individual fee history, and academic task progress.

3. **Student Portal (Portal Siswa - Ahmad Fauzan)**:
   - Welcome Banner: Personalized greeting with XP points counter (120 XP), weekly achievement badge (*Bintang Prestasi*), and class ranking (#4).
   - Three Core Metric Cards: *Presensi Saya* (98% Hadir with morning punch-in time), *Tagihan & Kas* (Rp 15.000 unpaid dues with direct payment action), and *Tugas Belajar* (2 active tasks, 95 top score).
   - Upcoming Assignments (*Tugas Mendatang*): IPAS Electric Circuits (60% progress, continue button), Math Word Problems (start button), Indonesian Poetry (graded 92/100 with teacher praise notes).
   - Handnote Reading Viewer: Modal slide reader for *Bab 4: Ekosistem Sawah*, *Rumus Cepat Diskon*, and *Peta Flora Fauna*.
   - Interactive Quiz Runner (*Bank Soal*): 5-question interactive science quiz (*Ekosistem Sawah*) with timer, real-time option selection, explanation breakdown, and bonus XP awarding.

4. **Student Login Screen (Portal Siswa Gate)**:
   - Split layout with child-friendly motivational graphic banner ("Mulai Harimu dengan Semangat Belajar! 🚀") and weekly STS challenge badge.
   - Form with NIS validation, password visibility toggle, one-click demo autofill (`20260512` / `fauzan123`), and seamless switch to Teacher Workspace.

### Visual Identity & Theme ("Ruang Belajar Ceria")
- **Color Tokens**:
  - Primary Blue (`#004ac6` / `#2563eb`): Administrative anchor, primary navigation, active tabs, and primary action buttons.
  - Playful Violet (`#712ae2` / `#7c3aed`): Gamification badges, secondary tasks, *Bank Soal*, and math modules.
  - Fresh Teal (`#006056` / `#14b8a6`): Success confirmations, positive attendance (*Hadir*), and science (*IPAS*) modules.
  - Surface Backgrounds: Clean soft mist (`#f8f9ff`), elevated crisp white cards (`#ffffff`), and layered tint containers (`#eff4ff`, `#e5eeff`).
- **Typography**: Plus Jakarta Sans throughout for friendly geometry and crisp legibility; tabular numerals (`font-mono tabular-nums`) for currency amounts (*Buku Kas*) and score ledgers.
- **Imagery**: High-resolution authentic educational illustrations hotlinked directly from the user's provided HTML mockups (textbook food chain illustration, math pie charts, Indonesian flora & fauna map, and student profile portraits).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Unified Single-Page Application with Role Switcher**:
  - *Chosen Approach*: Maintain a top navigation role toggle (*Workspace Guru* ↔ *Portal Siswa* ↔ *Login Siswa*) that lets users explore either persona instantly without tedious logout/login loops, while preserving the standalone login screen.
  - *Why*: Enables seamless testing of both Wali Kelas administrative workflows and 5th-grade student interactive views.
- **Decision 2: LocalStorage Reactive State Engine**:
  - *Chosen Approach*: Centralized React state initialized from mock data and synced to `localStorage` (`classhub_state_v1`). Provide a discrete "Reset Demo Data" option in the Settings tab.
  - *Why*: Allows teachers to add students, mark attendance, record fee payments, or students to submit quiz answers and see their changes persist across browser refreshes without requiring external database provisioning.
- **Decision 3: Complete Interactive Modals for Core Flows**:
  - *Chosen Approach*: Build fully working dialogs for:
    1. *Input Presensi Cepat*: Toggle Hadir/Sakit/Izin/Alpa per student with real-time class percentage recalculation.
    2. *Catat Pembayaran*: Record cash or transfer receipts and view formatted printable *Kwitansi*.
    3. *Tambah Siswa*: Form validation for new student registration.
    4. *Handnote Reader*: Clean document/slides modal with pages and key concept summaries.
    5. *Kuis Interaktif Bank Soal*: Real-time quiz with instant scoring and explanation review.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ClassHub Application Root                       │
│  (Role State: 'guru' | 'siswa' | 'login-siswa' | 'detail-siswa')       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌─────────────────────────────────┐       ┌──────────────────────────────────┐
│   Teacher Shell (Workspace Guru)│       │    Student Shell (Portal Siswa)  │
│  - Fixed Sidebar (v2.4)         │       │  - Top Bar (Siswa Kelas V)       │
│  - Top Header (T.A. 2026/2027)  │       │  - Gamification Bar (120 XP)     │
│  - Views:                       │       │  - Views:                        │
│    • Dashboard Guru             │       │    • Beranda Siswa               │
│    • Data Siswa (Roster Table)  │       │    • Tugas & Submission          │
│    • Presensi Harian            │       │    • Handnote Viewer             │
│    • Kas & Pembayaran           │       │    • Bank Soal & Quiz Engine     │
│    • Detail Siswa (Ahmad Fauzan)│       │    • Rekap Presensi & Tagihan    │
└────────────────┬────────────────┘       └─────────────────┬────────────────┘
                 │                                          │
                 └──────────────────┬───────────────────────┘
                                    │
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │             Central Store (useClassHubStore)            │
       │  - students: Student[] (28 students, NIS, status, bio)   │
       │  - attendance: AttendanceRecord[] (Daily & history)     │
       │  - finances: Transaction[] (Kas, Outing, Seragam)       │
       │  - assignments: Assignment[] (Deadlines, submissions)   │
       │  - quizzes: Quiz[] (IPAS, Math, Indonesian)             │
       │  - handnotes: Handnote[] (Ekosistem, Diskon, Peta)      │
       │  - Persistence: LocalStorage (`classhub_data_v1`)       │
       └─────────────────────────────────────────────────────────┘
```

### Component & View Hierarchy
- `App.tsx`: Main routing and shell coordinator (Teacher layout, Student layout, Login modal).
- `components/teacher/`:
  - `TeacherHeader.tsx`: Contextual breadcrumb, semester picker, notifications, and profile pill.
  - `TeacherSidebar.tsx`: Navigation menu with active item indicators and Student View switch.
  - `TeacherDashboard.tsx`: Hero banner, KPI cards, attendance summary bar, financial table, and learning modules.
  - `StudentRoster.tsx`: Searchable, filterable student directory with pagination and action menus.
  - `StudentDetailModal.tsx`: Comprehensive Ahmad Fauzan profile (bio, parents with WhatsApp link, medical, 5-day attendance).
  - `AttendanceModal.tsx`: Rapid roll-call dialog with live counter updates.
  - `PaymentModal.tsx` & `ReceiptModal.tsx`: Fee logging and formatted digital receipt (*Kwitansi*).
  - `AddStudentModal.tsx` & `DeactivateStudentModal.tsx`: Safe roster modifications.
- `components/student/`:
  - `StudentHeader.tsx`: Student brand bar, navigation tabs, XP badge, and online indicator.
  - `StudentDashboard.tsx`: Welcome hero, gamified score cards, upcoming tasks, handnote library, and quiz launcher.
  - `StudentLogin.tsx`: Exact replica of the student login interface with demo autofill.
  - `QuizModal.tsx`: Multi-question interactive quiz runner with instant scoring and XP award.
  - `HandnoteModal.tsx`: Document preview modal with reading mode and downloadable summary.
- `data/initialData.ts`: 28 students with realistic Indonesian names, NIS, contact numbers, and educational records.

---

## 5. Implementation Phases & Verification Steps

1. **Phase 1: Foundation & Design System Setup**:
   - Configure Tailwind font family (`Plus Jakarta Sans`) and color variables in `src/index.css`.
   - Setup `metadata.json` and `index.html` headers to match ClassHub branding.
2. **Phase 2: Data Store & Initial Mock Dataset**:
   - Seed complete dataset of 28 5th-grade students, 3 fee categories, 5 transactions, 3 active tasks, 3 handnotes, and 2 quizzes with localStorage persistence.
3. **Phase 3: Teacher Workspace Implementation**:
   - Recreate the exact desktop Teacher Dashboard and Data Siswa views from the provided HTML/screenshots.
   - Implement interactive roll-call modal, new student modal, deactivate modal, and payment receipt viewer.
4. **Phase 4: Student Portal & Interactive Learning**:
   - Recreate the Student Portal dashboard with XP counter, task cards, and quick pay cues.
   - Build the interactive Handnote viewer and the Bank Soal quiz runner.
   - Recreate the Student Login page with instant demo credentials.
5. **Phase 5: Verification & Polish**:
   - Verify all role transitions, search filtering, WhatsApp external link, and form submissions.
   - Run `compile_applet` to ensure zero TypeScript and compilation errors.
