import React, { useState } from 'react';
import { useClassHub } from '../../context/ClassHubContext';
import { Handnote } from '../../types';

export const HandnoteModal: React.FC = () => {
  const { modalPayload, handnotes, closeModal, showToast } = useClassHub();
  const handnote: Handnote = modalPayload || handnotes[0];

  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const slides = handnote.slides;
  const currentSlide = slides[currentSlideIdx] || slides[0];

  const handleDownload = () => {
    showToast('success', 'Unduhan Siap', `Modul "${handnote.title}" berhasil diunduh ke folder Dokumen.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[22px]">menu_book</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 block">
                {handnote.categoryTag} • {handnote.subjectCode}
              </span>
              <h2 className="text-sm font-bold leading-tight">{handnote.title}</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-1 rounded-xl text-white/80 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-5 text-xs">
          {/* Banner Hero of Handnote */}
          <div className="w-full h-44 rounded-2xl overflow-hidden relative shadow-md">
            <img
              src={handnote.coverImage}
              alt={handnote.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 text-white">
              <div>
                <span className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Oleh {handnote.teacherName}
                </span>
                <p className="text-sm font-extrabold mt-1">{currentSlide.title}</p>
              </div>
            </div>
          </div>

          {/* Slide Page Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span className="font-bold text-slate-700">Halaman {currentSlideIdx + 1} dari {slides.length}</span>
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentSlideIdx(i)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    currentSlideIdx === i ? 'bg-blue-600 scale-110' : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Slide Main Prose */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 leading-relaxed text-xs">
            <p className="text-slate-700 leading-relaxed">{currentSlide.content}</p>
          </div>

          {/* Key Points / Rangkuman Cepat */}
          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-2">
            <span className="font-bold text-teal-900 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-teal-600">bookmark_star</span>
              Poin Kunci & Catatan Penting:
            </span>
            <ul className="space-y-1.5 text-[11px] text-teal-950">
              {currentSlide.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleDownload}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Unduh Ringkasan PDF</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentSlideIdx === 0}
              onClick={() => setCurrentSlideIdx(prev => Math.max(0, prev - 1))}
              className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Sebelumnya
            </button>
            <button
              type="button"
              disabled={currentSlideIdx === slides.length - 1}
              onClick={() => setCurrentSlideIdx(prev => Math.min(slides.length - 1, prev + 1))}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
