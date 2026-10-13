import React from 'react';
import { useClassHub } from '../../context/ClassHubContext';
import { StudentNavTab } from '../../types';

export const StudentHeader: React.FC = () => {
  const { studentTab, setStudentTab, setRoleMode, currentStudent, showToast } = useClassHub();

  const navItems: { id: StudentNavTab; label: string }[] = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'presensi', label: 'Presensi' },
    { id: 'pembayaran', label: 'Pembayaran' },
    { id: 'tugas', label: 'Tugas' },
    { id: 'handnote', label: 'Handnote' },
    { id: 'bank-soal', label: 'Bank Soal' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eff4ff]">
      <div className="h-20 w-full px-6 lg:px-10 flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand Lockup */}
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => setStudentTab('beranda')}
            className="flex items-center gap-3 text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2563eb] flex items-center justify-center text-white shadow-md shadow-[#2563eb]/20">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-[#004ac6] tracking-tight leading-tight">ClassHub</span>
              <span className="text-[10px] font-bold text-[#434655] uppercase tracking-wider">Siswa Kelas V</span>
            </div>
          </button>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = studentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStudentTab(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2563eb] text-white shadow-sm'
                      : 'text-[#434655] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Controls: Notifications, Student Profile, Switch Role */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => showToast('info', 'Notifikasi Siswa', 'Kamu memiliki 2 tugas aktif dan 1 kuis baru.')}
            className="relative p-2 rounded-xl text-[#434655] hover:bg-[#eff4ff] hover:text-[#0b1c30] transition-all cursor-pointer"
            aria-label="Notifikasi"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#ba1a1a] ring-2 ring-white"></span>
          </button>

          {/* Student Profile Pill */}
          <div className="flex items-center gap-2 pl-2 py-1">
            <div className="relative">
              <img
                src={currentStudent.photo || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ-Xo0P-Xs3jX4DzL95TuIzhbSX4GCB6GgxhMGa2V6DBOey6wwOsUHc5ralTiNZLWBmTZbE2-MZX4TcSAiypLL5JbADhvThkx75RxZG_NGk27prP33ssF5XDDJbiZFCP8Ckt_lBZG1DSCiI8VJDhHScVc0y7MgssF8dEC6u0GOTNsxj8s9h7FEB8aCTa2VPpJ-jcfq2KWdHskeCBRmwj3deVUMFldWRf_R_1fZltIbOB0eFqJ0fY5b'}
                alt={currentStudent.name}
                className="w-8 h-8 rounded-full object-cover border border-white shadow-xs"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#006056] ring-2 ring-white"></span>
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-[#0b1c30] leading-tight">{currentStudent.name}</span>
              <span className="text-[10px] text-[#434655]">Kelas V-A • Online</span>
            </div>
          </div>

          {/* Switch to Teacher Mode */}
          <button
            type="button"
            onClick={() => setRoleMode('guru')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#004ac6] text-xs font-bold transition-all cursor-pointer border border-[#d3e4fe]"
            title="Kembali ke Mode Guru"
          >
            <span className="material-symbols-outlined text-[16px]">chalkboard</span>
            <span className="hidden sm:inline">Portal Guru</span>
          </button>

          {/* Logout to Login Screen */}
          <button
            type="button"
            onClick={() => setRoleMode('login-siswa')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[#737686] hover:bg-[#ffdad6]/40 hover:text-[#ba1a1a] transition-all text-xs font-semibold cursor-pointer"
            title="Keluar ke Halaman Login"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span className="hidden md:inline">Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
