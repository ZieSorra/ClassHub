import React from 'react';
import { useClassHub } from '../../context/ClassHubContext';

export const SuratDokterModal: React.FC = () => {
  const { closeModal } = useClassHub();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-100">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-emerald-600">medical_services</span>
            <span className="text-xs font-bold text-slate-800">Lampiran Surat Keterangan Sakit</span>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Doctor's Certificate View */}
        <div className="p-6 space-y-4 bg-white text-xs">
          <div className="text-center pb-3 border-b border-slate-200 space-y-1">
            <h3 className="font-extrabold text-sm uppercase text-slate-900">
              RUMAH SAKIT UMUM DAERAH (RSUD) KOTA BANDUNG
            </h3>
            <p className="text-[11px] text-slate-500">
              Instalasi Rawat Jalan Anak • SIP: 445/1029-Dinkes/2023
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Nama Pasien:</span>
              <span className="font-bold text-slate-900">Ahmad Rayhan</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Umur / Kelas:</span>
              <span className="font-medium text-slate-800">11 Tahun / Kelas V-A SD Bintang Bangsa</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Diagnosis:</span>
              <span className="font-bold text-rose-700">Febris / Demam Tifoid Akut</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Rekomendasi Medis:</span>
              <span className="font-semibold text-slate-800">Istirahat total selama 5 (lima) hari</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Mulai Tanggal:</span>
              <span className="font-mono text-slate-800">16 Februari 2026 s/d 20 Februari 2026</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-[11px] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0">check_circle</span>
            <span>Surat telah dikonfirmasi dan divalidasi melalui nomor WhatsApp Orang Tua (Bpk. Irfan Maulana).</span>
          </div>

          <div className="pt-2 text-right">
            <p className="text-[11px] text-slate-500">Dokter Pemeriksa,</p>
            <p className="font-bold text-slate-900 text-xs mt-4">dr. Hendrawan Sp.A</p>
            <p className="text-[10px] text-slate-400 font-mono">NIP. 19780814 200501 1 004</p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="px-5 py-2 rounded-xl bg-[#004ac6] text-white text-xs font-bold hover:bg-[#2563eb] transition-colors cursor-pointer"
          >
            Tutup Pratinjau
          </button>
        </div>
      </div>
    </div>
  );
};
