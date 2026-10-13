import React from 'react';
import { useClassHub } from '../../context/ClassHubContext';
import { Student } from '../../types';

interface TeacherStudentDetailProps {
  student?: Student | null;
  onBack: () => void;
}

export const TeacherStudentDetail: React.FC<TeacherStudentDetailProps> = ({ 
  student: propStudent, 
  onBack 
}) => {
  const { students, openModal, showToast } = useClassHub();

  // If none passed, use default student Ahmad Fauzan
  const student = propStudent || students.find(s => s.nis === '20260512') || students[0];

  const handlePrint = () => {
    showToast('info', 'Cetak Biodata', `Mempersiapkan dokumen cetak rapor & biodata untuk ${student.name}.`);
    window.print();
  };

  return (
    <div className="flex flex-col w-full pb-12 space-y-6">
      {/* Top Command & Breadcrumb Navigation Bar */}
      <div className="w-full p-4 bg-white rounded-2xl border border-[#eff4ff] shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Back Action & Breadcrumb Trail */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Kembali ke Daftar Siswa</span>
            </button>
            <div className="h-4 w-px bg-[#d3e4fe] hidden sm:block"></div>
            <nav className="flex items-center gap-1.5 text-xs">
              <span onClick={onBack} className="text-[#737686] hover:text-[#0b1c30] cursor-pointer">Data Siswa</span>
              <span className="material-symbols-outlined text-[14px] text-[#737686]">chevron_right</span>
              <span className="text-[#737686]">Kelas V-A</span>
              <span className="material-symbols-outlined text-[14px] text-[#737686]">chevron_right</span>
              <span className="text-[#004ac6] font-bold">{student.name} (NIS: {student.nis})</span>
            </nav>
          </div>

          {/* Right: Action Buttons Group */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#712ae2]">print</span>
              <span>Cetak Rapor / Biodata</span>
            </button>
            <button
              type="button"
              onClick={() => showToast('info', 'Reset Kata Sandi', `Kata sandi ${student.name} disetel ulang ke PIN default 123456.`)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#737686]">lock_reset</span>
              <span>Reset Kata Sandi</span>
            </button>
            <button
              type="button"
              onClick={() => showToast('info', 'Edit Profil', `Form edit profil untuk ${student.name} dibuka.`)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2563eb] hover:bg-[#004ac6] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
              <span>Edit Profil Siswa</span>
            </button>
          </div>
        </div>
      </div>

      {/* Student Highlight Hero Profile Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-[#eff4ff]">
        {/* Decorative Glows */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#dbe1ff]/40 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 left-1/3 w-72 h-72 rounded-full bg-[#eaddff]/50 blur-3xl pointer-events-none"></div>

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Identity Wrap */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shadow-md border-2 border-white">
                <img
                  src={student.photo || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ-Xo0P-Xs3jX4DzL95TuIzhbSX4GCB6GgxhMGa2V6DBOey6wwOsUHc5ralTiNZLWBmTZbE2-MZX4TcSAiypLL5JbADhvThkx75RxZG_NGk27prP33ssF5XDDJbiZFCP8Ckt_lBZG1DSCiI8VJDhHScVc0y7MgssF8dEC6u0GOTNsxj8s9h7FEB8aCTa2VPpJ-jcfq2KWdHskeCBRmwj3deVUMFldWRf_R_1fZltIbOB0eFqJ0fY5b'}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-[#712ae2] text-white text-[10px] font-bold shadow-sm">
                Kelas 5
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-[#0b1c30] tracking-tight">{student.name}</h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#71f8e4]/40 text-[#00201c] text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006056] animate-pulse"></span>
                  Akun Aktif
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] text-xs font-bold">
                  <span className="material-symbols-outlined text-[14px]">military_tech</span>
                  Rank #{student.rank} Kelas V-A
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#434655]">
                <span className="font-mono">
                  <span className="text-[#737686]">NIS:</span> <strong className="text-[#0b1c30]">{student.nis}</strong>
                </span>
                <span className="text-slate-300">|</span>
                <span className="font-mono">
                  <span className="text-[#737686]">NISN:</span> <strong className="text-[#0b1c30]">{student.nisn}</strong>
                </span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#004ac6]">school</span>
                  {student.classRombel} (Semester Genap 2026/2027)
                </span>
              </div>

              <div className="flex items-center gap-1 text-[#737686] text-xs mt-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span>Terakhir login via Portal Siswa: {student.lastLogin}</span>
              </div>
            </div>
          </div>

          {/* Quick Numerical KPI Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:max-w-md w-full">
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#eff4ff] text-center">
              <span className="text-[11px] text-[#737686]">Kehadiran</span>
              <span className="text-xl font-bold text-[#006056]">{student.attendanceRate}%</span>
              <span className="text-[10px] text-[#434655]">{student.attendanceDaysCount} / {student.totalDays} Hari</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#eff4ff] text-center">
              <span className="text-[11px] text-[#737686]">Rata-rata Nilai</span>
              <span className="text-xl font-bold text-[#004ac6]">{student.avgScore}</span>
              <span className="text-[10px] text-[#434655]">Skala 100</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#eff4ff] text-center">
              <span className="text-[11px] text-[#737686]">Tugas Aktif</span>
              <span className="text-xl font-bold text-[#712ae2]">{student.activeTasksCount}</span>
              <span className="text-[10px] text-[#434655]">Belum Lengkap</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#eff4ff] text-center">
              <span className="text-[11px] text-[#737686]">Saldo Kas</span>
              <span className="text-xl font-bold text-[#0b1c30]">Rp {student.kasPendingAmount / 1000}k</span>
              <span className="text-[10px] text-[#434655]">Tagihan Berjalan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN: Personal, Biodata & Parent Contacts ================= */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* 1. Biodata Lengkap Card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eff4ff]">
            <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#00174b]">
                  <span className="material-symbols-outlined text-[18px]">badge</span>
                </div>
                <h2 className="text-[15px] font-bold text-[#0b1c30]">Biodata Lengkap Siswa</h2>
              </div>
              <span className="text-[11px] font-bold text-[#737686] uppercase tracking-wider">Identitas Resmi</span>
            </div>

            <div className="flex flex-col gap-2.5 mt-4 text-xs divide-y divide-[#eff4ff]">
              <div className="grid grid-cols-3 pt-1">
                <span className="text-[#737686]">Nama Lengkap</span>
                <span className="col-span-2 font-bold text-[#0b1c30]">{student.name}</span>
              </div>
              <div className="grid grid-cols-3 pt-2">
                <span className="text-[#737686]">Nama Panggilan</span>
                <span className="col-span-2 font-semibold text-[#0b1c30]">{student.nickname}</span>
              </div>
              <div className="grid grid-cols-3 pt-2">
                <span className="text-[#737686]">Tempat, Tgl Lahir</span>
                <span className="col-span-2 font-semibold text-[#0b1c30]">
                  {student.dob} <span className="text-[#004ac6] font-bold">({student.age} Tahun)</span>
                </span>
              </div>
              <div className="grid grid-cols-3 pt-2">
                <span className="text-[#737686]">Jenis Kelamin</span>
                <span className="col-span-2 font-semibold text-[#0b1c30]">
                  {student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                </span>
              </div>
              <div className="grid grid-cols-3 pt-2">
                <span className="text-[#737686]">Agama</span>
                <span className="col-span-2 font-semibold text-[#0b1c30]">{student.religion}</span>
              </div>
              <div className="grid grid-cols-3 pt-2">
                <span className="text-[#737686]">Alamat Domisili</span>
                <span className="col-span-2 text-[#0b1c30] leading-relaxed font-medium">
                  {student.address}
                </span>
              </div>
              <div className="grid grid-cols-3 pt-2">
                <span className="text-[#737686]">Riwayat Medis</span>
                <div className="col-span-2 flex flex-col gap-1">
                  <span className="inline-flex items-center gap-1 font-semibold text-[#006056]">
                    <span className="material-symbols-outlined text-[15px]">check_circle</span>
                    {student.medicalNotes}
                  </span>
                  <span className="text-[#434655]">
                    Golongan Darah: <strong className="px-1.5 py-0.5 rounded bg-[#eff4ff] text-[#0b1c30] font-mono">{student.bloodType}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Kontak Orang Tua / Wali Card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eff4ff]">
            <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#eaddff] flex items-center justify-center text-[#25005a]">
                  <span className="material-symbols-outlined text-[18px]">family_restroom</span>
                </div>
                <h2 className="text-[15px] font-bold text-[#0b1c30]">Kontak Orang Tua / Wali</h2>
              </div>
              <span className="text-[11px] text-[#737686]">Daftar Aktif</span>
            </div>

            <div className="flex flex-col gap-3.5 mt-4">
              <div className="p-3.5 rounded-xl bg-[#eff4ff] flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#004ac6]">person</span>
                  <div>
                    <p className="font-bold text-xs text-[#0b1c30]">{student.parentName}</p>
                    <p className="text-[11px] text-[#737686]">{student.parentRole} (Pekerjaan: {student.parentJob})</p>
                  </div>
                </div>
                {student.parentMotherName && (
                  <>
                    <div className="h-px bg-[#d3e4fe]"></div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-[#712ae2]">person_4</span>
                      <div>
                        <p className="font-bold text-xs text-[#0b1c30]">{student.parentMotherName}</p>
                        <p className="text-[11px] text-[#737686]">Ibu Kandung (Pekerjaan: {student.parentMotherJob})</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* WhatsApp Direct Action Callout */}
              <div className="p-3.5 rounded-xl bg-[#71f8e4]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#71f8e4]/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#006056] flex items-center justify-center text-white shrink-0">
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#006056] font-extrabold uppercase tracking-wider block">
                      WhatsApp Wali Utama
                    </span>
                    <p className="text-base font-extrabold text-[#0b1c30] font-mono leading-tight">
                      {student.parentPhone}
                    </p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/62${student.parentPhone.replace(/[^0-9]/g, '').slice(1)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#006056] text-white text-xs font-bold hover:bg-[#007b6e] transition-colors shadow-xs"
                >
                  <span className="material-symbols-outlined text-[15px]">send</span>
                  <span>Kirim WA</span>
                </a>
              </div>

              {/* Extra Contacts */}
              <div className="flex flex-col gap-2 text-xs divide-y divide-[#eff4ff]">
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[#737686] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">mail</span>
                    Email Orang Tua
                  </span>
                  <span className="font-mono text-[#0b1c30] font-semibold">{student.parentEmail}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[#737686] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#ba1a1a]">emergency</span>
                    Kontak Darurat
                  </span>
                  <span className="font-mono text-[#0b1c30] font-bold">{student.emergencyContact}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Motivation & Character Badge Widget */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eff4ff] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#712ae2] text-[18px]">hotel_class</span>
                Bintang Kebaikan & Prestasi
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] text-[10px] font-bold">
                120 XP
              </span>
            </div>
            <p className="text-xs text-[#434655] leading-relaxed">
              Ahmad Fauzan dikenal rajin membantu guru menata ruang kelas dan memiliki konsistensi tinggi dalam mengumpulkan tugas harian.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {student.badges.map((b, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#eff4ff] text-xs text-[#0b1c30] font-semibold">
                  ⭐ {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: Attendance, Finance & Academics ================= */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* 1. Ringkasan Presensi Siswa */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eff4ff] flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#eff4ff]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#71f8e4]/40 flex items-center justify-center text-[#00201c]">
                  <span className="material-symbols-outlined text-[18px]">event_available</span>
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-[#0b1c30]">Ringkasan Presensi Siswa</h2>
                  <p className="text-[11px] text-[#737686]">Total 50 Hari Efektif Belajar (Semester Genap)</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#71f8e4]/40 text-[#00201c] text-xs font-extrabold">
                {student.attendanceRate}% Hadir
              </span>
            </div>

            {/* Attendance Counter Grid */}
            <div className="grid grid-cols-4 gap-2">
              <div className="p-3 rounded-xl bg-[#eff4ff] text-center">
                <span className="text-[11px] text-[#006056] font-bold">Hadir</span>
                <p className="text-2xl font-extrabold text-[#0b1c30]">{student.attendanceDaysCount}</p>
                <span className="text-[10px] text-[#737686]">Hari</span>
              </div>
              <div className="p-3 rounded-xl bg-[#eff4ff] text-center">
                <span className="text-[11px] text-[#712ae2] font-bold">Sakit</span>
                <p className="text-2xl font-extrabold text-[#0b1c30]">1</p>
                <span className="text-[10px] text-[#737686]">14 Feb (Surat Dokter)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#eff4ff] text-center">
                <span className="text-[11px] text-[#004ac6] font-bold">Izin</span>
                <p className="text-2xl font-extrabold text-[#0b1c30]">0</p>
                <span className="text-[10px] text-[#737686]">Hari</span>
              </div>
              <div className="p-3 rounded-xl bg-[#eff4ff] text-center">
                <span className="text-[11px] text-[#ba1a1a] font-bold">Alpa</span>
                <p className="text-2xl font-extrabold text-[#0b1c30]">0</p>
                <span className="text-[10px] text-[#737686]">Hari</span>
              </div>
            </div>

            {/* Log Presensi 5 Hari Terakhir */}
            <div className="space-y-1.5 mt-1">
              <span className="text-xs text-[#737686] font-semibold">Riwayat 5 Hari Sekolah Terakhir:</span>
              <div className="grid grid-cols-5 gap-1.5">
                {student.recentAttendance5Days.map((rec, i) => (
                  <div key={i} className="p-2 rounded-xl bg-[#eff4ff] flex flex-col items-center text-center">
                    <span className="text-[10px] text-[#737686]">{rec.day}</span>
                    <span className="material-symbols-outlined text-[18px] text-[#006056] my-1">
                      {rec.status === 'sakit' ? 'medical_services' : 'check_circle'}
                    </span>
                    <span className="text-[10px] font-mono text-[#434655] font-semibold">{rec.time || '07:05'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Ikhtisar Kas & Keuangan */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eff4ff] flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#eff4ff]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#00174b]">
                  <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-[#0b1c30]">Ikhtisar Kas & Keuangan</h2>
                  <p className="text-[11px] text-[#737686]">Kewajiban Pembayaran Semester Genap 2026/2027</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openModal('catat-bayar')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#004ac6] text-xs font-bold transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                <span>Catat Pembayaran Manual</span>
              </button>
            </div>

            {/* Transaction List for Ahmad Fauzan */}
            <div className="flex flex-col gap-2">
              <div className="p-3.5 rounded-xl bg-[#eff4ff] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#712ae2] shadow-xs">
                    <span className="material-symbols-outlined text-[20px]">savings</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0b1c30]">Kas Kelas Mingguan (Rp 5.000 / mg)</p>
                    <p className="text-[11px] text-[#737686]">Menunggu verifikasi untuk Minggu Ke-6 & Ke-7</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#712ae2] font-mono">Rp 15.000</p>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] text-[10px] font-bold">
                    Tertunda 2 Minggu
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#eff4ff] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#71f8e4]/30 flex items-center justify-center text-[#006056]">
                    <span className="material-symbols-outlined text-[20px]">explore</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0b1c30]">Kunjungan Outing Museum Sains</p>
                    <p className="text-[11px] text-[#737686]">Lunas via Transfer Bank • 16 Feb 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#0b1c30] font-mono">Rp 50.000</p>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#71f8e4]/30 text-[#005048] text-[10px] font-bold">
                    ✓ Lunas
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#eff4ff] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#71f8e4]/30 flex items-center justify-center text-[#006056]">
                    <span className="material-symbols-outlined text-[20px]">checkroom</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0b1c30]">Kaos Olahraga Tambahan (Ukuran L)</p>
                    <p className="text-[11px] text-[#737686]">Lunas Tunai ke Wali Kelas • 10 Jan 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#0b1c30] font-mono">Rp 75.000</p>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#71f8e4]/30 text-[#005048] text-[10px] font-bold">
                    ✓ Lunas
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Progres Tugas & Evaluasi Belajar */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eff4ff] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#eaddff] flex items-center justify-center text-[#25005a]">
                  <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-[#0b1c30]">Progres Tugas & Aktivitas Belajar</h2>
                  <p className="text-[11px] text-[#737686]">Pemantauan Mandiri & Bank Soal Kelas V-A</p>
                </div>
              </div>
              <span className="text-xs text-[#737686]">Semester Genap</span>
            </div>

            <div className="space-y-3">
              {/* Task 1 */}
              <div className="p-3.5 rounded-xl bg-[#eff4ff] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0b1c30]">🔬 IPAS: Eksperimen Rangkaian Listrik Seri</span>
                  <span className="text-xs font-bold text-[#004ac6]">Sedang Dikerjakan (60%)</span>
                </div>
                <div className="w-full bg-[#d3e4fe] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#004ac6] h-full rounded-full w-[60%]"></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#737686]">
                  <span>Tenggat: Sabtu, 22 Feb 2026 (23:59 WIB)</span>
                  <span>Format: Video Demonstrasi Handnote</span>
                </div>
              </div>

              {/* Task 2 */}
              <div className="p-3.5 rounded-xl bg-[#eff4ff] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0b1c30]">📐 Matematika: Soal Cerita Pecahan & Persen</span>
                  <span className="px-2 py-0.5 rounded bg-[#eaddff] text-[#25005a] text-[10px] font-bold">
                    Menunggu Pengumpulan
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#737686]">
                  <span>Tenggat: Senin, 24 Feb 2026</span>
                  <span>Lembar Kerja Siswa (Hal 45-47)</span>
                </div>
              </div>

              {/* Task 3 */}
              <div className="p-3.5 rounded-xl bg-[#eff4ff] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#0b1c30]">📖 B. Indonesia: Menulis Puisi Keindahan Lingkungan</span>
                  <p className="text-[11px] text-[#737686]">Dikumpulkan tepat waktu • 12 Feb 2026</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-[#006056]">92</span>
                  <span className="text-xs text-[#737686]">/100</span>
                  <p className="text-[10px] text-[#006056] font-bold">Dinilai Ibu Nurul</p>
                </div>
              </div>
            </div>

            {/* Bank Soal & Quiz Scores */}
            <div className="space-y-2 pt-2 border-t border-[#eff4ff]">
              <span className="text-xs font-bold text-[#0b1c30]">Hasil Evaluasi Bank Soal & Kuis:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-[#eff4ff] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#0b1c30]">Kuis IPAS: Ekosistem Sawah</span>
                    <p className="text-[10px] text-[#737686]">20 Soal Pilihan Ganda</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-[#004ac6]">90/100</span>
                    <p className="text-[10px] text-[#006056] font-bold">Tuntas KKM</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#eff4ff] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#0b1c30]">Kosa Kata Baku KBBI</span>
                    <p className="text-[10px] text-[#737686]">15 Soal Isian Singkat</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-[#004ac6]">85/100</span>
                    <p className="text-[10px] text-[#006056] font-bold">Tuntas KKM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
