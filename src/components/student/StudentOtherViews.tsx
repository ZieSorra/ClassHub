import React, { useState } from 'react';
import { useClassHub } from '../../context/ClassHubContext';
import { StudentNavTab } from '../../types';

export const StudentOtherViews: React.FC<{ tab: StudentNavTab }> = ({ tab }) => {
  const { currentStudent, assignments, handnotes, quizzes, openModal, showToast, updateStudentNickname } = useClassHub();
  const [nicknameDraft, setNicknameDraft] = useState(currentStudent.nickname);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
                <span
                  className={`material-symbols-outlined text-[24px] my-1 ${
                    d.status === 'hadir' ? 'text-emerald-600' :
                    d.status === 'sakit' ? 'text-amber-600' :
                    d.status === 'izin' ? 'text-blue-600' : 'text-rose-600'
                  }`}
                  aria-label={`Status ${d.status}`}
                >
                  {d.status === 'hadir' ? 'check_circle' : d.status === 'sakit' ? 'medical_services' : d.status === 'izin' ? 'event_busy' : 'cancel'}
                </span>
                <p className="text-xs font-bold text-slate-800">{d.status === 'hadir' ? 'Hadir' : d.status === 'sakit' ? 'Sakit' : d.status === 'izin' ? 'Izin' : 'Alpa'}</p>
                <p className="text-[11px] font-mono text-slate-500">{d.time || '—'}</p>
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

  if (tab === 'profil') {
    const handleNicknameSave = (event: React.FormEvent) => {
      event.preventDefault();
      updateStudentNickname(currentStudent.id, nicknameDraft);
    };

    const handleDemoPasswordChange = (event: React.FormEvent) => {
      event.preventDefault();
      if (newPassword.length < 8) {
        showToast('error', 'Kata Sandi Terlalu Pendek', 'Gunakan minimal 8 karakter untuk simulasi ini.');
        return;
      }
      if (newPassword !== confirmPassword) {
        showToast('error', 'Konfirmasi Tidak Cocok', 'Ulangi kata sandi baru dengan benar.');
        return;
      }
      setNewPassword('');
      setConfirmPassword('');
      showToast('info', 'Simulasi Selesai', 'Formulir tervalidasi. Kata sandi tidak disimpan karena autentikasi masih berupa prototype.');
    };

    return (
      <div className="w-full px-4 sm:px-6 md:px-8 py-6 max-w-5xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eff4ff]">
          <h1 className="text-xl font-extrabold text-[#0b1c30]">Profil Saya</h1>
          <p className="text-xs text-[#434655] mt-1">Data dummy untuk prototype ClassHub. Data resmi ditampilkan sebagai informasi baca-saja.</p>
        </div>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-[#eff4ff]">
          <div className="flex items-center gap-4 mb-6">
            {currentStudent.photo ? (
              <img src={currentStudent.photo} alt="" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl">{currentStudent.initials}</div>
            )}
            <div>
              <h2 className="text-lg font-bold text-[#0b1c30]">{currentStudent.name}</h2>
              <p className="text-sm text-slate-500">{currentStudent.classRombel} · NIS {currentStudent.nis}</p>
              <span className="inline-flex mt-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold">Data simulasi</span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-[#0b1c30] mb-3">Data Resmi (Baca Saja)</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {[
              ['Nama lengkap', currentStudent.name],
              ['NIS', currentStudent.nis],
              ['NISN', currentStudent.nisn],
              ['Rombel', currentStudent.classRombel],
              ['Status', currentStudent.status],
              ['Tahun ajaran', '2026/2027 · Semester Genap']
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <dt className="text-[11px] font-semibold text-slate-500">{label}</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-800">{value}</dd>
              </div>
            ))}
          </dl>

          <form onSubmit={handleNicknameSave} className="border-t border-slate-100 pt-5">
            <h3 className="text-sm font-bold text-[#0b1c30] mb-1">Preferensi Pribadi</h3>
            <p className="text-xs text-slate-500 mb-3">Nama panggilan hanya mengubah data demo pada browser ini.</p>
            <label htmlFor="student-nickname" className="block text-xs font-semibold text-slate-700 mb-1.5">Nama panggilan</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="student-nickname"
                value={nicknameDraft}
                onChange={event => setNicknameDraft(event.target.value)}
                maxLength={40}
                required
                className="min-w-0 flex-1 rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="rounded-xl bg-[#004ac6] px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700">Simpan Preferensi</button>
            </div>
          </form>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-[#eff4ff]">
          <h2 className="text-sm font-bold text-[#0b1c30] mb-1">Simulasi Ganti Kata Sandi</h2>
          <p className="text-xs text-slate-500 mb-4">Formulir ini hanya menguji validasi. Kata sandi tidak disimpan dan belum terhubung ke layanan autentikasi.</p>
          <form onSubmit={handleDemoPasswordChange} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="student-new-password" className="block text-xs font-semibold text-slate-700 mb-1.5">Kata sandi baru (min. 8 karakter)</label>
              <input id="student-new-password" type="password" value={newPassword} onChange={event => setNewPassword(event.target.value)} minLength={8} autoComplete="new-password" required className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="student-confirm-password" className="block text-xs font-semibold text-slate-700 mb-1.5">Ulangi kata sandi</label>
              <input id="student-confirm-password" type="password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} minLength={8} autoComplete="new-password" required className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-800 hover:bg-blue-100">Uji Validasi Kata Sandi</button>
            </div>
          </form>
        </section>
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
