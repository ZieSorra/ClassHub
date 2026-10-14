import React, { useState } from 'react';
import { useClassHub } from '../../context/ClassHubContext';
import { Transaction } from '../../types';

export const TeacherDashboard: React.FC = () => {
  const { 
    students, 
    attendanceList, 
    transactions, 
    assignments, 
    activityLogs, 
    openModal, 
    setTeacherTab,
    verifyTransaction,
    showToast 
  } = useClassHub();

  const [txFilter, setTxFilter] = useState<'all' | 'kas' | 'outing'>('all');

  // Attendance statistics
  const totalStudents = students.length;
  const hadirCount = attendanceList.filter(a => a.status === 'hadir').length;
  const sakitCount = attendanceList.filter(a => a.status === 'sakit').length;
  const izinCount = attendanceList.filter(a => a.status === 'izin').length;
  const alpaCount = attendanceList.filter(a => a.status === 'alpa').length;
  const participationRate = totalStudents > 0 ? ((hadirCount / totalStudents) * 100).toFixed(1) : '0';

  // Filtered transactions
  const filteredTransactions = transactions.filter(tx => {
    if (txFilter === 'kas') return tx.category.toLowerCase().includes('kas');
    if (txFilter === 'outing') return tx.category.toLowerCase().includes('outing');
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-10 space-y-6">
      {/* 1. Top Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#004ac6] via-[#2563eb] to-[#712ae2] p-6 lg:p-8 text-white shadow-md">
        {/* Decorative Ambient Glow Circles */}
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#71f8e4] opacity-20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-40 -bottom-16 h-56 w-56 rounded-full bg-[#eaddff] opacity-25 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]">school</span> T.A. 2026/2027
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]">auto_stories</span> Semester Genap
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]">today</span> {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Selamat datang di ClassHub, Ibu Nurul! 👋
            </h1>
            <p className="text-[14px] text-[#dbe1ff] leading-relaxed">
              Kelola presensi, evaluasi tugas, dan pantau perkembangan 28 siswa Kelas V-A dengan mudah hari ini.
            </p>
          </div>

          {/* Quick Action Buttons Group */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => openModal('input-presensi')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-[#004ac6] text-[13px] font-bold shadow-sm hover:bg-[#eff4ff] active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
              <span>Catat Presensi</span>
            </button>
            <button
              type="button"
              onClick={() => openModal('catat-bayar')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#007b6e]/40 text-[#71f8e4] backdrop-blur-md text-[13px] font-bold hover:bg-[#007b6e]/60 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">payments</span>
              <span>Catat Kas</span>
            </button>
            <button
              type="button"
              onClick={() => showToast('info', 'Tugas Baru', 'Formulir pembuatan tugas baru dibuka.')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/15 text-white backdrop-blur-md text-[13px] font-bold hover:bg-white/25 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">post_add</span>
              <span>Tugas Baru</span>
            </button>
            <button
              type="button"
              onClick={() => showToast('info', 'Unggah Handnote', 'Pilih modul PDF atau slide materi untuk dibagikan.')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/15 text-white backdrop-blur-md text-[13px] font-bold hover:bg-white/25 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              <span>Unggah Handnote</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. KPI Metrics Grid (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Siswa */}
        <div 
          onClick={() => setTeacherTab('data-siswa')}
          className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between cursor-pointer border border-[#eff4ff]"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[12px] text-[#434655] font-semibold">Total Siswa Terdaftar</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#0b1c30]">{totalStudents}</span>
                <span className="text-[13px] font-medium text-[#434655]">Siswa</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">groups</span>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-[#eff4ff] flex items-center justify-between text-xs text-[#434655]">
            <span>15 Laki-laki • 13 Perempuan</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#0b1c30] font-bold text-[10px]">
              +1 Baru
            </span>
          </div>
        </div>

        {/* Card 2: Presensi Hari Ini */}
        <div 
          onClick={() => openModal('input-presensi')}
          className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between cursor-pointer border border-[#eff4ff]"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[12px] text-[#434655] font-semibold">Presensi Hari Ini</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#0b1c30]">{participationRate}%</span>
                <span className="text-[12px] text-[#006056] font-bold">{hadirCount}/{totalStudents} Hadir</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#71f8e4]/40 text-[#00201c] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">check_circle</span>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-[#eff4ff] flex items-center justify-between text-xs text-[#434655]">
            <span>{sakitCount} Sakit • {izinCount} Izin • {alpaCount} Alpa</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#71f8e4]/30 text-[#005048] font-bold text-[10px]">
              Sangat Baik
            </span>
          </div>
        </div>

        {/* Card 3: Saldo Kas Kelas */}
        <div 
          onClick={() => setTeacherTab('kas-kelas')}
          className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between cursor-pointer border border-[#eff4ff]"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[12px] text-[#434655] font-semibold">Kas Kelas Terkumpul</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-[#0b1c30] font-mono">Rp 1.450.000</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#eaddff] text-[#25005a] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-[#eff4ff] flex items-center justify-between text-xs text-[#434655]">
            <span>Target: Rp 1.680.000</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#0b1c30] font-bold text-[10px]">
              4 Belum Lunas
            </span>
          </div>
        </div>

        {/* Card 4: Tugas Aktif */}
        <div 
          onClick={() => setTeacherTab('daftar-tugas')}
          className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between cursor-pointer border border-[#eff4ff]"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[12px] text-[#434655] font-semibold">Tugas Berjalan</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#0b1c30]">{assignments.length}</span>
                <span className="text-[13px] font-medium text-[#434655]">Tugas Aktif</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#d3e4fe] text-[#004ac6] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-[#eff4ff] flex items-center justify-between text-xs text-[#434655]">
            <span>Rata-rata 82% terkumpul</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] font-bold text-[10px]">
              1 Deadline Hari Ini
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Section Bento Grid (Left 8 Cols, Right 4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Visual Attendance Breakdown Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eff4ff]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4">
              <div>
                <h2 className="text-[17px] font-bold text-[#0b1c30] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#004ac6] text-[22px]">calendar_today</span>
                  Status Presensi Hari Ini (Senin, 16 Feb)
                </h2>
                <p className="text-xs text-[#434655] mt-0.5">
                  Tercatat otomatis pada pukul 07:15 WIB oleh Wali Kelas
                </p>
              </div>
              <button
                type="button"
                onClick={() => openModal('input-presensi')}
                className="inline-flex items-center gap-1 text-[#004ac6] hover:text-[#2563eb] text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Buka Presensi Penuh</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Segmented Attendance Bar */}
            <div className="space-y-1.5 mt-1">
              <div className="w-full h-3.5 bg-[#dce9ff] rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-[#006056] transition-all duration-300" 
                  style={{ width: `${participationRate}%` }} 
                  title={`Hadir: ${hadirCount} Siswa (${participationRate}%)`}
                ></div>
                <div 
                  className="h-full bg-[#712ae2] transition-all duration-300" 
                  style={{ width: `${totalStudents > 0 ? ((sakitCount / totalStudents) * 100) : 0}%` }} 
                  title={`Sakit: ${sakitCount} Siswa`}
                ></div>
                <div 
                  className="h-full bg-[#737686]" 
                  style={{ width: `${totalStudents > 0 ? ((izinCount / totalStudents) * 100) : 0}%` }} 
                  title={`Izin: ${izinCount} Siswa`}
                ></div>
                <div 
                  className="h-full bg-[#ba1a1a]" 
                  style={{ width: `${totalStudents > 0 ? ((alpaCount / totalStudents) * 100) : 0}%` }} 
                  title={`Alpa: ${alpaCount} Siswa`}
                ></div>
              </div>
              <div className="flex items-center justify-between text-xs text-[#434655]">
                <span>Tingkat Partisipasi: <strong className="text-[#0b1c30]">{participationRate}%</strong></span>
                <span>{hadirCount} dari {totalStudents} siswa berada di kelas</span>
              </div>
            </div>

            {/* Status Details Blocks */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#434655]">Hadir</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006056]"></span>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-xl font-bold text-[#0b1c30]">{hadirCount}</span>
                  <span className="text-xs text-[#434655]">Siswa</span>
                </div>
              </div>

              <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#434655]">Sakit</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#712ae2]"></span>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-xl font-bold text-[#0b1c30]">{sakitCount}</span>
                  <span className="text-xs text-[#434655]">Siswa</span>
                </div>
              </div>

              <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#434655]">Izin</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d3e4fe]"></span>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-xl font-bold text-[#0b1c30]">{izinCount}</span>
                  <span className="text-xs text-[#434655]">Siswa</span>
                </div>
              </div>

              <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#434655]">Alpa</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-xl font-bold text-[#0b1c30]">{alpaCount}</span>
                  <span className="text-xs text-[#434655]">Siswa</span>
                </div>
              </div>
            </div>

            {/* Student Absence Note Notification */}
            <div className="mt-4 p-3 rounded-xl bg-[#eff4ff] flex items-center justify-between gap-3 border border-[#d3e4fe]/50">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#eaddff] text-[#25005a] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">medical_services</span>
                </div>
                <div className="truncate text-xs">
                  <span className="font-bold text-[#0b1c30]">Ahmad Rayhan</span>
                  <span className="text-[#434655] ml-1.5">— Sakit demam, surat dokter terlampir oleh Orang Tua.</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openModal('surat-dokter')}
                className="shrink-0 text-xs px-3 py-1 rounded-lg bg-[#d3e4fe] hover:bg-[#b4c5ff] text-[#0b1c30] font-bold transition-colors cursor-pointer"
              >
                Lihat Surat
              </button>
            </div>
          </div>

          {/* Financial & Kas Kelas Activity Table Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eff4ff]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
              <div>
                <h2 className="text-[17px] font-bold text-[#0b1c30] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#712ae2] text-[22px]">receipt_long</span>
                  Aktivitas Keuangan Terakhir
                </h2>
                <p className="text-xs text-[#434655]">
                  Riwayat iuran kas dan pembayaran kegiatan kelas V-A
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-[#eff4ff] self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setTxFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    txFilter === 'all'
                      ? 'bg-white shadow-xs text-[#0b1c30]'
                      : 'text-[#434655] hover:text-[#0b1c30]'
                  }`}
                >
                  Semua
                </button>
                <button
                  type="button"
                  onClick={() => setTxFilter('kas')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    txFilter === 'kas'
                      ? 'bg-white shadow-xs text-[#0b1c30]'
                      : 'text-[#434655] hover:text-[#0b1c30]'
                  }`}
                >
                  Kas Mingguan
                </button>
                <button
                  type="button"
                  onClick={() => setTxFilter('outing')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    txFilter === 'outing'
                      ? 'bg-white shadow-xs text-[#0b1c30]'
                      : 'text-[#434655] hover:text-[#0b1c30]'
                  }`}
                >
                  Outing Class
                </button>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#eff4ff] text-[#434655] font-bold">
                    <th className="py-2.5 px-3 rounded-l-xl">Nama Siswa</th>
                    <th className="py-2.5 px-3">Jenis Pembayaran</th>
                    <th className="py-2.5 px-3">Nominal</th>
                    <th className="py-2.5 px-3">Tanggal & Waktu</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 rounded-r-xl text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eff4ff]">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#eff4ff]/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-[#0b1c30]">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center font-bold text-[11px]">
                            {tx.studentInitials}
                          </div>
                          <span>{tx.studentName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-[#434655]">{tx.category}</td>
                      <td className="py-3 px-3 font-bold text-[#0b1c30] font-mono">
                        Rp {tx.amount.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-3 text-[#434655]">{tx.date}, {tx.time}</td>
                      <td className="py-3 px-3">
                        {tx.status === 'lunas' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#71f8e4]/30 text-[#005048] font-bold text-[11px]">
                            <span className="material-symbols-outlined text-[12px]">done</span> Lunas
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e5eeff] text-[#0b1c30] font-bold text-[11px]">
                            <span className="material-symbols-outlined text-[12px]">pending</span> Menunggu
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        {tx.status === 'lunas' ? (
                          <button
                            type="button"
                            onClick={() => openModal('kwitansi', tx)}
                            className="text-[#004ac6] hover:text-[#2563eb] font-bold text-xs cursor-pointer"
                          >
                            Kuitansi
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openModal('cek-bukti', tx)}
                            className="px-2.5 py-1 rounded-lg bg-[#2563eb] text-white font-bold text-[11px] hover:bg-[#004ac6] transition-colors cursor-pointer"
                          >
                            Verifikasi
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer Link */}
            <div className="mt-4 pt-3 border-t border-[#eff4ff] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <span className="text-[#434655]">
                Menampilkan {filteredTransactions.length} dari {transactions.length} catatan transaksi bulan ini
              </span>
              <button
                type="button"
                onClick={() => setTeacherTab('pembayaran')}
                className="inline-flex items-center gap-1 text-[#004ac6] hover:text-[#2563eb] font-bold transition-colors cursor-pointer"
              >
                <span>Lihat Seluruh Catatan Transaksi</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Assignment Deadlines Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eff4ff]">
            <div className="flex items-center justify-between pb-3">
              <div>
                <h2 className="text-[17px] font-bold text-[#0b1c30]">
                  Tenggat Tugas Mendatang
                </h2>
                <p className="text-xs text-[#434655]">
                  Tugas aktif yang sedang dikerjakan siswa
                </p>
              </div>
              <button
                type="button"
                onClick={() => showToast('info', 'Tambah Tugas', 'Buka formulir pembuatan tugas baru.')}
                className="p-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#dbe1ff] text-[#004ac6] transition-colors cursor-pointer"
                title="Tambah Tugas Baru"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>

            <div className="space-y-3 mt-2">
              {assignments.map((asg) => (
                <div key={asg.id} className="p-3.5 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff]/80 transition-all border border-transparent hover:border-[#d3e4fe]">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${asg.badgeBg} ${asg.badgeTextColor} text-[11px] font-bold`}>
                      {asg.subjectCode}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      asg.isUrgent ? 'bg-[#ffdad6] text-[#93000a]' : 'bg-[#dce9ff] text-[#0b1c30]'
                    }`}>
                      {asg.deadlineText}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-[#0b1c30] mt-2">
                    {asg.title}
                  </h3>
                  <p className="text-[11px] text-[#434655] mt-0.5 line-clamp-1">
                    {asg.description}
                  </p>

                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#0b1c30] font-semibold">
                        {asg.totalSubmissions} / {asg.totalStudents} Siswa Mengumpulkan
                      </span>
                      <span className="text-[#004ac6] font-bold">{asg.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#dce9ff] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#004ac6] to-[#006056] rounded-full" 
                        style={{ width: `${asg.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => setTeacherTab('daftar-tugas')}
                className="w-full py-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Kelola Seluruh Daftar Tugas</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Live Class Activity Feed Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eff4ff] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3">
                <h2 className="text-[17px] font-bold text-[#0b1c30] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006056] text-[22px]">notifications_active</span>
                  Aktivitas Terkini
                </h2>
                <span className="flex h-2 w-2 rounded-full bg-[#006056] animate-pulse"></span>
              </div>

              <div className="relative pl-6 space-y-4 mt-2 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#dce9ff]">
                {activityLogs.map((log) => (
                  <div key={log.id} className="relative">
                    <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full ${log.iconBg} ${log.iconColor} flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-[12px]">{log.icon}</span>
                    </div>
                    <div>
                      <p className="text-xs text-[#0b1c30] leading-snug">
                        <strong>{log.actor}</strong> {log.actionText}{' '}
                        {log.highlightText && <span className="font-semibold text-[#004ac6]">{log.highlightText}</span>}{' '}
                        {log.suffixText}
                      </p>
                      <span className="text-[11px] text-[#737686]">{log.timeAgo}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#eff4ff]">
              <button
                type="button"
                onClick={() => showToast('info', 'Log Aktivitas', 'Riwayat lengkap sinkronisasi 24 jam dibuka.')}
                className="w-full py-2 text-center text-xs font-semibold text-[#434655] hover:text-[#004ac6] transition-colors cursor-pointer"
              >
                Lihat Semua Riwayat Aktivitas Log (24 Jam)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
