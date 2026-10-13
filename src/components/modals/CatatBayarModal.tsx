import React, { useState } from 'react';
import { useClassHub } from '../../context/ClassHubContext';

export const CatatBayarModal: React.FC = () => {
  const { students, addTransaction, closeModal, openModal } = useClassHub();

  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [category, setCategory] = useState('Kas Mingguan Ke-6');
  const [amount, setAmount] = useState('10000');
  const [method, setMethod] = useState('Tunai di Kelas');
  const [notes, setNotes] = useState('');

  const quickAmounts = [5000, 10000, 25000, 50000, 75000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find(s => s.id === selectedStudentId);
    if (!student) return;

    const numAmount = parseInt(amount, 10) || 0;
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    addTransaction({
      studentId: student.id,
      studentName: student.name,
      studentInitials: student.initials,
      category,
      amount: numAmount,
      date: dateStr,
      time: timeStr,
      status: 'lunas',
      verifiedBy: 'Ibu Nurul Aini, S.Pd.',
      paymentMethod: method,
      evidenceNote: notes || 'Pembayaran tunai diterima langsung oleh Wali Kelas.'
    });

    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#eff4ff] border-b border-[#d3e4fe] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#004ac6] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[22px]">payments</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0b1c30]">Catat Pembayaran & Iuran</h2>
              <p className="text-xs text-[#434655]">Buku Kas Kelas V-A • T.A. 2026/2027</p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-1.5 rounded-xl text-[#737686] hover:bg-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Pilih Siswa */}
          <div>
            <label className="block text-xs font-bold text-[#0b1c30] mb-1.5 uppercase tracking-wider">
              Pilih Nama Siswa *
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#eff4ff] text-xs font-semibold text-[#0b1c30] border border-[#d3e4fe] focus:outline-none focus:ring-2 focus:ring-[#004ac6] cursor-pointer"
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.nis}) — Kelas V-A
                </option>
              ))}
            </select>
          </div>

          {/* Kategori Pembayaran */}
          <div>
            <label className="block text-xs font-bold text-[#0b1c30] mb-1.5 uppercase tracking-wider">
              Kategori Tagihan *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#eff4ff] text-xs font-semibold text-[#0b1c30] border border-[#d3e4fe] focus:outline-none focus:ring-2 focus:ring-[#004ac6] cursor-pointer"
            >
              <option value="Kas Mingguan Ke-6">Kas Mingguan Ke-6 (Rp 5.000 / mg)</option>
              <option value="Kas Mingguan Ke-7">Kas Mingguan Ke-7 (Rp 5.000 / mg)</option>
              <option value="Outing Class Museum Sains">Outing Class Museum Sains (Rp 50.000)</option>
              <option value="Buku Modul Literasi">Buku Modul Literasi (Rp 25.000)</option>
              <option value="Seragam Olahraga Tambahan">Seragam Olahraga Tambahan (Rp 75.000)</option>
              <option value="Iuran Kegiatan Ramadhan">Iuran Kegiatan Ramadhan</option>
            </select>
          </div>

          {/* Nominal */}
          <div>
            <label className="block text-xs font-bold text-[#0b1c30] mb-1.5 uppercase tracking-wider">
              Nominal Diterima (Rp) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-xs text-[#737686]">
                Rp
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-[#eff4ff] text-sm font-bold text-[#0b1c30] border border-[#d3e4fe] focus:outline-none focus:ring-2 focus:ring-[#004ac6] font-mono"
              />
            </div>

            {/* Quick chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {quickAmounts.map(amt => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(String(amt))}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#dbe1ff] text-[11px] font-semibold text-slate-700 cursor-pointer transition-colors"
                >
                  +{amt.toLocaleString('id-ID')}
                </button>
              ))}
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div>
            <label className="block text-xs font-bold text-[#0b1c30] mb-1.5 uppercase tracking-wider">
              Metode Pembayaran
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#eff4ff] text-xs font-semibold text-[#0b1c30] border border-[#d3e4fe] focus:outline-none focus:ring-2 focus:ring-[#004ac6] cursor-pointer"
            >
              <option value="Tunai di Kelas">Tunai Langsung di Kelas</option>
              <option value="Transfer Bank (BCA)">Transfer Bank (BCA)</option>
              <option value="Transfer Bank (Mandiri)">Transfer Bank (Mandiri)</option>
              <option value="QRIS Sekolah">QRIS Sekolah</option>
            </select>
          </div>

          {/* Catatan */}
          <div>
            <label className="block text-xs font-bold text-[#0b1c30] mb-1.5 uppercase tracking-wider">
              Catatan / Keterangan (Opsional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Diterima langsung dari orang tua siswa"
              className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] text-xs text-[#0b1c30] border border-[#d3e4fe] focus:outline-none focus:ring-2 focus:ring-[#004ac6]"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#004ac6] hover:bg-[#2563eb] shadow-md transition-all cursor-pointer"
            >
              Terbitkan Kwitansi & Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
