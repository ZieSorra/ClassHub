import React, { useState } from 'react';
import { useClassHub } from '../../context/ClassHubContext';
import { Student } from '../../types';

export const TeacherStudents: React.FC = () => {
  const { students, setSelectedStudent, openModal, showToast } = useClassHub();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRombel, setFilterRombel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter calculations
  const filteredStudents = students.filter(student => {
    const matchSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nis.includes(searchQuery) ||
      student.nisn.includes(searchQuery) ||
      student.parentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus = filterStatus === 'all' || student.status === filterStatus;
    const matchGender = filterGender === 'all' || student.gender === filterGender;
    return matchSearch && matchStatus && matchGender;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const activeCount = students.filter(s => s.status === 'aktif').length;
  const inactiveCount = students.filter(s => s.status === 'nonaktif' || s.status === 'dispensasi').length;
  const maleCount = students.filter(s => s.gender === 'L').length;
  const femaleCount = students.filter(s => s.gender === 'P').length;

  const handleResetFilter = () => {
    setSearchQuery('');
    setFilterRombel('all');
    setFilterStatus('all');
    setFilterGender('all');
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col w-full pb-12 space-y-6">
      {/* Header Section with Breadcrumbs & Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-[#eff4ff] relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-1.5 text-xs text-[#434655]">
            <span className="uppercase tracking-wider text-[#004ac6] font-bold">Portal Administrasi</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#737686]">Rombel V-A</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#0b1c30] font-semibold">Direktori Siswa</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
              Data Siswa — Kelas V-A
            </h1>
            <span className="px-3 py-0.5 rounded-full bg-[#71f8e4]/40 text-[#00201c] text-xs font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#006056] animate-pulse"></span>
              Semester Genap 2026/2027
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#434655] max-w-2xl leading-relaxed">
            Kelola direktori siswa, status akun login portal, biodata, rekap data wali murid, serta pengelolaan hak akses peserta didik.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto relative z-10 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eff4ff] text-[#434655] border border-[#d3e4fe]/60">
            <span className="material-symbols-outlined text-[18px] text-[#004ac6]">verified_user</span>
            <span className="text-xs">
              Sinkronisasi Dapodik: <strong className="text-[#0b1c30] font-bold">Aktif (Hari Ini 06:30)</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Top Summary Statistic Cards (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Total Siswa */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eff4ff] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#737686] font-bold">Total Siswa Terdaftar</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-[#0b1c30]">{students.length}</span>
                <span className="text-xs font-medium text-[#434655]">Siswa</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#dbe1ff] flex items-center justify-center text-[#004ac6]">
              <span className="material-symbols-outlined text-[24px]">groups</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#eff4ff] flex items-center justify-between text-xs text-[#434655]">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#004ac6]"></span> {maleCount} Laki-laki</span>
              <span>•</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#712ae2]"></span> {femaleCount} Perempuan</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#0b1c30] font-bold text-[10px]">
              100% Kuota
            </span>
          </div>
        </div>

        {/* Card 2: Akun Portal Aktif */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eff4ff] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#006056] font-bold">Akun Portal Aktif</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-[#006056]">{activeCount}</span>
                <span className="text-xs font-medium text-[#434655]">Siswa</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#71f8e4]/30 flex items-center justify-center text-[#00201c]">
              <span className="material-symbols-outlined text-[24px]">devices</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#eff4ff] flex items-center justify-between text-xs text-[#434655]">
            <div className="flex items-center gap-1 text-[#006056] font-semibold">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Telah terhubung Portal Siswa</span>
            </div>
            <span className="font-bold text-[#006056]">{((activeCount / students.length) * 100).toFixed(1)}%</span>
          </div>
        </div>

        {/* Card 3: Akun Nonaktif / Pending */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eff4ff] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#ba1a1a] font-bold">Akun Nonaktif / Pending</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-[#ba1a1a]">{inactiveCount}</span>
                <span className="text-xs font-medium text-[#434655]">Siswa</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#ffdad6] flex items-center justify-center text-[#93000a]">
              <span className="material-symbols-outlined text-[24px]">person_off</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#eff4ff] flex items-center justify-between text-xs text-[#434655]">
            <div className="flex items-center gap-1 truncate text-[#ba1a1a] font-medium">
              <span className="material-symbols-outlined text-[16px]">info</span>
              <span className="truncate">Surat Izin Sakit (Ahmad Rayhan)</span>
            </div>
            <button 
              type="button"
              onClick={() => openModal('surat-dokter')}
              className="font-bold text-[#004ac6] hover:underline shrink-0 text-xs cursor-pointer"
            >
              Review
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar & Action Controls */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eff4ff] space-y-4">
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
          {/* Left: Search Bar */}
          <div className="relative flex-1 max-w-xl">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#434655] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari berdasarkan NIS atau nama siswa..."
              className="w-full h-11 pl-11 pr-20 rounded-xl bg-[#eff4ff] text-xs text-[#0b1c30] placeholder:text-[#737686] focus:bg-white focus:ring-2 focus:ring-[#004ac6] focus:outline-none transition-all border border-transparent focus:border-[#004ac6]"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="px-2 py-0.5 rounded bg-[#d3e4fe] text-[#434655] text-[11px] font-bold">⌘K</kbd>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => showToast('info', 'Impor Data', 'Templat Excel/CSV Dapodik siap diunggah.')}
              className="flex items-center gap-1.5 px-4 h-11 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-bold transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">upload</span>
              <span>Impor Data</span>
            </button>
            <button
              type="button"
              onClick={() => showToast('success', 'Ekspor Data', '28 data siswa berhasil diekspor ke format Excel.')}
              className="flex items-center gap-1.5 px-4 h-11 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-bold transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Ekspor Data</span>
            </button>
            <button
              type="button"
              onClick={() => openModal('tambah-siswa')}
              className="flex items-center gap-1.5 px-5 h-11 rounded-xl bg-[#004ac6] hover:bg-[#2563eb] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>Tambah Siswa</span>
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#eff4ff]">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-[#737686] text-xs font-semibold mr-1">
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              <span>Filter:</span>
            </div>

            {/* Filter Rombel */}
            <select
              value={filterRombel}
              onChange={(e) => setFilterRombel(e.target.value)}
              className="h-9 px-3 rounded-xl bg-[#eff4ff] text-xs text-[#0b1c30] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">Kelas V-A (Aktif)</option>
              <option value="vb">Kelas V-B</option>
              <option value="semua">Semua Rombel</option>
            </select>

            {/* Filter Status */}
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 px-3 rounded-xl bg-[#eff4ff] text-xs text-[#0b1c30] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Status</option>
              <option value="aktif">Status: Aktif</option>
              <option value="nonaktif">Status: Nonaktif</option>
            </select>

            {/* Filter Gender */}
            <select
              value={filterGender}
              onChange={(e) => {
                setFilterGender(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 px-3 rounded-xl bg-[#eff4ff] text-xs text-[#0b1c30] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Jenis Kelamin</option>
              <option value="L">Laki-laki ({maleCount})</option>
              <option value="P">Perempuan ({femaleCount})</option>
            </select>

            <button
              type="button"
              onClick={handleResetFilter}
              className="px-3 py-1.5 rounded-lg text-[#737686] hover:text-[#0b1c30] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">restart_alt</span>
              <span>Reset Filter</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#434655]">
              Menampilkan <strong className="text-[#0b1c30]">{paginatedStudents.length} dari {filteredStudents.length} Siswa</strong>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#d3e4fe] text-[#0b1c30] text-[10px] font-bold">
              V-A Pilihan
            </span>
          </div>
        </div>
      </div>

      {/* Table of Students */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#eff4ff] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#eff4ff] text-[#434655] font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 w-12 text-center">No.</th>
                <th className="py-3.5 px-4">NIS & Foto Profil</th>
                <th className="py-3.5 px-4">Nama Lengkap & Gender</th>
                <th className="py-3.5 px-4">Kelas</th>
                <th className="py-3.5 px-4">Kontak Orang Tua / Wali</th>
                <th className="py-3.5 px-4">Status Akun</th>
                <th className="py-3.5 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eff4ff]">
              {paginatedStudents.map((student, idx) => {
                const rowNumber = (currentPage - 1) * itemsPerPage + idx + 1;
                const isSelectedPriority = student.nis === '20260512';
                const isNonaktif = student.status === 'nonaktif';

                return (
                  <tr
                    key={student.id}
                    className={`transition-colors ${
                      isNonaktif
                        ? 'bg-[#ffdad6]/20 hover:bg-[#ffdad6]/35'
                        : isSelectedPriority
                        ? 'bg-[#dbe1ff]/20 hover:bg-[#dbe1ff]/35'
                        : 'hover:bg-[#eff4ff]/50'
                    }`}
                  >
                    <td className={`py-3.5 px-4 text-center font-bold ${
                      isNonaktif ? 'text-[#ba1a1a]' : isSelectedPriority ? 'text-[#004ac6]' : 'text-[#737686]'
                    }`}>
                      {rowNumber}
                    </td>

                    {/* NIS & Photo */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          {student.photo ? (
                            <img
                              src={student.photo}
                              alt={student.name}
                              className="w-10 h-10 rounded-full object-cover shadow-xs border border-white"
                            />
                          ) : (
                            <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center text-xs shadow-xs ${
                              student.avatarBgColor || 'bg-[#dbe1ff] text-[#004ac6]'
                            }`}>
                              {student.initials}
                            </div>
                          )}
                          <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                            isNonaktif ? 'bg-[#ba1a1a]' : 'bg-[#006056]'
                          }`}></span>
                        </div>
                        <div className="flex flex-col">
                          <span className={`font-bold font-mono text-[13px] ${
                            isSelectedPriority ? 'text-[#004ac6]' : 'text-[#0b1c30]'
                          }`}>
                            {student.nis}
                          </span>
                          <span className="text-[10px] text-[#737686] font-mono">NISN: {student.nisn}</span>
                        </div>
                      </div>
                    </td>

                    {/* Name & Gender */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0b1c30] text-[13px] flex items-center gap-1.5">
                          {student.name}
                          {student.rank === 4 && (
                            <span className="material-symbols-outlined text-[#712ae2] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                              star
                            </span>
                          )}
                        </span>
                        <span className="text-[11px] text-[#434655] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px] text-[#004ac6]">
                            {student.gender === 'L' ? 'male' : 'female'}
                          </span>
                          {student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                        </span>
                        {student.statusNote && (
                          <span className="text-[10px] text-[#ba1a1a] font-semibold mt-0.5">
                            {student.statusNote}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Class */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isSelectedPriority ? 'bg-[#dbe1ff] text-[#00174b]' : 'bg-[#eff4ff] text-[#434655]'
                      }`}>
                        {student.classRombel}
                      </span>
                    </td>

                    {/* Parents Contact with WhatsApp click */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0b1c30]">{student.parentName}</span>
                        <a
                          href={`https://wa.me/62${student.parentPhone.replace(/[^0-9]/g, '').slice(1)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-[11px] text-[#006056] hover:underline font-semibold mt-0.5"
                          title="Hubungi via WhatsApp"
                        >
                          <span className="material-symbols-outlined text-[13px]">chat</span>
                          <span>{student.parentPhone}</span>
                        </a>
                      </div>
                    </td>

                    {/* Account Status */}
                    <td className="py-3.5 px-4">
                      {isNonaktif ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] font-bold text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                          Nonaktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#71f8e4]/40 text-[#00201c] font-bold text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-[#006056]"></span>
                          Aktif
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedStudent(student)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                            isSelectedPriority
                              ? 'bg-[#004ac6] text-white hover:bg-[#2563eb]'
                              : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
                          }`}
                        >
                          Lihat Detail
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast('info', 'Edit Siswa', `Formulir biodata ${student.name} siap diperbarui.`)}
                          className="p-1.5 rounded-lg text-[#434655] hover:bg-[#eff4ff] transition-colors cursor-pointer"
                          title="Edit Biodata"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openModal('nonaktif-siswa', student)}
                          className="p-1.5 rounded-lg text-[#737686] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors cursor-pointer"
                          title="Kelola Status Akun"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isNonaktif ? 'lock_open' : 'lock_reset'}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination & Table Footer */}
        <div className="p-4 bg-[#eff4ff]/60 border-t border-[#eff4ff] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[#434655]">
            Menampilkan <span className="font-bold text-[#0b1c30]">{(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredStudents.length)}</span> dari <span className="font-bold text-[#0b1c30]">{filteredStudents.length} siswa</span> terdaftar
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="p-2 rounded-xl text-[#737686] bg-white hover:bg-[#eff4ff] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-[#004ac6] text-white shadow-xs'
                    : 'bg-white hover:bg-[#eff4ff] text-[#434655]'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="p-2 rounded-xl text-[#0b1c30] bg-white hover:bg-[#eff4ff] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
