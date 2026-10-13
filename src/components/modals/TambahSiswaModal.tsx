import React, { useState } from 'react';
import { useClassHub } from '../../context/ClassHubContext';
import { Student } from '../../types';

export const TambahSiswaModal: React.FC = () => {
  const { students, closeModal, showToast } = useClassHub();

  const [nis, setNis] = useState('20260529');
  const [nisn, setNisn] = useState('0134981150');
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'L' | 'P'>('L');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const initials = name
      .split(' ')
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const newStudent: Student = {
      id: 'std-' + Date.now(),
      nis: nis.trim(),
      nisn: nisn.trim(),
      name: name.trim(),
      nickname: name.split(' ')[0],
      gender,
      initials,
      classRombel: 'Kelas V-A',
      parentName: parentName.trim() || 'Orang Tua Siswa',
      parentRole: 'Wali',
      parentJob: 'Wiraswasta',
      parentPhone: phone.trim() || '0812-0000-0000',
      parentEmail: `${name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      emergencyContact: phone.trim(),
      address: 'Bandung, Jawa Barat',
      dob: 'Bandung, 10 Oktober 2015',
      age: 11,
      religion: 'Islam',
      medicalNotes: 'Sehat prima',
      bloodType: 'O',
      status: 'aktif',
      rank: students.length + 1,
      attendanceRate: 100,
      attendanceDaysCount: 50,
      totalDays: 50,
      avgScore: 80.0,
      activeTasksCount: 1,
      kasPendingAmount: 0,
      badges: ['Siswa Baru'],
      lastLogin: 'Belum pernah login',
      recentAttendance5Days: [
        { day: 'Sen, 17 Feb', date: '17 Feb 2026', status: 'hadir', time: '07:05' },
        { day: 'Sel, 18 Feb', date: '18 Feb 2026', status: 'hadir', time: '07:08' },
        { day: 'Rab, 19 Feb', date: '19 Feb 2026', status: 'hadir', time: '07:04' },
        { day: 'Kam, 20 Feb', date: '20 Feb 2026', status: 'hadir', time: '07:06' },
        { day: 'Jum, 21 Feb', date: '21 Feb 2026', status: 'hadir', time: '07:03' },
      ]
    };

    students.push(newStudent);
    showToast('success', 'Siswa Berhasil Ditambahkan', `${newStudent.name} (NIS: ${newStudent.nis}) terdaftar di Kelas V-A.`);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#eff4ff] border-b border-[#d3e4fe] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#004ac6] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[22px]">person_add</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0b1c30]">Tambah Siswa Baru</h2>
              <p className="text-xs text-[#434655]">Rombongan Belajar Kelas V-A • T.A. 2026/2027</p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:bg-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-[#0b1c30] uppercase tracking-wider block">
                NIS (Nomor Induk Siswa) *
              </label>
              <input
                type="text"
                value={nis}
                onChange={(e) => setNis(e.target.value)}
                placeholder="Contoh: 20260529"
                required
                className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] text-slate-800 font-semibold border border-[#d3e4fe] focus:bg-white focus:ring-2 focus:ring-[#004ac6] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#0b1c30] uppercase tracking-wider block">
                NISN Nasional *
              </label>
              <input
                type="text"
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
                placeholder="10 Digit NISN"
                required
                className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] text-slate-800 font-semibold border border-[#d3e4fe] focus:bg-white focus:ring-2 focus:ring-[#004ac6] focus:outline-none"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="font-bold text-[#0b1c30] uppercase tracking-wider block">
                Nama Lengkap Siswa *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama sesuai akta kelahiran"
                required
                className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] text-slate-800 font-semibold border border-[#d3e4fe] focus:bg-white focus:ring-2 focus:ring-[#004ac6] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#0b1c30] uppercase tracking-wider block">
                Jenis Kelamin *
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'L' | 'P')}
                className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] text-slate-800 font-semibold border border-[#d3e4fe] focus:outline-none focus:ring-2 focus:ring-[#004ac6] cursor-pointer"
              >
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#0b1c30] uppercase tracking-wider block">
                Nama Orang Tua / Wali *
              </label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Nama ayah / ibu / wali"
                required
                className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] text-slate-800 font-semibold border border-[#d3e4fe] focus:bg-white focus:ring-2 focus:ring-[#004ac6] focus:outline-none"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="font-bold text-[#0b1c30] uppercase tracking-wider block">
                Nomor WhatsApp Wali (Untuk Pemberitahuan Presensi) *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
                required
                className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] text-slate-800 font-semibold border border-[#d3e4fe] focus:bg-white focus:ring-2 focus:ring-[#004ac6] focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#71f8e4]/25 text-[#00201c] flex items-center gap-2 border border-[#71f8e4]/60">
            <span className="material-symbols-outlined text-[18px] text-[#006056] shrink-0">info</span>
            <span>PIN akun awal siswa akan otomatis disetel default: <strong>123456</strong> dan wajib diubah saat login pertama.</span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold transition-colors cursor-pointer"
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-white bg-[#004ac6] hover:bg-[#2563eb] font-bold shadow-md transition-all cursor-pointer"
            >
              Simpan Data Siswa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
