import React, { useState } from 'react';
import { useClassHub } from '../../context/ClassHubContext';
import { Assignment } from '../../types';

export const AssignmentDetailModal: React.FC = () => {
  const { modalPayload, assignments, submitAssignmentProgress, closeModal } = useClassHub();
  const assignment: Assignment = modalPayload || assignments[0];

  const [uploadedFile, setUploadedFile] = useState<string>('Laporan_Praktikum_Rangkaian_AhmadFauzan.pdf');
  const [notes, setNotes] = useState('Berikut adalah dokumentasi foto rangkaian seri & paralel dan tabel uji saklar baterai.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAssignmentProgress(assignment.id, 100);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-[#eff4ff] border-b border-[#d3e4fe] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">assignment</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-blue-700 block">
                {assignment.subjectCode} • {assignment.teacherName}
              </span>
              <h3 className="font-bold text-sm text-slate-900 leading-tight">{assignment.title}</h3>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Batas Waktu:</span>
              <span className="font-bold text-rose-700">{assignment.deadlineText}</span>
            </div>
            <p className="text-slate-700 leading-relaxed">{assignment.description}</p>
          </div>

          {/* Submission file attachment */}
          <div className="space-y-1.5">
            <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
              File Tugas Kamu:
            </span>
            <div className="p-3 rounded-xl border border-dashed border-blue-300 bg-blue-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-[24px] text-blue-600">picture_as_pdf</span>
                <div className="truncate">
                  <p className="font-bold text-slate-900 text-xs truncate">{uploadedFile}</p>
                  <span className="text-[10px] text-slate-500">1.8 MB • Siap Dikirim</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setUploadedFile('Foto_Rangkaian_Fauzan.jpg')}
                className="text-[11px] text-blue-600 hover:underline font-bold shrink-0"
              >
                Ganti File
              </button>
            </div>
          </div>

          {/* Student comments */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
              Catatan untuk Guru (Opsional):
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#eff4ff] border border-[#d3e4fe] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold transition-colors cursor-pointer"
            >
              Tutup
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">upload_file</span>
              <span>Kirim Tugas ke Guru</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
