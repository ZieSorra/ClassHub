import React from 'react';
import { useClassHub } from '../../context/ClassHubContext';
import { Transaction } from '../../types';

export const CekBuktiModal: React.FC = () => {
  const { modalPayload, verifyTransaction, closeModal } = useClassHub();
  const tx: Transaction = modalPayload;

  if (!tx) return null;

  const handleApprove = () => {
    verifyTransaction(tx.id);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-[#eff4ff] border-b border-[#d3e4fe] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#712ae2] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">receipt</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#0b1c30]">Verifikasi Bukti Transfer</h3>
              <p className="text-[11px] text-[#434655]">{tx.receiptNumber}</p>
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

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Details */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Nama Siswa:</span>
              <span className="font-bold text-slate-900">{tx.studentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Kategori:</span>
              <span className="font-semibold text-slate-800">{tx.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Nominal:</span>
              <span className="font-extrabold text-blue-700 font-mono text-sm">
                Rp {tx.amount.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Metode:</span>
              <span className="font-medium text-slate-700">{tx.paymentMethod}</span>
            </div>
          </div>

          {/* Simulated Bank Slip Image */}
          <div className="space-y-1.5">
            <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
              Foto Slip Transfer Bank
            </span>
            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">account_balance</span>
              </div>
              <div>
                <p className="font-bold text-slate-800 text-xs">Transfer Berhasil — Bank Mandiri</p>
                <p className="text-[11px] text-slate-500 font-mono">Ref: MANDIRI-TRX-948291</p>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">Status Bank: Transaksi Sukses 14 Feb 2026</p>
              </div>
              <p className="text-[11px] text-slate-600 italic bg-white p-2 rounded-lg border border-slate-200 w-full text-left">
                "{tx.evidenceNote || 'Slip transfer diunggah orang tua melalui portal wali murid.'}"
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handleApprove}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>Verifikasi & Setujui Lunas</span>
          </button>
        </div>
      </div>
    </div>
  );
};
