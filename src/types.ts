export type RoleMode = 'guru' | 'siswa' | 'login-siswa';

export type TeacherNavTab = 
  | 'dashboard' 
  | 'data-siswa' 
  | 'presensi' 
  | 'kas-kelas' 
  | 'pembayaran' 
  | 'daftar-tugas' 
  | 'handnote' 
  | 'bank-soal' 
  | 'pengaturan';

export type StudentNavTab = 
  | 'beranda' 
  | 'presensi' 
  | 'pembayaran' 
  | 'tugas' 
  | 'handnote' 
  | 'bank-soal'
  | 'profil';

export type Gender = 'L' | 'P';

export interface Student {
  id: string;
  nis: string;
  nisn: string;
  name: string;
  nickname: string;
  gender: Gender; // 'L' = Laki-laki, 'P' = Perempuan
  photo?: string;
  initials: string;
  avatarBgColor?: string;
  classRombel: string;
  parentName: string;
  parentRole: string; // 'Ayah Kandung' | 'Ibu Kandung' | 'Wali'
  parentJob: string;
  parentMotherName?: string;
  parentMotherJob?: string;
  parentPhone: string;
  parentEmail: string;
  emergencyContact: string;
  address: string;
  dob: string;
  age: number;
  religion: string;
  medicalNotes: string;
  bloodType: string;
  status: 'aktif' | 'nonaktif' | 'dispensasi';
  rank: number;
  attendanceRate: number; // e.g. 98
  attendanceDaysCount: number; // e.g. 49
  totalDays: number; // e.g. 50
  avgScore: number;
  activeTasksCount: number;
  kasPendingAmount: number;
  badges: string[];
  lastLogin: string;
  statusNote?: string;
  recentAttendance5Days: {
    day: string;
    date: string;
    status: 'hadir' | 'sakit' | 'izin' | 'alpa';
    time?: string;
  }[];
}

export type AttendanceStatus = 'hadir' | 'sakit' | 'izin' | 'alpa';

export interface AttendanceEntry {
  studentId: string;
  status: AttendanceStatus;
  time?: string;
  note?: string;
}

export interface Transaction {
  id: string;
  studentId: string;
  studentName: string;
  studentInitials: string;
  category: string;
  amount: number;
  date: string;
  time: string;
  status: 'lunas' | 'menunggu' | 'tertunda';
  receiptNumber: string;
  verifiedBy?: string;
  paymentMethod?: string;
  evidenceNote?: string;
}

export interface FeeCategory {
  id: string;
  name: string;
  nominalPerStudent: number;
  targetTotal: number;
  collectedTotal: number;
  fullyPaidStudents: number;
  unpaidStudents: number;
  completionRate: number;
  themeColor: string;
}

export interface Assignment {
  id: string;
  subject: string;
  subjectCode: string;
  subjectIcon: string;
  badgeBg: string;
  badgeTextColor: string;
  title: string;
  description: string;
  deadlineText: string;
  isUrgent?: boolean;
  totalSubmissions: number;
  totalStudents: number;
  progressPercentage: number;
  teacherName: string;
  currentStudentStatus: 'belum_mulai' | 'sedang_dikerjakan' | 'sudah_dinilai';
  currentStudentProgress: number; // 0 to 100
  currentStudentScore?: number;
  currentStudentFeedback?: string;
}

export interface HandnoteSlide {
  pageNumber: number;
  title: string;
  content: string;
  keyPoints: string[];
}

export interface Handnote {
  id: string;
  subject: string;
  subjectCode: string;
  title: string;
  description: string;
  format: string; // 'Dokumen PDF • 2.4 MB' | 'Handnote Interaktif' | 'Slide Presentasi • 18 Halaman'
  teacherName: string;
  uploadedDate: string;
  viewCount: number;
  coverImage: string;
  categoryTag: string;
  slides: HandnoteSlide[];
}

export interface QuizQuestion {
  id: number;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  subjectType: string; // 'Sumatif Harian' | 'Simulasi STS Genap' | 'Koleksi Arsip'
  durationMinutes: number;
  totalQuestions: number;
  badgeText: string;
  badgeBg: string;
  badgeTextColor: string;
  description: string;
  questions: QuizQuestion[];
  lastScore?: number;
  lastTakenDate?: string;
  pointsAwarded?: number;
}

export interface ActivityLog {
  id: string;
  actor: string;
  actionText: string;
  highlightText?: string;
  suffixText?: string;
  timeAgo: string;
  timestamp: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}
