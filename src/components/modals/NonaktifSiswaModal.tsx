import React from 'react';
import { useClassHub } from '../../context/ClassHubContext';
import { Student } from '../../types';

export const NonaktifSiswaModal: React.FC = () => {
  const { modalPayload, students, closeModal, showToast } = useClassHub();
  const student: Student = modalPayload || students.find(s => s.nis === '20260507') || students[7];

  const handleToggle = () => {
    const isCurrentlyActive = student.status === 'aktif';
    student.status = isCurrentlyActive ? 'nonaktif' : 'aktif';
    if (!isCurrentlyActive) {
      student.statusNote = undefined;
    } else {
      student.statusNote = 'Dispensasi Wali Kelas';
    }

    showToast(
      isCurrentlyActive ? 'info' : 'success',
      isCurrentlyActive ? 'Akun Dinonaktifkan' : 'Akun Diaktifkan Kembali',
      `Status akun ${student.name} sekarang ${student.status.toUpperCase()}.`
    );
    closeModal();
  };

  const isCurrentlyActive = student.status === 'aktif';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isCurrentlyActive ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#71f8e4]/30 text-[#006056]'
            }`}>
              <span className="material-symbols-outlined text-[28px]">
                {isCurrentlyActive ? 'lock_person' : 'lock_open'}
              </span>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="p-1 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900">
              {isCurrentlyActive ? 'Konfirmasi Nonaktifkan Akun Siswa' : 'Aktifkan Kembali Akun Siswa'}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isCurrentlyActive 
                ? 'Tindakan ini akan mencabut akses login aplikasi portal untuk peserta didik yang dipilih sementara waktu.'
                : 'Tindakan ini akan mengaktifkan kembali akses login aplikasi portal untuk peserta didik.'}
            </p>
          </div>

          {/* Student Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center text-xs shrink-0 ${
              isCurrentlyActive ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#71f8e4]/40 text-[#006056]'
            }`}>
              {student.initials}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900">{student.name} (NIS {student.nis})</span>
              <span className="text-[11px] text-slate-500">
                Kelas V-A • Status Terakhir: {student.status.toUpperCase()} {student.statusNote ? `(${student.statusNote})` : ''}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 text-slate-700 text-xs space-y-1.5 border border-slate-100">
            <span className="font-bold text-slate-900 flex items-center gap-1 text-[11px]">
              <span className="material-symbols-outlined text-[15px] text-amber-600">info</span>
              Ketentuan hak akses:
            </span>
            <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-1 pl-1">
              <li>Siswa tidak dapat mengakses modul tugas daring dan bank soal saat akun berstatus nonaktif.</li>
              <li>Rekap presensi akan otomatis berstatus dispensasi khusus.</li>
              <li>Akun dapat dipulihkan kapan saja oleh Wali Kelas.</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleToggle}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-md cursor-pointer ${
              isCurrentlyActive
                ? 'bg-[#ba1a1a] hover:bg-[#93000a]'
                : 'bg-[#006056] hover:bg-[#007b6e]'
            }`}
          >
            {isCurrentlyActive ? 'Ya, Nonaktifkan Akun' : 'Ya, Aktifkan Akun Siswa'}
          </button>
        </div>
      </div>
    </div>
  );
};
