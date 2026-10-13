import React, { useState } from 'react';
import { useClassHub } from '../../context/ClassHubContext';

export const StudentLogin: React.FC = () => {
  const { setRoleMode, showToast } = useClassHub();

  const [nis, setNis] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAutofill = () => {
    setNis('20260512');
    setPassword('fauzan123');
    setErrorMessage('');
    showToast('info', 'Data Terisi!', 'Akun demonstrasi atas nama Ahmad Fauzan (Kelas V-A) siap digunakan.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!nis.trim()) {
      setErrorMessage('NIS wajib diisi terlebih dahulu.');
      return;
    }

    if (nis.trim().length < 5) {
      setErrorMessage('NIS tidak valid (minimal 5-8 digit angka).');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Kata sandi wajib diisi.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Mock validation
      if (nis.trim() === '20260512' || nis.trim() === 'siswa' || nis.trim() === '12345') {
        setSuccessMessage('Berhasil Masuk! Mengalihkan ke Ruang Belajar Ceria...');
        showToast('success', 'Selamat Datang, Ahmad!', 'Autentikasi berhasil. Selamat belajar di Kelas V-A!');
        setTimeout(() => {
          setIsLoading(false);
          setRoleMode('siswa');
        }, 800);
      } else {
        setIsLoading(false);
        setErrorMessage('NIS atau kata sandi tidak ditemukan. Gunakan NIS contoh: 20260512');
      }
    }, 700);
  };

  return (
    <div className="bg-[#f4f7fb] min-h-screen flex flex-col justify-between text-slate-800 antialiased">
      {/* Top Simple Bar */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <span className="material-symbols-outlined text-[24px]">school</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-tight">ClassHub</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                Portal Siswa
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Ruang Belajar Ceria Kelas V</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-xs text-slate-600 font-medium border border-slate-200">
            <span className="material-symbols-outlined text-[15px] text-blue-600">event_available</span>
            <span>T.A. 2026/2027</span>
          </div>
          
          {/* Mode Guru Switch Button */}
          <button
            type="button"
            onClick={() => setRoleMode('guru')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-indigo-500">chalkboard</span>
            <span>Login Guru / Wali Kelas</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          {/* Left Hero/Banner Column for Elementary Students */}
          <div className="md:col-span-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-8 sm:p-10 flex flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-teal-400/20 rounded-full blur-xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide mb-6 border border-white/20 text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Kelas V Aktif & Terhubung
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight text-white mb-3">
                Mulai Harimu dengan Semangat Belajar! 🚀
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed font-normal">
                Cek tugas sekolah, materi handnote seru, dan latihan soal harianmu langsung di ClassHub.
              </p>
            </div>

            {/* Student interactive illustration badge */}
            <div className="relative z-10 my-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-sm shadow-md">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                </div>
                <div>
                  <p className="text-xs text-blue-100 font-medium">Tantangan Minggu Ini</p>
                  <p className="text-sm font-bold text-white">Latihan STS Matematika & IPA</p>
                </div>
              </div>
              <div className="w-full bg-black/20 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-300 to-emerald-400 h-1.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-[11px] text-blue-200 text-right">Sudah 21 teman sekelas menyelesaikan</p>
            </div>

            <div className="relative z-10 pt-2 border-t border-white/15 flex items-center justify-between text-xs text-blue-200">
              <span>SD Bintang Bangsa</span>
              <span>Semester Genap</span>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white relative">
            <div className="max-w-md w-full mx-auto">
              {/* Heading */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    Akun Siswa
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Selamat Datang di ClassHub
                </h1>
                <p className="text-sm text-slate-500 mt-1.5">
                  Masuk untuk melihat aktivitas dan pembelajaran kelasmu.
                </p>
              </div>

              {/* Alert / Error / Success Message */}
              {errorMessage && (
                <div className="mb-4 p-3.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-xs flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-rose-600 mt-0.5">error</span>
                  <div>
                    <p className="font-bold">Login Belum Lengkap</p>
                    <p className="mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-emerald-600 mt-0.5">check_circle</span>
                  <div>
                    <p className="font-bold">Berhasil Masuk</p>
                    <p className="mt-0.5">{successMessage}</p>
                  </div>
                </div>
              )}

              {/* Quick Autofill Demo Helper */}
              <div className="mb-5 p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]">key</span>
                  </span>
                  <p className="text-xs text-slate-600">
                    Akun Contoh: <strong className="text-slate-900 font-bold">NIS 20260512</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAutofill}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline px-2.5 py-1 bg-white rounded-lg border border-blue-200 shadow-xs transition-colors cursor-pointer"
                >
                  Gunakan Akun
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* NIS Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nomor Induk Siswa (NIS) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <span className="material-symbols-outlined text-[18px]">badge</span>
                    </div>
                    <input
                      type="text"
                      value={nis}
                      onChange={(e) => setNis(e.target.value)}
                      placeholder="Contoh: 20260512"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kata Sandi <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <span className="material-symbols-outlined text-[18px]">lock</span>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan kata sandi akunmu"
                      className="w-full pl-10 pr-11 py-2.5 sm:py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Helper info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 pb-1">
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-blue-500">help</span>
                    Lupa kata sandi? Hubungi guru kelas.
                  </span>
                  <span className="text-[11px] text-slate-400 italic">
                    *Data simulasi mockup
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-4 focus:ring-blue-200 shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Memeriksa Data Siswa...</span>
                    </>
                  ) : (
                    <>
                      <span>Masuk ke ClassHub</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Security Notice */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
                <span className="material-symbols-outlined text-[16px]">shield</span>
                <span>Portal terlindungi untuk Kelas V. Akses khusus siswa terdaftar.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="w-full py-4 text-center text-xs text-slate-400 border-t border-slate-200/60 bg-white">
        <p>ClassHub © 2026/2027 SD Bintang Bangsa • Dikembangkan untuk pembelajaran ramah anak</p>
      </footer>
    </div>
  );
};
