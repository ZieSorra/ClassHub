import React, { useState } from 'react';
import { useClassHub } from '../../context/ClassHubContext';

interface TeacherHeaderProps {
  isMiniSidebar?: boolean;
}

export const TeacherHeader: React.FC<TeacherHeaderProps> = ({ isMiniSidebar = false }) => {
  const { setRoleMode, setTeacherTab, showToast, resetToDefaults } = useClassHub();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setTeacherTab('data-siswa');
      showToast('info', 'Pencarian Siswa', `Menyaring data siswa untuk kata kunci "${searchQuery}"`);
    }
  };

  return (
    <header 
      className={`fixed top-0 right-0 h-20 bg-white/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-8 border-b border-[#eff4ff] transition-all duration-200 ${
        isMiniSidebar ? 'left-20' : 'left-72'
      }`}
    >
      {/* Left: Search Bar & Context */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 text-[#434655] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari siswa, NISN, atau tugas..."
            className="h-10 pl-10 pr-12 rounded-xl bg-[#eff4ff] text-[#0b1c30] placeholder:text-[#737686] text-[13px] w-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-all border border-transparent focus:border-[#2563eb]"
          />
          <kbd className="absolute right-3 px-1.5 py-0.5 rounded bg-[#d3e4fe] text-[11px] font-bold text-[#434655]">
            ⌘K
          </kbd>
        </form>

        <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#eaddff] text-[#25005a] text-[12px] font-bold shrink-0">
          <span className="material-symbols-outlined text-[15px] text-[#712ae2]">event_available</span>
          <span>T.A. 2026/2027</span>
        </div>
      </div>

      {/* Right Controls: Notifications, Role Switcher, Profile */}
      <div className="flex items-center gap-3">
        {/* Quick Role Switch Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRoleMode('siswa')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eff4ff] hover:bg-[#dbe1ff] text-[#004ac6] text-[12px] font-bold border border-[#d3e4fe] transition-colors"
            title="Buka Portal Siswa Ahmad Fauzan"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>Tampilan Siswa</span>
          </button>

          <button
            type="button"
            onClick={() => setRoleMode('login-siswa')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-[12px] font-semibold border border-slate-200 transition-colors"
            title="Lihat Halaman Login Siswa"
          >
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Halaman Login</span>
          </button>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
            className="relative p-2 rounded-xl text-[#434655] hover:bg-[#eff4ff] hover:text-[#0b1c30] transition-colors"
            aria-label="Notifikasi"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold">
              3
            </span>
          </button>

          {showNotificationMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-[13px] text-slate-900">Notifikasi Terkini</span>
                <span className="text-[11px] font-semibold text-blue-600">3 Belum Dibaca</span>
              </div>
              <div className="divide-y divide-slate-100 mt-2 space-y-2 text-xs">
                <div className="pt-2">
                  <p className="font-semibold text-slate-800">Surat Dokter Diterima</p>
                  <p className="text-slate-500 text-[11px]">Orang tua Ahmad Rayhan melampirkan surat izin sakit.</p>
                </div>
                <div className="pt-2">
                  <p className="font-semibold text-slate-800">Tugas IPAS Dikumpulkan</p>
                  <p className="text-slate-500 text-[11px]">24 dari 28 siswa telah mengumpulkan laporan praktikum.</p>
                </div>
                <div className="pt-2">
                  <p className="font-semibold text-slate-800">Bukti Pembayaran Baru</p>
                  <p className="text-slate-500 text-[11px]">Cantika Putri mengunggah slip pembayaran seragam.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Card / Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 pl-2 py-1 rounded-xl hover:bg-[#eff4ff] transition-colors text-left"
          >
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPvGoH5K2XStSkOBIfyILSWwoyeii40bdJtcbNS_d1_KZr3w1AJ7sX_MQ7ah0CBaRLBW-1CIfWUwYvZoDY7FqTSOofUNphWkRMB1Qdtp2U7f1gHLdfzak9PMFB5UzijKsWtiawvH5j3ed6qUdPmB2NNc8A7UMRLEg3-aMUgzq6I88WRbgzSFo8BMGufBnl1EbUAZg-F4vFhAT7ikXrEEmcAI5MIC-Hyr4ji12i9qXMyb7HeWDD8Sdz"
                alt="Profile Ibu Nurul"
                className="w-9 h-9 rounded-full object-cover shadow-xs border border-white"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#006056] ring-2 ring-white"></span>
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="text-[13px] font-bold text-[#0b1c30] leading-tight">Ibu Nurul Aini, S.Pd.</span>
              <span className="text-[11px] font-medium text-[#434655]">Wali Kelas V-A</span>
            </div>
            <span className="material-symbols-outlined text-[#737686] text-[18px]">expand_more</span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="font-bold text-xs text-slate-900">Ibu Nurul Aini, S.Pd.</p>
                <p className="text-[11px] text-slate-500">NIP. 19850412 201001 2 021</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTeacherTab('data-siswa');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-50 font-medium flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">groups</span>
                Direktori Siswa V-A
              </button>
              <button
                type="button"
                onClick={() => {
                  resetToDefaults();
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs text-amber-700 hover:bg-amber-50 font-medium flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                Reset Data Demo
              </button>
              <button
                type="button"
                onClick={() => {
                  setRoleMode('login-siswa');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs text-rose-600 hover:bg-rose-50 font-medium flex items-center gap-2 mt-1 border-t border-slate-100 pt-2"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                Keluar Sesi
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
