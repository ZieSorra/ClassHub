import React, { useState } from 'react';
import { ClassHubProvider, useClassHub } from './context/ClassHubContext';
import { TeacherSidebar } from './components/teacher/TeacherSidebar';
import { TeacherHeader } from './components/teacher/TeacherHeader';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { TeacherStudents } from './components/teacher/TeacherStudents';
import { TeacherStudentDetail } from './components/teacher/TeacherStudentDetail';
import { TeacherOtherViews } from './components/teacher/TeacherOtherViews';
import { StudentHeader } from './components/student/StudentHeader';
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentOtherViews } from './components/student/StudentOtherViews';
import { StudentLogin } from './components/student/StudentLogin';
import { ModalRoot } from './components/modals/ModalRoot';
import { ToastContainer } from './components/common/ToastContainer';

const AppContent: React.FC = () => {
  const { 
    roleMode, 
    teacherTab, 
    studentTab, 
    selectedStudent, 
    setSelectedStudent 
  } = useClassHub();

  const [isMiniSidebar, setIsMiniSidebar] = useState(false);

  // 1. Role: Student Login Page
  if (roleMode === 'login-siswa') {
    return (
      <>
        <StudentLogin />
        <ModalRoot />
        <ToastContainer />
      </>
    );
  }

  // 2. Role: Student Learning Portal
  if (roleMode === 'siswa') {
    return (
      <div className="bg-[#f8f9ff] min-h-screen flex flex-col font-sans text-[#0b1c30]">
        <StudentHeader />
        <main className="w-full pt-20 bg-[#f8f9ff] flex-1 pb-12">
          {studentTab === 'beranda' ? (
            <StudentDashboard />
          ) : (
            <StudentOtherViews tab={studentTab} />
          )}
        </main>
        
        {/* Simple Student Footer */}
        <footer className="w-full bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] py-6 mt-auto border-t border-[#eff4ff]">
          <div className="w-full px-6 lg:px-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#434655]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#2563eb] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[16px]">school</span>
              </div>
              <span className="font-semibold text-slate-700">ClassHub Sekolah Dasar © 2026/2027</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Tahun Ajaran Aktif: Semester Genap</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="text-[#006056] font-bold">Ruang Belajar Ceria</span>
            </div>
          </div>
        </footer>

        <ModalRoot />
        <ToastContainer />
      </div>
    );
  }

  // 3. Role: Teacher Workspace (Default)
  return (
    <div className="bg-[#f8f9ff] min-h-screen font-sans text-[#0b1c30]">
      <TeacherSidebar 
        isMini={isMiniSidebar} 
        onToggleMini={() => setIsMiniSidebar(!isMiniSidebar)} 
      />

      <div className={`transition-all duration-200 ${isMiniSidebar ? 'pl-20' : 'pl-72'}`}>
        <TeacherHeader isMiniSidebar={isMiniSidebar} />

        <main className="w-full pt-20 px-4 sm:px-6 lg:px-8 bg-[#f8f9ff] min-h-screen">
          <div className="max-w-[1560px] mx-auto py-6">
            {selectedStudent ? (
              <TeacherStudentDetail 
                student={selectedStudent} 
                onBack={() => setSelectedStudent(null)} 
              />
            ) : teacherTab === 'dashboard' ? (
              <TeacherDashboard />
            ) : teacherTab === 'data-siswa' ? (
              <TeacherStudents />
            ) : (
              <TeacherOtherViews tab={teacherTab} />
            )}
          </div>
        </main>
      </div>

      <ModalRoot />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ClassHubProvider>
      <AppContent />
    </ClassHubProvider>
  );
}
