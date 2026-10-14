import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  RoleMode, 
  TeacherNavTab, 
  StudentNavTab, 
  Student, 
  AttendanceEntry, 
  AttendanceStatus,
  Transaction, 
  FeeCategory, 
  Assignment, 
  Handnote, 
  Quiz, 
  ActivityLog 
} from '../types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_DAILY_ATTENDANCE, 
  INITIAL_TRANSACTIONS, 
  INITIAL_FEE_CATEGORIES, 
  INITIAL_ASSIGNMENTS, 
  INITIAL_HANDNOTES, 
  INITIAL_QUIZZES, 
  INITIAL_ACTIVITY_LOGS 
} from '../data/initialData';

const STORAGE_KEY = 'classhub_state_v2';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface ClassHubContextType {
  roleMode: RoleMode;
  setRoleMode: (mode: RoleMode) => void;
  teacherTab: TeacherNavTab;
  setTeacherTab: (tab: TeacherNavTab) => void;
  studentTab: StudentNavTab;
  setStudentTab: (tab: StudentNavTab) => void;
  
  students: Student[];
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
  
  attendanceList: AttendanceEntry[];
  updateStudentAttendance: (studentId: string, status: AttendanceStatus, note?: string) => void;
  batchSetAttendance: (entries: AttendanceEntry[]) => void;
  updateStudentNickname: (studentId: string, nickname: string) => void;
  
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id' | 'receiptNumber'>) => void;
  verifyTransaction: (txId: string) => void;
  
  feeCategories: FeeCategory[];
  assignments: Assignment[];
  submitAssignmentProgress: (assignmentId: string, progress: number) => void;
  
  handnotes: Handnote[];
  selectedHandnote: Handnote | null;
  setSelectedHandnote: (handnote: Handnote | null) => void;
  
  quizzes: Quiz[];
  selectedQuiz: Quiz | null;
  setSelectedQuiz: (quiz: Quiz | null) => void;
  finishQuiz: (quizId: string, score: number, pointsAwarded: number) => void;
  
  activityLogs: ActivityLog[];
  
  // Modals
  activeModal: string | null;
  openModal: (modalName: string, payload?: any) => void;
  closeModal: () => void;
  modalPayload: any;
  
  // Toast notifications
  toasts: Toast[];
  showToast: (type: 'success' | 'info' | 'error', title: string, message: string) => void;
  removeToast: (id: string) => void;
  
  // Reset
  resetToDefaults: () => void;
  
  // Current Student Info for Student Portal
  currentStudent: Student;
  studentXp: number;
}

const ClassHubContext = createContext<ClassHubContextType | undefined>(undefined);

export const ClassHubProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roleMode, setRoleMode] = useState<RoleMode>('guru');
  const [teacherTab, setTeacherTab] = useState<TeacherNavTab>('dashboard');
  const [studentTab, setStudentTab] = useState<StudentNavTab>('beranda');

  // Stored state
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_students`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_STUDENTS;
  });

  const [attendanceList, setAttendanceList] = useState<AttendanceEntry[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_attendance`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DAILY_ATTENDANCE;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_transactions`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TRANSACTIONS;
  });

  const [feeCategories] = useState<FeeCategory[]>(INITIAL_FEE_CATEGORIES);
  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_assignments`);
      return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
    } catch {
      return INITIAL_ASSIGNMENTS;
    }
  });
  const [handnotes] = useState<Handnote[]>(INITIAL_HANDNOTES);
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_quizzes`);
      return saved ? JSON.parse(saved) : INITIAL_QUIZZES;
    } catch {
      return INITIAL_QUIZZES;
    }
  });
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_activityLogs`);
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
    } catch {
      return INITIAL_ACTIVITY_LOGS;
    }
  });

  const [studentXp, setStudentXp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_studentXp`);
      return saved ? JSON.parse(saved) : 120;
    } catch {
      return 120;
    }
  });
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedHandnote, setSelectedHandnote] = useState<Handnote | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  // Modal system
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalPayload, setModalPayload] = useState<any>(null);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Prevent duplicate verification from rapid repeated clicks before React re-renders.
  const verifiedTransactionIdsRef = useRef<Set<string>>(new Set());
  const completedAssignmentIdsRef = useRef<Set<string>>(new Set());
  const completedQuizIdsRef = useRef<Set<string>>(new Set());

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_students`, JSON.stringify(students));
    } catch (e) {
      console.error(e);
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_attendance`, JSON.stringify(attendanceList));
    } catch (e) {
      console.error(e);
    }
  }, [attendanceList]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_transactions`, JSON.stringify(transactions));
    } catch (e) {
      console.error(e);
    }
  }, [transactions]);

  useEffect(() => {
    try { localStorage.setItem(`${STORAGE_KEY}_assignments`, JSON.stringify(assignments)); } catch (e) { console.error(e); }
  }, [assignments]);

  useEffect(() => {
    try { localStorage.setItem(`${STORAGE_KEY}_quizzes`, JSON.stringify(quizzes)); } catch (e) { console.error(e); }
  }, [quizzes]);

  useEffect(() => {
    try { localStorage.setItem(`${STORAGE_KEY}_activityLogs`, JSON.stringify(activityLogs)); } catch (e) { console.error(e); }
  }, [activityLogs]);

  useEffect(() => {
    try { localStorage.setItem(`${STORAGE_KEY}_studentXp`, JSON.stringify(studentXp)); } catch (e) { console.error(e); }
  }, [studentXp]);

  const showToast = (type: 'success' | 'info' | 'error', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openModal = (modalName: string, payload?: any) => {
    setActiveModal(modalName);
    setModalPayload(payload || null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalPayload(null);
  };

  const updateStudentAttendance = (studentId: string, status: AttendanceStatus, note?: string) => {
    const previousEntry = attendanceList.find(entry => entry.studentId === studentId);
    const wasPresent = previousEntry?.status === 'hadir';
    const isPresent = status === 'hadir';

    setAttendanceList(prev => {
      const idx = prev.findIndex(a => a.studentId === studentId);
      const currentTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], status, time: currentTime, note: note || copy[idx].note };
        return copy;
      }
      return [...prev, { studentId, status, time: currentTime, note }];
    });

    setStudents(prev => prev.map(student => {
      if (student.id !== studentId) return student;
      const attendanceDaysCount = Math.max(0, Math.min(
        student.totalDays,
        student.attendanceDaysCount + Number(isPresent) - Number(wasPresent)
      ));
      const todayEntry = { day: 'Hari Ini', date: 'Hari ini', status, time: 'Tercatat' };
      const hasToday = student.recentAttendance5Days.some(entry => entry.date === 'Hari ini');
      const recentAttendance5Days = hasToday
        ? student.recentAttendance5Days.map(entry => entry.date === 'Hari ini' ? todayEntry : entry)
        : [...student.recentAttendance5Days.slice(-4), todayEntry];

      return {
        ...student,
        attendanceDaysCount,
        attendanceRate: student.totalDays > 0 ? Math.round((attendanceDaysCount / student.totalDays) * 100) : 0,
        recentAttendance5Days
      };
    }));

    showToast('success', 'Presensi Diperbarui', `Status presensi berhasil diubah ke ${status.toUpperCase()}.`);
  };

  const batchSetAttendance = (entries: AttendanceEntry[]) => {
    const previousByStudent = new Map<string, AttendanceEntry>(
      attendanceList.map(entry => [entry.studentId, entry])
    );
    setAttendanceList(entries);
    setStudents(prev => prev.map(student => {
      const entry = entries.find(item => item.studentId === student.id);
      if (!entry) return student;

      const wasPresent = previousByStudent.get(student.id)?.status === 'hadir';
      const isPresent = entry.status === 'hadir';
      const attendanceDaysCount = Math.max(0, Math.min(
        student.totalDays,
        student.attendanceDaysCount + Number(isPresent) - Number(wasPresent)
      ));
      const todayEntry = { day: 'Hari Ini', date: 'Hari ini', status: entry.status, time: entry.time || 'Tercatat' };
      const hasToday = student.recentAttendance5Days.some(item => item.date === 'Hari ini');
      const recentAttendance5Days = hasToday
        ? student.recentAttendance5Days.map(item => item.date === 'Hari ini' ? todayEntry : item)
        : [...student.recentAttendance5Days.slice(-4), todayEntry];

      return {
        ...student,
        attendanceDaysCount,
        attendanceRate: student.totalDays > 0 ? Math.round((attendanceDaysCount / student.totalDays) * 100) : 0,
        recentAttendance5Days
      };
    }));
    showToast('success', 'Presensi Berhasil Disimpan', `${entries.length} data presensi siswa telah disinkronkan.`);
  };

  const addTransaction = (txData: Omit<Transaction, 'id' | 'receiptNumber'>) => {
    const newId = 'tx-' + Date.now();
    const receiptNumber = 'KWT/2026/02/' + String(Math.floor(1000 + Math.random() * 9000));
    const newTx: Transaction = {
      ...txData,
      id: newId,
      receiptNumber
    };
    setTransactions(prev => [newTx, ...prev]);

    // Update student's pending kas if payment is related
    if (txData.status === 'lunas') {
      setStudents(prev => prev.map(s => {
        if (s.id === txData.studentId) {
          return {
            ...s,
            kasPendingAmount: Math.max(0, s.kasPendingAmount - txData.amount)
          };
        }
        return s;
      }));
    }

    // Add log
    setActivityLogs(prev => [
      {
        id: 'log-' + Date.now(),
        actor: 'Ibu Nurul Aini',
        actionText: 'mencatat pembayaran',
        highlightText: `${txData.category} (Rp ${txData.amount.toLocaleString('id-ID')})`,
        suffixText: `untuk ${txData.studentName}.`,
        timeAgo: 'Baru saja',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        icon: 'payments',
        iconBg: 'bg-tertiary-fixed',
        iconColor: 'text-tertiary'
      },
      ...prev
    ]);

    showToast('success', 'Pembayaran Tercatat', `Kwitansi ${receiptNumber} berhasil diterbitkan.`);
  };

  const verifyTransaction = (txId: string) => {
    if (verifiedTransactionIdsRef.current.has(txId)) {
      showToast('info', 'Transaksi Sudah Diproses', 'Transaksi ini sudah diproses; saldo tidak dikurangi lagi.');
      return;
    }

    const transaction = transactions.find(item => item.id === txId);
    if (!transaction) {
      showToast('error', 'Transaksi Tidak Ditemukan', 'Transaksi demo yang dipilih tidak tersedia.');
      return;
    }
    if (transaction.status === 'lunas') {
      showToast('info', 'Transaksi Sudah Lunas', 'Pembayaran ini sudah diverifikasi; saldo tidak dikurangi lagi.');
      return;
    }

    // Lock synchronously before scheduling React state updates, so rapid double clicks
    // cannot deduct the same transaction twice before the next render.
    verifiedTransactionIdsRef.current.add(txId);
    setTransactions(prev => prev.map(item => item.id === txId
      ? { ...item, status: 'lunas', verifiedBy: 'Ibu Nurul Aini, S.Pd.' }
      : item
    ));
    setStudents(prev => prev.map(student => student.id === transaction.studentId
      ? { ...student, kasPendingAmount: Math.max(0, student.kasPendingAmount - transaction.amount) }
      : student
    ));
    setActivityLogs(prev => [{
      id: 'log-' + Date.now(),
      actor: 'Ibu Nurul Aini',
      actionText: 'memverifikasi pembayaran',
      highlightText: `${transaction.category} (Rp ${transaction.amount.toLocaleString('id-ID')})`,
      suffixText: `untuk ${transaction.studentName}.`,
      timeAgo: 'Baru saja',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      icon: 'verified',
      iconBg: 'bg-tertiary-fixed',
      iconColor: 'text-tertiary'
    }, ...prev]);
    showToast('success', 'Pembayaran Diverifikasi', 'Status transaksi dan tunggakan siswa berhasil diperbarui.');
  };

  const updateStudentNickname = (studentId: string, nickname: string) => {
    const cleanNickname = nickname.trim().slice(0, 40);
    if (!cleanNickname) {
      showToast('error', 'Nama Panggilan Belum Valid', 'Nama panggilan tidak boleh kosong.');
      return;
    }
    setStudents(prev => prev.map(student => student.id === studentId
      ? { ...student, nickname: cleanNickname }
      : student
    ));
    showToast('success', 'Preferensi Diperbarui', 'Nama panggilan demo berhasil diperbarui di browser ini.');
  };

  const submitAssignmentProgress = (assignmentId: string, progress: number) => {
    const safeProgress = Math.max(0, Math.min(100, Number.isFinite(progress) ? progress : 0));
    setAssignments(prev => prev.map(a => {
      if (a.id !== assignmentId) return a;

      const wasDone = a.currentStudentProgress >= 100 || completedAssignmentIdsRef.current.has(assignmentId);
      const isDone = safeProgress >= 100;
      if (isDone) completedAssignmentIdsRef.current.add(assignmentId);

      return {
        ...a,
        currentStudentProgress: safeProgress,
        currentStudentStatus: isDone ? 'sudah_dinilai' : 'sedang_dikerjakan',
        totalSubmissions: isDone && !wasDone ? Math.min(a.totalStudents, a.totalSubmissions + 1) : a.totalSubmissions
      };
    }));
    showToast('success', 'Tugas Diperbarui', `Progres pengumpulan tugas kini ${safeProgress}%.`);
  };

  const finishQuiz = (quizId: string, score: number, pointsAwarded: number) => {
    if (completedQuizIdsRef.current.has(quizId)) {
      showToast('info', 'Kuis Sudah Diselesaikan', 'Hadiah XP untuk kuis ini sudah diberikan pada sesi demo ini.');
      return;
    }

    const quizExists = quizzes.some(quiz => quiz.id === quizId);
    if (!quizExists) {
      showToast('error', 'Kuis Tidak Ditemukan', 'Kuis demo yang dipilih tidak tersedia.');
      return;
    }

    completedQuizIdsRef.current.add(quizId);
    const safeScore = Math.max(0, Math.min(100, Number.isFinite(score) ? score : 0));
    const safePoints = Math.max(0, Number.isFinite(pointsAwarded) ? pointsAwarded : 0);
    setQuizzes(prev => prev.map(q => q.id === quizId
      ? { ...q, lastScore: safeScore, lastTakenDate: 'Hari ini', pointsAwarded: safePoints }
      : q
    ));
    setStudentXp(prev => prev + safePoints);
    showToast('success', 'Kuis Selesai!', `Nilai kamu: ${safeScore}/100. Selamat dapat +${safePoints} XP Poin! ⭐`);
  };

  const resetToDefaults = () => {
    verifiedTransactionIdsRef.current.clear();
    completedAssignmentIdsRef.current.clear();
    completedQuizIdsRef.current.clear();
    localStorage.removeItem(`${STORAGE_KEY}_students`);
    localStorage.removeItem(`${STORAGE_KEY}_attendance`);
    localStorage.removeItem(`${STORAGE_KEY}_transactions`);
    localStorage.removeItem(`${STORAGE_KEY}_assignments`);
    localStorage.removeItem(`${STORAGE_KEY}_quizzes`);
    localStorage.removeItem(`${STORAGE_KEY}_activityLogs`);
    localStorage.removeItem(`${STORAGE_KEY}_studentXp`);
    setStudents(INITIAL_STUDENTS);
    setAttendanceList(INITIAL_DAILY_ATTENDANCE);
    setTransactions(INITIAL_TRANSACTIONS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setQuizzes(INITIAL_QUIZZES);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    setStudentXp(120);
    showToast('info', 'Data Direset', 'Semua data telah dikembalikan ke kondisi awal demonstrasi.');
  };

  // Find Ahmad Fauzan as the default active student for Student Portal
  const currentStudent = students.find(s => s.nis === '20260512') || students[0];

  return (
    <ClassHubContext.Provider
      value={{
        roleMode,
        setRoleMode,
        teacherTab,
        setTeacherTab,
        studentTab,
        setStudentTab,
        students,
        selectedStudent,
        setSelectedStudent,
        attendanceList,
        updateStudentAttendance,
        batchSetAttendance,
        updateStudentNickname,
        transactions,
        addTransaction,
        verifyTransaction,
        feeCategories,
        assignments,
        submitAssignmentProgress,
        handnotes,
        selectedHandnote,
        setSelectedHandnote,
        quizzes,
        selectedQuiz,
        setSelectedQuiz,
        finishQuiz,
        activityLogs,
        activeModal,
        openModal,
        closeModal,
        modalPayload,
        toasts,
        showToast,
        removeToast,
        resetToDefaults,
        currentStudent,
        studentXp
      }}
    >
      {children}
    </ClassHubContext.Provider>
  );
};

export const useClassHub = () => {
  const context = useContext(ClassHubContext);
  if (!context) {
    throw new Error('useClassHub must be used within a ClassHubProvider');
  }
  return context;
};
