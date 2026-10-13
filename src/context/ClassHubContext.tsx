import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [handnotes] = useState<Handnote[]>(INITIAL_HANDNOTES);
  const [quizzes, setQuizzes] = useState<Quiz[]>(INITIAL_QUIZZES);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);

  const [studentXp, setStudentXp] = useState<number>(120);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedHandnote, setSelectedHandnote] = useState<Handnote | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  // Modal system
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalPayload, setModalPayload] = useState<any>(null);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

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

    // Update student's attendance stats
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const isHadir = status === 'hadir';
        return {
          ...s,
          attendanceRate: isHadir ? 98 : (status === 'sakit' ? 86 : 94),
          recentAttendance5Days: [
            ...s.recentAttendance5Days.slice(1),
            { day: 'Hari Ini', date: 'Hari ini', status, time: 'Tercatat' }
          ]
        };
      }
      return s;
    }));

    showToast('success', 'Presensi Diperbarui', `Status presensi berhasil diubah ke ${status.toUpperCase()}.`);
  };

  const batchSetAttendance = (entries: AttendanceEntry[]) => {
    setAttendanceList(entries);
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
    setTransactions(prev => prev.map(t => {
      if (t.id === txId) {
        return {
          ...t,
          status: 'lunas',
          verifiedBy: 'Ibu Nurul Aini, S.Pd.'
        };
      }
      return t;
    }));
    showToast('success', 'Pembayaran Diverifikasi', 'Status transaksi telah diubah menjadi LUNAS.');
  };

  const submitAssignmentProgress = (assignmentId: string, progress: number) => {
    setAssignments(prev => prev.map(a => {
      if (a.id === assignmentId) {
        const isDone = progress >= 100;
        return {
          ...a,
          currentStudentProgress: progress,
          currentStudentStatus: isDone ? 'sudah_dinilai' : 'sedang_dikerjakan',
          totalSubmissions: isDone ? Math.min(a.totalStudents, a.totalSubmissions + 1) : a.totalSubmissions
        };
      }
      return a;
    }));
    showToast('success', 'Tugas Diperbarui', `Progres pengumpulan tugas kini ${progress}%.`);
  };

  const finishQuiz = (quizId: string, score: number, pointsAwarded: number) => {
    setQuizzes(prev => prev.map(q => {
      if (q.id === quizId) {
        return {
          ...q,
          lastScore: score,
          lastTakenDate: 'Hari ini',
          pointsAwarded
        };
      }
      return q;
    }));
    setStudentXp(prev => prev + pointsAwarded);
    showToast('success', 'Kuis Selesai!', `Nilai kamu: ${score}/100. Selamat dapat +${pointsAwarded} XP Poin! ⭐`);
  };

  const resetToDefaults = () => {
    localStorage.removeItem(`${STORAGE_KEY}_students`);
    localStorage.removeItem(`${STORAGE_KEY}_attendance`);
    localStorage.removeItem(`${STORAGE_KEY}_transactions`);
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
