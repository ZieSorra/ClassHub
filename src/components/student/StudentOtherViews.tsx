import React from 'react';
import { useClassHub } from '../../context/ClassHubContext';
import { StudentNavTab } from '../../types';

export const StudentOtherViews: React.FC<{ tab: StudentNavTab }> = ({ tab }) => {
  const { currentStudent, assignments, handnotes, quizzes, openModal, showToast } = useClassHub();

  if (tab === 'presensi') {
    return (
      <div className="w-full px-4 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eff4ff]">
          <h1 className="text-xl font-extrabold text-[#0b1c30]">Rekap Presensi {currentStudent.name}</h1>
          <p className="text-xs text-[#434655] mt-1">Kehadiran semester genap tahun ajaran 2026/2027.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-[#eff4ff] text-center">
            <span className="text-xs text-[#006056] font-bold">Total Kehadiran</span>
            <p className="text-3xl font-extrabold text-[#0b1c30] font-mono mt-1">{currentStudent.attendanceDaysCount}</p>
            <span className="text-[11px] text-slate-500">dari 50 hari efektif</span>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-[#eff4ff] text-center">
            <span className="text-xs text-[#006056] font-bold">Persentase</span>
            <p className="text-3xl font-extrabold text-[#006056] font-mono mt-1">{currentStudent.attendanceRate}%</p>
            <span className="text-[11px] text-[#006056] font-bold">Sangat Baik</span>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-[#eff4ff] text-center">
            <span className="text-xs text-[#712ae2] font-bold">Izin</span>
            <p className="text-3xl font-extrabold text-[#712ae2] font-mono mt-1">1</p>
            <span className="text-[11px] text-slate-500">Izin dokter</span>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-[#eff4ff] text-center">
            <span className="text-xs text-slate-500 font-bold">Alpa</span>
            <p className="text-3xl font-extrabold text-slate-700 font-mono mt-1">0</p>
            <span className="text-[11px] text-slate-500">Disiplin</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eff4ff]">
          <h2 className="text-sm font-bold text-[#0b1c30] mb-3">Catatan 5 Hari Terakhir</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {currentStudent.recentAttendance5Days.map((d, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#eff4ff] text-center">
                <p className="text-[11px] text-slate-500">{d.day}</p>
                <span className="material-symbols-outlined text-[24px] text-[#006056] my-1">check_circle</span>
                <p className="text-xs font-bold text-slate-800 font-mono">{d.time || '07:05 WIB'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (tab === 'pembayaran') {
    return (
      <div className="w-full px-4 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eff4ff] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-[#0b1c30]">Buku Tagihan & Kas {currentStudent.name}</h1>
            <p className="text-xs text-[#434655] mt-1">Catatan iuran kas kelas dan kegiatan pembelajaran.</p>
          </div>
          {currentStudent.kasPendingAmount > 0 && (
            <button
              type="button"
              onClick={() => openModal('student-pay')}
              className="px-5 py-2.5 rounded-xl bg-[#004ac6] text-white text-xs font-bold hover:bg-[#2563eb] shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">payments</span>
              <span>Bayar Tagihan (Rp {currentStudent.kasPendingAmount.toLocaleString('id-ID')})</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white shadow-sm border border-[#eff4ff] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#0b1c30]">Iuran Kas Mingguan Ke-6 & Ke-7</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                currentStudent.kasPendingAmount > 0 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {currentStudent.kasPendingAmount > 0 ? 'Tertunda 2 Minggu' : 'Lunas'}
              </span>
            </div>
            <p className="text-2xl font-extrabold text-blue-700 font-mono">
              Rp {currentStudent.kasPendingAmount.toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-slate-500">Iuran rutin kelas Rp 5.000 per minggu untuk operasional kebersihan & kelas.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white shadow-sm border border-[#eff4ff] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#0b1c30]">Outing Museum Sains Bandung</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#71f8e4]/30 text-[#005048] text-[10px] font-bold">
                LUNAS
              </span>
            </div>
            <p className="text-2xl font-extrabold text-[#006056] font-mono">Rp 50.000</p>
            <p className="text-xs text-slate-500">Lunas via transfer bank tanggal 16 Feb 2026.</p>
          </div>
        </div>
      </div>
    );
  }

  if (tab === 'tugas') {
    return (
      <div className="w-full px-4 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eff4ff]">
          <h1 className="text-xl font-extrabold text-[#0b1c30]">Daftar Tugas Belajar Kamu</h1>
          <p className="text-xs text-[#434655] mt-1">Selesaikan tugas tepat waktu untuk mendapatkan lencana Bintang Kelas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {assignments.map(asg => (
            <div key={asg.id} className="p-5 rounded-2xl bg-white shadow-sm border border-[#eff4ff] flex flex-col justify-between">
              <div className="space-y-3">
                <span className={`inline-block px-2.5 py-0.5 rounded-md font-bold text-xs ${asg.badgeBg} ${asg.badgeTextColor}`}>
                  {asg.subjectCode}
                </span>
                <h3 className="font-bold text-sm text-[#0b1c30]">{asg.title}</h3>
                <p className="text-xs text-[#434655]">{asg.description}</p>
                <p className="text-[11px] font-bold text-rose-600">Tenggat: {asg.deadlineText}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#eff4ff]">
                <button
                  type="button"
                  onClick={() => openModal('assignment-detail', asg)}
                  className="w-full py-2 rounded-xl bg-[#004ac6] text-white text-xs font-bold hover:bg-[#2563eb] transition-colors cursor-pointer"
                >
                  Buka & Kirim Tugas
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
      <div className="w-full px-4 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eff4ff]">
          <h1 className="text-xl font-extrabold text-[#0b1c30]">Handnote & Catatan Bergambar</h1>
          <p className="text-xs text-[#434655] mt-1">Bahan rangkuman menarik dari bapak dan ibu guru.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {handnotes.map(hn => (
            <div key={hn.id} className="p-5 rounded-2xl bg-white shadow-sm border border-[#eff4ff] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-full h-32 rounded-xl overflow-hidden relative">
                  <img src={hn.coverImage} alt={hn.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-sm text-[#0b1c30]">{hn.title}</h3>
                <p className="text-xs text-[#434655] line-clamp-2">{hn.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#eff4ff]">
                <button
                  type="button"
                  onClick={() => openModal('handnote', hn)}
                  className="w-full py-2 rounded-xl bg-[#004ac6] text-white text-xs font-bold hover:bg-[#2563eb] transition-colors cursor-pointer"
                >
                  Baca Materi
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // bank-soal
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eff4ff]">
        <h1 className="text-xl font-extrabold text-[#0b1c30]">Pusat Latihan & Bank Soal Siswa</h1>
        <p className="text-xs text-[#434655] mt-1">Latihan kuis mandiri dengan kunci jawaban interaktif dan bonus XP Poin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {quizzes.map(qz => (
          <div key={qz.id} className="p-6 rounded-2xl bg-white shadow-sm border border-[#eff4ff] flex flex-col justify-between space-y-4">
            <div>
              <span className={`px-2.5 py-0.5 rounded-md font-bold text-xs ${qz.badgeBg} ${qz.badgeTextColor}`}>
                {qz.subjectType}
              </span>
              <h3 className="text-base font-bold text-[#0b1c30] mt-2">{qz.title}</h3>
              <p className="text-xs text-[#434655] mt-1">{qz.description}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 font-medium">
                <span>⏱️ {qz.durationMinutes} Menit</span>
                <span>📝 {qz.totalQuestions} Soal</span>
                {qz.lastScore && <span className="text-[#006056] font-bold">Nilai Terakhir: {qz.lastScore}/100</span>}
              </div>
            </div>

            <button
              type="button"
              onClick={() => openModal('quiz', qz)}
              className="w-full py-2.5 rounded-xl bg-[#007b6e] hover:bg-[#006056] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">play_arrow</span>
              <span>Mulai Kerjakan Kuis Sekarang</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
