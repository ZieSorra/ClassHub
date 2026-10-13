import React from 'react';
import { useClassHub } from '../../context/ClassHubContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useClassHub();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl border text-xs min-w-[280px] max-w-sm animate-in slide-in-from-bottom-3 duration-200 ${
              isSuccess
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : isError
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : 'bg-blue-50 border-blue-200 text-blue-900'
            }`}
          >
            <span className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${
              isSuccess ? 'text-emerald-600' : isError ? 'text-rose-600' : 'text-blue-600'
            }`}>
              {isSuccess ? 'check_circle' : isError ? 'error' : 'info'}
            </span>
            <div className="flex-1">
              <p className="font-bold text-xs">{toast.title}</p>
              <p className="text-[11px] mt-0.5 leading-snug opacity-90">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};
