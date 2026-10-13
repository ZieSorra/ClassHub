import React, { useState } from 'react';
import { useClassHub } from '../../context/ClassHubContext';
import { Quiz } from '../../types';

export const QuizModal: React.FC = () => {
  const { modalPayload, quizzes, finishQuiz, closeModal } = useClassHub();
  const quiz: Quiz = modalPayload || quizzes[0];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const questions = quiz.questions;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (hasAnsweredCurrent) return;
    const copy = [...selectedAnswers];
    copy[currentIdx] = optIdx;
    setSelectedAnswers(copy);
    setHasAnsweredCurrent(true);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setHasAnsweredCurrent(selectedAnswers[currentIdx + 1] !== undefined);
    } else {
      // Calculate final score
      let correct = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctOptionIndex) {
          correct++;
        }
      });
      const calculatedScore = Math.round((correct / questions.length) * 100);
      const points = 30;
      finishQuiz(quiz.id, calculatedScore, points);
      setIsFinished(true);
    }
  };

  const calculateCorrectCount = () => {
    let count = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        count++;
      }
    });
    return count;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white max-w-xl w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[22px]">quiz</span>
            </div>
            <div>
              <h2 className="text-sm font-bold leading-tight">{quiz.title}</h2>
              <p className="text-[11px] text-blue-100">{quiz.subject} • {quiz.subjectType}</p>
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

        {/* Quiz Body */}
        {!isFinished ? (
          <div className="p-6 flex-1 overflow-y-auto space-y-5 text-xs">
            {/* Progress Bar & Indicators */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-slate-500 font-semibold text-[11px]">
                <span>Soal {currentIdx + 1} dari {questions.length}</span>
                <span className="font-mono text-blue-600">Sisa Waktu: 12:45 Menit</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Text */}
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100/80">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Pertanyaan #{currentIdx + 1}
              </span>
              <p className="text-sm font-bold text-slate-900 leading-snug">
                {currentQ.questionText}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                const isCorrect = optIdx === currentQ.correctOptionIndex;

                let optClass = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
                if (hasAnsweredCurrent) {
                  if (isSelected && isCorrect) {
                    optClass = 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optClass = 'bg-rose-50 border-rose-300 text-rose-800';
                  } else if (isCorrect) {
                    optClass = 'bg-emerald-50/60 border-emerald-300 text-emerald-800 font-semibold';
                  }
                } else if (isSelected) {
                  optClass = 'bg-blue-50 border-blue-400 text-blue-800 font-bold';
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={hasAnsweredCurrent}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${optClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-xs">{option}</span>
                    </div>

                    {hasAnsweredCurrent && isCorrect && (
                      <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                    )}
                    {hasAnsweredCurrent && isSelected && !isCorrect && (
                      <span className="material-symbols-outlined text-[18px] text-rose-600">cancel</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after answer */}
            {hasAnsweredCurrent && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1 animate-in fade-in">
                <span className="font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">lightbulb</span>
                  Penjelasan Konsep:
                </span>
                <p className="leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}
          </div>
        ) : (
          /* Finished Screen */
          <div className="p-8 text-center space-y-5 animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[44px]">emoji_events</span>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Selamat! Kuis Berhasil Diselesaikan</h3>
              <p className="text-xs text-slate-500 mt-1">Kamu telah menjawab seluruh pertanyaan dengan sangat baik.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Nilai Akhir</span>
                <p className="text-2xl font-black text-emerald-600 font-mono">
                  {Math.round((calculateCorrectCount() / questions.length) * 100)}
                </p>
                <span className="text-[10px] text-slate-500 font-semibold">{calculateCorrectCount()} / {questions.length} Benar</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Bonus Hadiah</span>
                <p className="text-2xl font-black text-amber-500 font-mono">+30</p>
                <span className="text-[10px] text-amber-700 font-bold">XP Poin Kelas ⭐</span>
              </div>
            </div>

            <p className="text-xs text-emerald-700 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              Hasil kamu telah otomatis tersimpan ke buku nilai Ibu Nurul Aini!
            </p>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          {!isFinished ? (
            <>
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                Keluar
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!hasAnsweredCurrent}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <span>{currentIdx < questions.length - 1 ? 'Soal Berikutnya' : 'Selesai & Kumpulkan'}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={closeModal}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-md cursor-pointer"
            >
              Kembali ke Dashboard Siswa
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
