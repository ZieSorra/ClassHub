import React from 'react';
import { useClassHub } from '../../context/ClassHubContext';
import { Transaction } from '../../types';

export const KwitansiModal: React.FC = () => {
  const { modalPayload, closeModal, showToast } = useClassHub();
  const tx: Transaction = modalPayload || {
    id: 'tx-default',
    studentId: 'std-1',
    studentName: 'Ahmad Fauzan',
    studentInitials: 'AF',
    category: 'Kas Mingguan Ke-6',
    amount: 10000,
    date: '16 Feb 2026',
    time: '07:45',
    status: 'lunas',
    receiptNumber: 'KWT/2026/02/0142',
    verifiedBy: 'Ibu Nurul Aini, S.Pd.',
    paymentMethod: 'Tunai di Kelas'
  };

  const handlePrint = () => {
    showToast('info', 'Mencetak Kwitansi', `Kwitansi ${tx.receiptNumber} dikirim ke dialog cetak.`);
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-100">
        {/* Top Control Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-blue-600">receipt_long</span>
            Tanda Bukti Pembayaran Sah
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">print</span>
              <span>Cetak</span>
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Receipt Body (Printable Card) */}
        <div className="p-8 space-y-6 bg-white" id="printable-receipt">
          {/* School Header */}
          <div className="text-center pb-4 border-b-2 border-slate-900 space-y-1">
            <div className="flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-blue-600">school</span>
              <h3 className="font-extrabold text-base tracking-tight text-slate-900 uppercase">
                SD BINTANG BANGSA
              </h3>
            </div>
            <p className="text-[11px] text-slate-600 font-medium">
              Buku Kas & Administrasi Keuangan Kelas V-A • T.A. 2026/2027
            </p>
            <p className="text-[10px] text-slate-400 font-mono">
              Jl. Pendidikan No. 45 Bandung • NPSN: 20219482
            </p>
          </div>

          {/* Receipt Meta */}
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Nomor Kwitansi</span>
              <p className="font-bold text-slate-900 font-mono">{tx.receiptNumber}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Tanggal & Waktu</span>
              <p className="font-medium text-slate-800">{tx.date}, {tx.time} WIB</p>
            </div>
          </div>

          {/* Payment Details Table */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5 text-xs">
            <div className="grid grid-cols-3">
              <span className="text-slate-500 font-medium">Telah Terima Dari</span>
              <span className="col-span-2 font-bold text-slate-900">{tx.studentName} (Kelas V-A)</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-slate-500 font-medium">Untuk Pembayaran</span>
              <span className="col-span-2 font-semibold text-slate-800">{tx.category}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-slate-500 font-medium">Metode</span>
              <span className="col-span-2 font-medium text-slate-700">{tx.paymentMethod || 'Tunai di Kelas'}</span>
            </div>
            <div className="grid grid-cols-3 pt-2 border-t border-slate-200">
              <span className="text-slate-500 font-bold uppercase text-[11px]">Jumlah Uang</span>
              <span className="col-span-2 text-lg font-extrabold text-blue-700 font-mono">
                Rp {tx.amount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Verification Stamp & Sign */}
          <div className="pt-4 flex items-end justify-between">
            <div className="p-2.5 rounded-xl border-2 border-dashed border-emerald-600 bg-emerald-50/50 inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-700 text-[26px]">verified</span>
              <div>
                <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest block">
                  LUNAS / VERIFIED
                </span>
                <span className="text-[9px] text-emerald-700 font-mono">ClassHub System Validated</span>
              </div>
            </div>

            <div className="text-center space-y-1">
              <span className="text-[10px] text-slate-400 block">Penerima / Wali Kelas,</span>
              <div className="h-10 flex items-center justify-center">
                <span className="font-serif italic text-blue-900 font-bold text-sm">Nurul Aini</span>
              </div>
              <p className="text-xs font-bold text-slate-900 underline underline-offset-2">
                Ibu Nurul Aini, S.Pd.
              </p>
              <p className="text-[9px] text-slate-500 font-mono">NIP. 19850412 201001 2 021</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
