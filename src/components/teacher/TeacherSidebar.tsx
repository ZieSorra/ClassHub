import React from 'react';
import { useClassHub } from '../../context/ClassHubContext';
import { TeacherNavTab } from '../../types';

interface TeacherSidebarProps {
  isMini?: boolean;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onToggleMini?: () => void;
}

export const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ isMini = false, isMobileOpen = false, onCloseMobile, onToggleMini }) => {
  const { teacherTab, setTeacherTab, setRoleMode, setSelectedStudent } = useClassHub();

  const navItems: { id: TeacherNavTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
    { id: 'data-siswa', label: 'Data Siswa', icon: 'groups' },
    { id: 'presensi', label: 'Presensi', icon: 'how_to_reg' },
    { id: 'kas-kelas', label: 'Kas Kelas', icon: 'account_balance_wallet' },
    { id: 'pembayaran', label: 'Pembayaran', icon: 'receipt_long' },
    { id: 'daftar-tugas', label: 'Daftar Tugas', icon: 'assignment' },
    { id: 'handnote', label: 'Handnote', icon: 'edit_note' },
    { id: 'bank-soal', label: 'Bank Soal', icon: 'quiz' },
    { id: 'pengaturan', label: 'Pengaturan', icon: 'settings' },
  ];

  const handleNavClick = (tabId: TeacherNavTab) => {
    setSelectedStudent(null);
    setTeacherTab(tabId);
    onCloseMobile?.();
  };

  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Tutup navigasi guru"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}
      <aside 
        className={`fixed left-0 top-0 h-full bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between transition-all duration-200 border-r border-[#eff4ff] ${
          isMini ? 'w-20' : 'w-72'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-[#eff4ff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#004ac6] to-[#2563eb] flex items-center justify-center text-white shadow-sm shadow-[#2563eb]/20 shrink-0">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            {!isMini && (
              <div className="flex flex-col">
                <span className="font-bold text-[18px] text-[#0b1c30] leading-tight tracking-tight">ClassHub</span>
                <span className="text-[11px] font-semibold text-[#434655]">Sistem Guru SD</span>
              </div>
            )}
          </div>
          {!isMini && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#dbe1ff] text-[#00174b] text-[11px] font-bold">
              Kelas V-A
            </span>
          )}
        </div>

        {/* Section Label */}
        {!isMini && (
          <div className="px-6 py-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#737686]">
              Menu Pembelajaran
            </span>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 px-4 flex-1">
          {navItems.map((item) => {
            const isActive = teacherTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left text-[14px] ${
                  isActive
                    ? 'bg-[#2563eb] text-white font-semibold shadow-[0_8px_16px_-4px_rgba(37,99,235,0.3)]'
                    : 'text-[#434655] hover:bg-[#e5eeff]/60 hover:text-[#0b1c30] font-medium'
                } ${isMini ? 'justify-center px-0' : ''}`}
                title={isMini ? item.label : undefined}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-white' : 'text-[#434655]'}`}>
                  {item.icon}
                </span>
                {!isMini && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Switcher Card */}
      <div className="p-4 border-t border-[#eff4ff]">
        {!isMini ? (
          <div className="p-3.5 rounded-xl bg-[#eff4ff] flex flex-col gap-2">
            <div className="flex items-start justify-between gap-1">
              <div className="flex flex-col">
                <span className="text-[11px] text-[#434655]">Tahun Ajaran 2026/2027</span>
                <span className="text-[12px] text-[#0b1c30] font-bold">Semester Genap</span>
              </div>
              <span className="material-symbols-outlined text-[#004ac6] text-[18px]">school</span>
            </div>
            
            <button
              type="button"
              onClick={() => setRoleMode('siswa')}
              className="mt-1 inline-flex items-center justify-between px-3 py-2 rounded-lg bg-[#d3e4fe] hover:bg-[#b4c5ff] text-[#0b1c30] text-[12px] font-bold transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#2563eb]">visibility</span>
                Mode Tampilan Siswa
              </span>
              <span className="material-symbols-outlined text-[16px]">north_east</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setRoleMode('siswa')}
            className="w-full p-2.5 rounded-xl bg-[#d3e4fe] hover:bg-[#b4c5ff] text-[#0b1c30] flex items-center justify-center transition-colors"
            title="Mode Tampilan Siswa"
          >
            <span className="material-symbols-outlined text-[18px]">north_east</span>
          </button>
        )}

        {/* Mini toggle */}
        {onToggleMini && (
          <div className="flex items-center justify-between pt-2 px-1 text-[#737686]">
            {!isMini && <span className="text-[11px]">Sidebar Mini</span>}
            <button
              type="button"
              onClick={onToggleMini}
              className="p-1 rounded-lg hover:bg-[#e5eeff] text-[#434655] transition-colors ml-auto"
              title={isMini ? "Perluas Sidebar" : "Perkecil Sidebar"}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isMini ? 'right_panel_open' : 'left_panel_close'}
              </span>
            </button>
          </div>
        )}
      </div>
      </aside>
    </>
  );
};
