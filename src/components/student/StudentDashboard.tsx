import React from 'react';
import { useClassHub } from '../../context/ClassHubContext';

export const StudentDashboard: React.FC = () => {
  const { 
    currentStudent, 
    studentXp, 
    assignments, 
    handnotes, 
    quizzes, 
    openModal, 
    setStudentTab,
    showToast 
  } = useClassHub();

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6 md:py-8 flex flex-col gap-8 max-w-7xl mx-auto">
      {/* 1. WELCOME BANNER (Kartu Sambutan Personal) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#004ac6] via-[#2563eb] to-[#712ae2] p-6 sm:p-8 text-white shadow-lg">
        {/* Decorative Circles */}
        <div className="absolute -right-16 -top-20 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div className="absolute right-48 -bottom-24 w-72 h-72 rounded-full bg-[#71f8e4]/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Greeting Column */}
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-[#71f8e4] animate-pulse"></span>
                Siswa Aktif
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-white font-mono">
                <span className="material-symbols-outlined text-[15px]">badge</span>
                NIS: {currentStudent.nis} • Kelas V-A
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium text-white">
                <span className="material-symbols-outlined text-[15px]">school</span>
                Wali Kelas: Ibu Nurul Aini, S.Pd.
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Halo, {currentStudent.name}! 👋
            </h1>
            <p className="text-sm sm:text-base text-[#eeefff] leading-relaxed">
              Semangat belajar di hari Senin! Kamu punya <strong className="text-white font-bold">2 tugas</strong> yang mendekati tenggat dan <strong className="text-white font-bold">1 kuis latihan STS</strong> baru yang siap dicoba.
            </p>
          </div>

          {/* Gamification XP Card */}
          <div className="w-full lg:w-auto flex-shrink-0 flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-white/15">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 text-white shrink-0">
              <span className="material-symbols-outlined text-[32px] text-[#71f8e4]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#71f8e4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#71f8e4]"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-extrabold text-white font-mono">{studentXp}</span>
                <span className="text-xs text-[#71f8e4] font-extrabold uppercase">XP Poin</span>
              </div>
              <span className="text-xs font-bold text-white">Bintang Prestasi Minggu Ini</span>
              <span className="text-[11px] text-[#eeefff]">Tingkat 3 • Peringkat #{currentStudent.rank} Kelas</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. GRID 3 KARTU RINGKASAN UTAMA SISWA */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Kartu Presensi Saya */}
        <div className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-[#eff4ff] hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#007b6e]/10 text-[#006056] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">verified_user</span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#0b1c30]">Presensi Saya</h2>
                  <span className="text-xs text-[#434655]">Bulan Februari 2026</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#71f8e4]/30 text-[#005048] text-xs font-bold">
                {currentStudent.attendanceRate}% Hadir
              </span>
            </div>

            {/* Status Hari Ini */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#eff4ff]">
              <div className="w-7 h-7 rounded-full bg-[#006056] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0b1c30]">Tercatat Hadir (07:10 WIB)</span>
                <span className="text-[11px] text-[#434655]">Pintu Utama • Tepat Waktu</span>
              </div>
            </div>

            {/* Mini Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2 rounded-xl bg-[#eff4ff] flex flex-col">
                <span className="text-lg font-bold text-[#0b1c30]">{currentStudent.attendanceDaysCount}</span>
                <span className="text-[11px] text-[#434655]">Hadir</span>
              </div>
              <div className="p-2 rounded-xl bg-[#eff4ff] flex flex-col">
                <span className="text-lg font-bold text-[#712ae2]">1</span>
                <span className="text-[11px] text-[#434655]">Izin</span>
              </div>
              <div className="p-2 rounded-xl bg-[#eff4ff] flex flex-col">
                <span className="text-lg font-bold text-[#737686]">0</span>
                <span className="text-[11px] text-[#434655]">Alpa</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => showToast('info', 'Rekap Presensi', `Total kehadiran semester genap: ${currentStudent.attendanceDaysCount} hari.`)}
            className="mt-4 pt-2 inline-flex items-center justify-between text-xs font-bold text-[#004ac6] hover:text-[#2563eb] transition-colors cursor-pointer"
          >
            <span>Lihat Rekap Presensi</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* Kartu Tagihan & Kas Saya */}
        <div className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-[#eff4ff] hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#712ae2]/10 text-[#712ae2] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#0b1c30]">Tagihan & Kas</h2>
                  <span className="text-xs text-[#434655]">Buku Kas Siswa V-A</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold">
                1 Menunggu
              </span>
            </div>

            {/* Outstanding Amount Card */}
            <div className="p-3 rounded-xl bg-[#ffdad6]/30 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#ba1a1a] font-bold uppercase tracking-wider">Tagihan Tertunda</span>
                <span className="text-lg font-extrabold text-[#0b1c30] font-mono">Rp 15.000</span>
                <span className="text-[11px] text-[#434655]">Iuran Kas Minggu Ke-6 & Ke-7</span>
              </div>
              <button
                type="button"
                onClick={() => openModal('student-pay')}
                className="px-3 py-1.5 rounded-lg bg-[#004ac6] text-white text-xs font-bold hover:bg-[#2563eb] transition-colors cursor-pointer shadow-xs"
              >
                Bayar
              </button>
            </div>

            {/* Lunas Card */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#eff4ff] text-[#0b1c30]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006056] text-[18px]">check_circle</span>
                <span className="text-xs font-medium">Outing Museum Sains</span>
              </div>
              <span className="text-[11px] font-bold text-[#006056]">LUNAS</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => showToast('info', 'Rincian Pembayaran', 'Riwayat iuran kas siswa terbuka.')}
            className="mt-4 pt-2 inline-flex items-center justify-between text-xs font-bold text-[#004ac6] hover:text-[#2563eb] transition-colors cursor-pointer"
          >
            <span>Lihat Rincian Pembayaran</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* Kartu Tugas Belajar */}
        <div className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-[#eff4ff] hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#004ac6]/10 text-[#004ac6] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">assignment</span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#0b1c30]">Tugas Belajar</h2>
                  <span className="text-xs text-[#434655]">Tahun Ajaran 2026 Genap</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#dbe1ff] text-[#00174b] text-xs font-bold">
                2 Aktif
              </span>
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#eff4ff] flex flex-col">
                <div className="flex items-center gap-1 text-[#004ac6]">
                  <span className="material-symbols-outlined text-[18px]">pending_actions</span>
                  <span className="text-lg font-bold">2</span>
                </div>
                <span className="text-[11px] text-[#434655] mt-1">Perlu Dikerjakan</span>
              </div>

              <div className="p-3 rounded-xl bg-[#eff4ff] flex flex-col">
                <div className="flex items-center gap-1 text-[#006056]">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                  <span className="text-lg font-bold">95</span>
                </div>
                <span className="text-[11px] text-[#434655] mt-1">Nilai Tertinggi Baru</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-[#71f8e4]/20 text-[#006056] text-xs font-medium">
              <span className="material-symbols-outlined text-[18px]">celebration</span>
              <span>1 Tugas Matematika selesai dinilai sempurna!</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStudentTab('tugas')}
            className="mt-4 pt-2 inline-flex items-center justify-between text-xs font-bold text-[#004ac6] hover:text-[#2563eb] transition-colors cursor-pointer"
          >
            <span>Buka Semua Tugas</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* 3. BAGIAN TUGAS MENDATANG (Upcoming Assignments) */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2563eb] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">edit_calendar</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0b1c30]">Tugas Mendatang</h2>
              <p className="text-xs text-[#434655]">Selesaikan sebelum batas waktu pengumpulan untuk dapat bonus poin!</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => showToast('info', 'Kalender Tugas', 'Jadwal tenggat pengumpulan tugas minggu ini.')}
            className="text-xs text-[#004ac6] hover:text-[#2563eb] font-bold flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Lihat Kalender Tugas</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* List Tugas Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Tugas 1: IPA (Urgent) */}
          <div className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-[#eff4ff] hover:shadow-md transition-all relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2563eb]"></div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between pt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eff4ff] text-[#004ac6] text-xs font-bold">
                  🔬 IPA
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">alarm</span>
                  Hari ini, 23:59 WIB
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#0b1c30] mt-1">Eksperimen Rangkaian Listrik Seri</h3>
              <p className="text-xs text-[#434655] line-clamp-2">
                Unggah foto hasil rangkaian baterai dan lampu pijar kecil serta catatan tabel uji saklar.
              </p>

              {/* Progress Bar */}
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#434655]">Progres Pengerjaan</span>
                  <span className="text-[#004ac6] font-bold">{assignments[0]?.currentStudentProgress || 60}%</span>
                </div>
                <div className="w-full bg-[#dce9ff] h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#004ac6] h-full rounded-full transition-all duration-300" 
                    style={{ width: `${assignments[0]?.currentStudentProgress || 60}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#eff4ff]">
              <span className="inline-flex items-center gap-1 text-[#434655] text-xs">
                <span className="material-symbols-outlined text-[16px]">person</span>
                Bu Nurul, S.Pd.
              </span>
              <button
                type="button"
                onClick={() => openModal('assignment-detail', assignments[0])}
                className="px-4 py-2 rounded-xl bg-[#004ac6] text-white text-xs font-bold hover:bg-[#2563eb] transition-colors shadow-xs cursor-pointer"
              >
                Lanjutkan
              </button>
            </div>
          </div>

          {/* Tugas 2: Matematika */}
          <div className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-[#eff4ff] hover:shadow-md transition-all relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#712ae2]"></div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between pt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] text-xs font-bold">
                  📐 Matematika
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eff4ff] text-[#434655] text-[10px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">calendar_today</span>
                  Besok, 17 Feb 2026
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#0b1c30] mt-1">Soal Cerita Pecahan & Persen</h3>
              <p className="text-xs text-[#434655] line-clamp-2">
                Kerjakan lembar kerja 10 soal cerita tentang diskon harga buku dan pembagian kue ulang tahun.
              </p>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-xl bg-[#eff4ff]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#737686]"></span>
                <span className="text-xs text-[#0b1c30] font-semibold">Status: Belum Dimulai</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#eff4ff]">
              <span className="inline-flex items-center gap-1 text-[#434655] text-xs">
                <span className="material-symbols-outlined text-[16px]">person</span>
                Pak Hendra, S.Pd.
              </span>
              <button
                type="button"
                onClick={() => openModal('assignment-detail', assignments[1])}
                className="px-4 py-2 rounded-xl bg-[#712ae2] text-white text-xs font-bold hover:bg-[#8a4cfc] transition-colors shadow-xs cursor-pointer"
              >
                Mulai Tugas
              </button>
            </div>
          </div>

          {/* Tugas 3: Bahasa Indonesia (Selesai Dinilai) */}
          <div className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-[#eff4ff] hover:shadow-md transition-all relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#006056]"></div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between pt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#71f8e4]/40 text-[#00201c] text-xs font-bold">
                  📖 B. Indonesia
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#71f8e4]/30 text-[#005048] text-[10px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">verified</span>
                  Sudah Dinilai ⭐
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#0b1c30] mt-1">Menulis Puisi Lingkungan</h3>
              <p className="text-xs text-[#434655] line-clamp-2">
                Tema: Keindahan Alam Desaku. Sudah dikoreksi guru beserta catatan apresiasi pilihan diksi.
              </p>

              {/* Score Display */}
              <div className="flex items-center justify-between mt-2 p-2.5 rounded-xl bg-[#71f8e4]/20">
                <span className="text-xs font-bold text-[#006056]">Nilai Akhir:</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-[#006056]">92</span>
                  <span className="text-xs text-[#006056]">/100</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#eff4ff]">
              <span className="inline-flex items-center gap-1 text-[#434655] text-xs truncate max-w-[150px]">
                <span className="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
                "Diksi sangat indah!"
              </span>
              <button
                type="button"
                onClick={() => showToast('success', 'Ulasan Guru', 'Ibu Nurul: "Pilihan rima pada bait kedua sangat menyentuh dan rapi. Pertahankan prestasimu!"')}
                className="px-3.5 py-2 rounded-xl bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff] transition-colors text-xs font-bold cursor-pointer"
              >
                Lihat Ulasan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BAGIAN HANDNOTE TERBARU */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#007b6e] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0b1c30]">Handnote & Catatan Guru Terbaru</h2>
              <p className="text-xs text-[#434655]">Bahan bacaan ringkas dan modul bergambar yang dibagikan guru kelas.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setStudentTab('handnote')}
            className="text-xs text-[#004ac6] hover:text-[#2563eb] font-bold flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Lihat Semua Handnote</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Grid Handnotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {handnotes.map((hn, idx) => (
            <div key={hn.id} className="flex flex-col justify-between rounded-2xl bg-white p-5 shadow-sm border border-[#eff4ff] hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-2.5">
                <div className="w-full h-32 rounded-xl overflow-hidden relative">
                  <img
                    src={hn.coverImage}
                    alt={hn.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[#004ac6] text-[10px] font-bold shadow-xs">
                    {hn.subjectCode}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[#737686] text-[11px] pt-1">
                  <span className="material-symbols-outlined text-[15px]">
                    {idx === 0 ? 'picture_as_pdf' : idx === 1 ? 'switch' : 'slideshow'}
                  </span>
                  <span>{hn.format}</span>
                  <span>•</span>
                  <span>{hn.teacherName}</span>
                </div>

                <h3 className="text-sm font-bold text-[#0b1c30] leading-snug">
                  {hn.title}
                </h3>
                <p className="text-xs text-[#434655] line-clamp-2">
                  {hn.description}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-4 mt-2 border-t border-[#eff4ff]">
                <button
                  type="button"
                  onClick={() => openModal('handnote', hn)}
                  className={`flex-1 py-2 px-3 rounded-xl text-white text-center text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                    idx === 0
                      ? 'bg-[#004ac6] hover:bg-[#2563eb]'
                      : idx === 1
                      ? 'bg-[#712ae2] hover:bg-[#8a4cfc]'
                      : 'bg-[#007b6e] hover:bg-[#006056]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {idx === 0 ? 'visibility' : idx === 1 ? 'play_circle' : 'slideshow'}
                  </span>
                  <span>{idx === 0 ? 'Baca Catatan' : idx === 1 ? 'Buka Interaktif' : 'Putar Slide'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('success', 'Handnote Tersimpan', `Materi "${hn.title}" tersimpan di perangkat offline.`)}
                  className="p-2 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] transition-colors flex items-center justify-center cursor-pointer"
                  title="Unduh / Simpan"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BAGIAN LATIHAN SOAL & BANK SOAL */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Kolom Kiri: Rekomendasi Latihan (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#712ae2] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">quiz</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0b1c30]">Pusat Latihan & Bank Soal</h2>
              <p className="text-xs text-[#434655]">Latih pemahaman materi untuk persiapan ujian tengah semester.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* Sumatif Harian */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white shadow-sm border border-[#eff4ff] hover:shadow-md transition-shadow gap-4">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#007b6e]/10 text-[#006056] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#71f8e4]/40 text-[#00201c] text-[10px] font-bold">Sumatif Harian</span>
                    <span className="text-[11px] text-[#737686]">15 Menit</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0b1c30] mt-0.5">15 Soal IPA: Bab Ekosistem Sawah</h3>
                  <p className="text-xs text-[#434655]">Pilihan ganda dan teka-teki rantai makanan.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openModal('quiz', quizzes[0])}
                className="px-4 py-2 rounded-xl bg-[#007b6e] text-white text-xs font-bold hover:bg-[#006056] transition-colors flex items-center justify-center gap-1 shrink-0 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                <span>Mulai Latihan</span>
              </button>
            </div>

            {/* STS (Sumatif Tengah Semester) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white shadow-sm border border-[#eff4ff] hover:shadow-md transition-shadow gap-4">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#712ae2]/10 text-[#712ae2] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">timer</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#eaddff] text-[#25005a] text-[10px] font-bold">Simulasi STS Genap</span>
                    <span className="text-[11px] text-[#ba1a1a] font-bold">Tersedia Baru!</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0b1c30] mt-0.5">Matematika: Paket A (25 Soal)</h3>
                  <p className="text-xs text-[#434655]">Simulasi dengan pewaktu otomatis sesuai standar asesmen sekolah.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openModal('quiz', quizzes[1])}
                className="px-4 py-2 rounded-xl bg-[#712ae2] text-white text-xs font-bold hover:bg-[#8a4cfc] transition-colors flex items-center justify-center gap-1 shrink-0 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                <span>Coba Simulasi</span>
              </button>
            </div>

            {/* SAS (Sumatif Akhir Semester) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white shadow-sm border border-[#eff4ff] hover:shadow-md transition-shadow gap-4">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#004ac6]/10 text-[#004ac6] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">folder_special</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#dbe1ff] text-[#00174b] text-[10px] font-bold">Koleksi Arsip</span>
                    <span className="text-[11px] text-[#737686]">Semester 1 & 2</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0b1c30] mt-0.5">Bank Soal Terbuka Semua Mapel</h3>
                  <p className="text-xs text-[#434655]">Akses kumpulan soal latihan mandiri kapan saja.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => showToast('info', 'Koleksi Soal', 'Katalog soal arsip kurikulum terbuka.')}
                className="px-4 py-2 rounded-xl bg-[#eff4ff] text-[#0b1c30] text-xs font-bold hover:bg-[#dce9ff] transition-colors flex items-center justify-center gap-1 shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">folder_open</span>
                <span>Buka Koleksi</span>
              </button>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Hasil Kuis & Latihan Terakhir (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#006056] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">history_edu</span>
              </div>
              <h2 className="text-lg font-bold text-[#0b1c30]">Hasil Latihan Terakhir</h2>
            </div>
            <span className="text-xs text-[#006056] font-bold">2 Kuis Selesai</span>
          </div>

          <div className="flex flex-col gap-3">
            {/* Hasil 1: Siklus Air */}
            <div className="p-4 rounded-2xl bg-white shadow-sm border border-[#eff4ff] flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] text-[#004ac6] font-bold">IPA • Kuis Mingguan</span>
                  <h4 className="text-sm font-bold text-[#0b1c30]">Kuis Siklus Air & Hujan</h4>
                  <span className="text-[11px] text-[#737686]">Dikerjakan: Sabtu, 14 Feb 2026</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-black text-[#006056]">90</span>
                  <span className="text-[11px] text-[#737686] font-medium">18 / 20 Benar</span>
                </div>
              </div>
              <div className="w-full bg-[#dce9ff] h-2 rounded-full overflow-hidden">
                <div className="bg-[#006056] h-full rounded-full" style={{ width: '90%' }}></div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-[#006056] flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Sangat Bagus! (+30 Poin)
                </span>
                <button
                  type="button"
                  onClick={() => showToast('info', 'Pembahasan Kuis', 'Kunci jawaban dan pembahasan kuis Siklus Air dimuat.')}
                  className="text-xs text-[#004ac6] hover:text-[#2563eb] font-bold flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Lihat Pembahasan</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Hasil 2: Bahasa Indonesia */}
            <div className="p-4 rounded-2xl bg-white shadow-sm border border-[#eff4ff] flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] text-[#712ae2] font-bold">B. Indonesia • Kosakata</span>
                  <h4 className="text-sm font-bold text-[#0b1c30]">Kosakata Baku & KBBI</h4>
                  <span className="text-[11px] text-[#737686]">Dikerjakan: Kamis, 12 Feb 2026</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-black text-[#712ae2]">85</span>
                  <span className="text-[11px] text-[#737686] font-medium">17 / 20 Benar</span>
                </div>
              </div>
              <div className="w-full bg-[#dce9ff] h-2 rounded-full overflow-hidden">
                <div className="bg-[#712ae2] h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-[#712ae2] flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Tuntas KKM (+25 Poin)
                </span>
                <button
                  type="button"
                  onClick={() => showToast('info', 'Pembahasan Kuis', 'Kunci jawaban dan pembahasan Kosakata Baku dimuat.')}
                  className="text-xs text-[#004ac6] hover:text-[#2563eb] font-bold flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Lihat Pembahasan</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER/CATATAN SIMULASI */}
      <div className="w-full py-3 px-4 rounded-xl bg-[#eff4ff] flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left border border-[#d3e4fe]/50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#737686] text-[18px]">info</span>
          <span className="text-xs text-[#434655]">
            Data ini merupakan simulasi prototipe akun siswa ClassHub. Tidak terhubung ke basis data publik.
          </span>
        </div>
        <span className="text-xs text-[#737686] font-semibold">Versi Aplikasi: 2.4-SD Edukasi Ceria</span>
      </div>
    </div>
  );
};
