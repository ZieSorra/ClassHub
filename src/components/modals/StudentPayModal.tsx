import React, { useState } from 'react';
import { useClassHub } from '../../context/ClassHubContext';

export const StudentPayModal: React.FC = () => {
  const { currentStudent, addTransaction, closeModal, showToast } = useClassHub();
  const [method, setMethod] = useState<'qris' | 'va' | 'tunai'>('qris');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
      const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

      addTransaction({
        studentId: currentStudent.id,
        studentName: currentStudent.name,
        studentInitials: currentStudent.initials,
        category: 'Iuran Kas Minggu Ke-6 & Ke-7',
        amount: 15000,
        date: dateStr,
        time: timeStr,
        status: 'lunas',
        verifiedBy: 'Sistem Pembayaran Portal Siswa',
        paymentMethod: method === 'qris' ? 'QRIS Nasional' : method === 'va' ? 'Virtual Account BCA' : 'Titip Kas Tunai'
      });

      setIsProcessing(false);
      showToast('success', 'Pembayaran Sukses!', 'Tagihan kas Rp 15.000 telah lunas. Kwitansi digital telah diterbitkan.');
      closeModal();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-[#eff4ff] border-b border-[#d3e4fe] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">payments</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Bayar Tagihan Kas Kelas</h3>
              <p className="text-[11px] text-slate-500">Ahmad Fauzan • Kelas V-A</p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-1 rounded-xl text-slate-400 hover:bg-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Amount Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Tagihan</span>
              <p className="text-xl font-extrabold text-blue-700 font-mono">Rp 15.000</p>
              <p className="text-[11px] text-slate-500">Iuran Kas Mingguan Ke-6 & Ke-7</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
              1 Menunggu
            </span>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-1.5">
            <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
              Pilih Cara Pembayaran:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMethod('qris')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  method === 'qris'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-bold'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] block mb-0.5">qr_code_2</span>
                <span className="text-[11px]">QRIS Instan</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod('va')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  method === 'va'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-bold'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] block mb-0.5">account_balance</span>
                <span className="text-[11px]">Virtual Account</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod('tunai')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  method === 'tunai'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-bold'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] block mb-0.5">savings</span>
                <span className="text-[11px]">Tunai di Kelas</span>
              </button>
            </div>
          </div>

          {/* Method Content */}
          {method === 'qris' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="w-32 h-32 bg-white rounded-xl mx-auto p-2 border border-slate-200 flex flex-col items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[64px] text-slate-800">qr_code_2</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase">QRIS STANDAR BI</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Pindai menggunakan aplikasi m-Banking (BCA, Mandiri, BRI, BNI) atau e-Wallet (GoPay, OVO, ShopeePay).
              </p>
            </div>
          )}

          {method === 'va' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Bank Tujuan:</span>
                <span className="font-bold text-slate-800">BCA Virtual Account</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Nomor VA:</span>
                <span className="font-mono font-bold text-blue-700 text-sm">8273 0148 8291 0300</span>
              </div>
              <p className="text-[10px] text-slate-400">Pembayaran akan otomatis terverifikasi dalam 1 menit.</p>
            </div>
          )}

          {method === 'tunai' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <p className="font-semibold text-slate-800">Konfirmasi Titip Tunai</p>
              <p className="text-[11px] text-slate-600">
                Serahkan uang tunai pas Rp 15.000 kepada Bendahara Kelas atau Ibu Nurul Aini saat jam istirahat.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handlePay}
            disabled={isProcessing}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-75"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">check</span>
                <span>Konfirmasi Pembayaran Selesai</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
