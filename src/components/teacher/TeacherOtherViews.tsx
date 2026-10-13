import React from 'react';
import { useClassHub } from '../../context/ClassHubContext';
import { TeacherNavTab } from '../../types';

export const TeacherOtherViews: React.FC<{ tab: TeacherNavTab }> = ({ tab }) => {
  const { 
    students, 
    attendanceList, 
    updateStudentAttendance,
    feeCategories, 
    transactions, 
    assignments, 
    handnotes, 
    quizzes, 
    openModal, 
    showToast,
    resetToDefaults 
  } = useClassHub();

  if (tab === 'presensi') {
    return (
      <div className="flex flex-col w-full pb-12 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eff4ff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0b1c30]">Rekap & Manajemen Presensi</h1>
            <p className="text-xs text-[#434655]">Pencatatan resmi kehadiran harian siswa Rombel Kelas V-A.</p>
          </div>
          <button
            type="button"
            onClick={() => openModal('input-presensi')}
            className="px-4 py-2.5 rounded-xl bg-[#004ac6] text-white text-xs font-bold hover:bg-[#2563eb] shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
            <span>Buka Lembar Presensi Lengkap</span>
          </button>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#eff4ff] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#eff4ff] text-[#434655] font-bold uppercase text-[11px]">
                  <th className="py-3.5 px-4 w-12 text-center">No.</th>
                  <th className="py-3.5 px-4">Nama Siswa & NIS</th>
                  <th className="py-3.5 px-4">Status Hari Ini</th>
                  <th className="py-3.5 px-4">Waktu Check-in</th>
                  <th className="py-3.5 px-4">Persentase Kehadiran</th>
                  <th className="py-3.5 px-4 text-right">Ubah Cepat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eff4ff]">
                {students.map((student, idx) => {
                  const entry = attendanceList.find(a => a.studentId === student.id);
                  const status = entry?.status || 'hadir';

                  return (
                    <tr key={student.id} className="hover:bg-[#eff4ff]/50 transition-colors">
                      <td className="py-3 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center font-bold text-xs shrink-0">
                            {student.initials}
                          </div>
                          <div>
                            <span className="font-bold text-[#0b1c30]">{student.name}</span>
                            <span className="text-[10px] text-slate-500 block font-mono">NIS: {student.nis}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                          status === 'hadir'
                            ? 'bg-[#71f8e4]/30 text-[#005048]'
                            : status === 'sakit'
                            ? 'bg-[#eaddff] text-[#25005a]'
                            : status === 'izin'
                            ? 'bg-slate-200 text-slate-800'
                            : 'bg-[#ffdad6] text-[#93000a]'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">
                        {entry?.time || '07:15 WIB'}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#006056]">
                        {student.attendanceRate}%
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => updateStudentAttendance(student.id, 'hadir')}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                              status === 'hadir' ? 'bg-[#006056] text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            H
                          </button>
                          <button
                            type="button"
                            onClick={() => updateStudentAttendance(student.id, 'sakit')}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                              status === 'sakit' ? 'bg-[#712ae2] text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            S
                          </button>
                          <button
                            type="button"
                            onClick={() => updateStudentAttendance(student.id, 'izin')}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                              status === 'izin' ? 'bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            I
                          </button>
                          <button
                            type="button"
                            onClick={() => updateStudentAttendance(student.id, 'alpa')}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                              status === 'alpa' ? 'bg-[#ba1a1a] text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            A
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (tab === 'kas-kelas' || tab === 'pembayaran') {
    return (
      <div className="flex flex-col w-full pb-12 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eff4ff] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0b1c30]">Ikhtisar Keuangan & Kas Kelas V-A</h1>
            <p className="text-xs text-[#434655]">Kelola pos iuran kas mingguan, outing class, dan pembayaran seragam.</p>
          </div>
          <button
            type="button"
            onClick={() => openModal('catat-bayar')}
            className="px-4 py-2.5 rounded-xl bg-[#004ac6] text-white text-xs font-bold hover:bg-[#2563eb] shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">post_add</span>
            <span>Catat Pembayaran Baru</span>
          </button>
        </div>

        {/* 3 Fee Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {feeCategories.map(cat => (
            <div key={cat.id} className="p-5 rounded-2xl bg-white shadow-sm border border-[#eff4ff] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#0b1c30]">{cat.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Rp {cat.nominalPerStudent.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-xl font-extrabold text-[#006056] font-mono">
                    Rp {cat.collectedTotal.toLocaleString('id-ID')}
                  </span>
                  <p className="text-[11px] text-[#737686] mt-0.5">
                    Target: Rp {cat.targetTotal.toLocaleString('id-ID')} ({cat.completionRate}% Lunas)
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#434655]">
                <span>{cat.fullyPaidStudents} Siswa Lunas</span>
                <span className="text-rose-600 font-bold">{cat.unpaidStudents} Belum Lunas</span>
              </div>
            </div>
          ))}
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eff4ff]">
          <h2 className="text-base font-bold text-[#0b1c30] mb-4">Riwayat Semua Transaksi</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#eff4ff] text-[#434655] font-bold uppercase text-[11px]">
                  <th className="py-2.5 px-3 rounded-l-xl">No. Kwitansi</th>
                  <th className="py-2.5 px-3">Nama Siswa</th>
                  <th className="py-2.5 px-3">Pos Kategori</th>
                  <th className="py-2.5 px-3">Nominal</th>
                  <th className="py-2.5 px-3">Tanggal</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 rounded-r-xl text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eff4ff]">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-[#eff4ff]/50">
                    <td className="py-3 px-3 font-mono font-bold text-[#004ac6]">{tx.receiptNumber}</td>
                    <td className="py-3 px-3 font-semibold text-[#0b1c30]">{tx.studentName}</td>
                    <td className="py-3 px-3 text-[#434655]">{tx.category}</td>
                    <td className="py-3 px-3 font-bold font-mono text-[#0b1c30]">
                      Rp {tx.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-3 text-[#434655]">{tx.date}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        tx.status === 'lunas' ? 'bg-[#71f8e4]/30 text-[#005048]' : 'bg-[#e5eeff] text-[#0b1c30]'
                      }`}>
                        {tx.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {tx.status === 'lunas' ? (
                        <button
                          type="button"
                          onClick={() => openModal('kwitansi', tx)}
                          className="text-[#004ac6] hover:underline font-bold text-xs cursor-pointer"
                        >
                          Cetak Kwitansi
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openModal('cek-bukti', tx)}
                          className="px-2.5 py-1 rounded-lg bg-[#2563eb] text-white font-bold text-[11px] hover:bg-[#004ac6] cursor-pointer"
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
        </div>
      </div>
    );
  }

  if (tab === 'daftar-tugas') {
    return (
      <div className="flex flex-col w-full pb-12 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eff4ff] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0b1c30]">Daftar Tugas & Penugasan Kelas V-A</h1>
            <p className="text-xs text-[#434655]">Kelola tenggat waktu, pengumpulan berkas, dan penilaian hasil tugas siswa.</p>
          </div>
          <button
            type="button"
            onClick={() => showToast('info', 'Tugas Baru', 'Formulir pembuatan tugas baru dibuka.')}
            className="px-4 py-2.5 rounded-xl bg-[#004ac6] text-white text-xs font-bold hover:bg-[#2563eb] shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">add_task</span>
            <span>Buat Tugas Baru</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {assignments.map(asg => (
            <div key={asg.id} className="p-6 rounded-2xl bg-white shadow-sm border border-[#eff4ff] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-md font-bold text-xs ${asg.badgeBg} ${asg.badgeTextColor}`}>
                    {asg.subjectCode}
                  </span>
                  <span className="text-[11px] text-rose-600 font-bold">{asg.deadlineText}</span>
                </div>
                <h3 className="font-bold text-sm text-[#0b1c30]">{asg.title}</h3>
                <p className="text-xs text-[#434655] leading-relaxed">{asg.description}</p>
                <div className="pt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-semibold">{asg.totalSubmissions} / {asg.totalStudents} Siswa Kumpul</span>
                    <span className="text-blue-600 font-bold">{asg.progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-[#dce9ff] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#004ac6] h-full rounded-full" style={{ width: `${asg.progressPercentage}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-[#eff4ff] flex items-center justify-between">
                <span className="text-xs text-slate-500">{asg.teacherName}</span>
                <button
                  type="button"
                  onClick={() => openModal('assignment-detail', asg)}
                  className="text-xs text-[#004ac6] hover:underline font-bold cursor-pointer"
                >
                  Detail & Nilai →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tab === 'handnote') {
    return (
      <div className="flex flex-col w-full pb-12 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eff4ff] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0b1c30]">Perpustakaan Handnote & Modul Ajar</h1>
            <p className="text-xs text-[#434655]">Koleksi catatan digital ramah anak dan infografis visual pembelajaran.</p>
          </div>
          <button
            type="button"
            onClick={() => showToast('info', 'Unggah Handnote', 'Pilih modul PDF atau file infografis.')}
            className="px-4 py-2.5 rounded-xl bg-[#004ac6] text-white text-xs font-bold hover:bg-[#2563eb] shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">upload_file</span>
            <span>Unggah Modul Baru</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {handnotes.map(hn => (
            <div key={hn.id} className="p-5 rounded-2xl bg-white shadow-sm border border-[#eff4ff] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-full h-36 rounded-xl overflow-hidden relative shadow-xs">
                  <img src={hn.coverImage} alt={hn.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-white/95 text-blue-700 text-[10px] font-bold">
                    {hn.subjectCode}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <span>{hn.format}</span>
                  <span>•</span>
                  <span>{hn.teacherName}</span>
                </div>
                <h3 className="font-bold text-sm text-[#0b1c30]">{hn.title}</h3>
                <p className="text-xs text-[#434655] line-clamp-2">{hn.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#eff4ff] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => openModal('handnote', hn)}
                  className="px-4 py-2 rounded-xl bg-[#004ac6] text-white text-xs font-bold hover:bg-[#2563eb] transition-colors cursor-pointer"
                >
                  Buka Modul Baca
                </button>
                <span className="text-xs text-slate-500">{hn.viewCount} Siswa Melihat</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tab === 'bank-soal') {
    return (
      <div className="flex flex-col w-full pb-12 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eff4ff] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0b1c30]">Bank Soal & Asesmen Kurikulum</h1>
            <p className="text-xs text-[#434655]">Paket latihan Sumatif Harian, STS (Tengah Semester), dan SAS (Akhir Semester).</p>
          </div>
          <button
            type="button"
            onClick={() => showToast('info', 'Buat Bank Soal', 'Penyusun kuis asesmen baru dibuka.')}
            className="px-4 py-2.5 rounded-xl bg-[#712ae2] text-white text-xs font-bold hover:bg-[#8a4cfc] shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Buat Paket Soal Baru</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {quizzes.map(qz => (
            <div key={qz.id} className="p-6 rounded-2xl bg-white shadow-sm border border-[#eff4ff] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-md font-bold text-xs ${qz.badgeBg} ${qz.badgeTextColor}`}>
                    {qz.subjectType}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{qz.durationMinutes} Menit • {qz.totalQuestions} Soal</span>
                </div>
                <h3 className="font-bold text-base text-[#0b1c30] mt-2">{qz.title}</h3>
                <p className="text-xs text-[#434655] mt-1">{qz.description}</p>
              </div>

              <div className="pt-4 border-t border-[#eff4ff] flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-bold">Rata-rata Kelas: 88 / 100</span>
                <button
                  type="button"
                  onClick={() => openModal('quiz', qz)}
                  className="px-4 py-2 rounded-xl bg-[#006056] text-white text-xs font-bold hover:bg-[#007b6e] transition-colors cursor-pointer"
                >
                  Uji Coba Kuis Siswa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Pengaturan tab
  return (
    <div className="flex flex-col w-full pb-12 space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eff4ff]">
        <h1 className="text-2xl font-extrabold text-[#0b1c30]">Pengaturan Kelas & Sistem ClassHub</h1>
        <p className="text-xs text-[#434655] mt-1">Konfigurasi Rombel, Tahun Ajaran, dan Pengaturan Data Demonstrasi.</p>
      </div>

      <div className="p-6 rounded-2xl bg-white shadow-sm border border-[#eff4ff] space-y-4 text-xs">
        <h2 className="text-sm font-bold text-[#0b1c30]">Pengaturan Demonstrasi & Data Mockup</h2>
        <p className="text-slate-600">
          Data prototipe tersimpan secara reaktif di penyimpanan lokal peramban (localStorage). Jika kamu ingin mengembalikan data siswa, presensi, dan kas ke kondisi semula, klik tombol di bawah ini:
        </p>
        <button
          type="button"
          onClick={resetToDefaults}
          className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          <span>Reset Semua Data ke Awal Demonstrasi</span>
        </button>
      </div>
    </div>
  );
};
