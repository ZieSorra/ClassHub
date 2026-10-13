import React, { useState } from 'react';
import { useClassHub } from '../../context/ClassHubContext';
import { AttendanceEntry, AttendanceStatus } from '../../types';

export const InputPresensiModal: React.FC = () => {
  const { students, attendanceList, batchSetAttendance, closeModal, showToast } = useClassHub();

  const [localAttendance, setLocalAttendance] = useState<AttendanceEntry[]>(() => {
    return students.map(s => {
      const existing = attendanceList.find(a => a.studentId === s.id);
      return existing || {
        studentId: s.id,
        status: s.status === 'nonaktif' ? 'sakit' : 'hadir',
        time: '07:15'
      };
    });
  });

  const [filter, setFilter] = useState<'semua' | AttendanceStatus>('semua');

  const hadirCount = localAttendance.filter(a => a.status === 'hadir').length;
  const sakitCount = localAttendance.filter(a => a.status === 'sakit').length;
  const izinCount = localAttendance.filter(a => a.status === 'izin').length;
  const alpaCount = localAttendance.filter(a => a.status === 'alpa').length;
  const total = students.length;
  const percent = total > 0 ? ((hadirCount / total) * 100).toFixed(1) : '0';

  const setStatus = (studentId: string, status: AttendanceStatus) => {
    setLocalAttendance(prev => prev.map(item => {
      if (item.studentId === studentId) {
        return {
          ...item,
          status,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
        };
      }
      return item;
    }));
  };

  const markAllHadir = () => {
    setLocalAttendance(prev => prev.map(item => ({
      ...item,
      status: 'hadir',
      time: '07:15 WIB'
    })));
    showToast('info', 'Presensi Massal', 'Semua siswa ditandai HADIR.');
  };

  const handleSave = () => {
    batchSetAttendance(localAttendance);
    closeModal();
  };

  const filteredStudents = students.filter(student => {
    if (filter === 'semua') return true;
    const item = localAttendance.find(a => a.studentId === student.id);
    return item?.status === filter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white max-w-4xl w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-[#eff4ff] border-b border-[#d3e4fe] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#004ac6] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[24px]">fact_check</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0b1c30]">Input Presensi Kelas V-A</h2>
              <p className="text-xs text-[#434655]">Senin, 16 Februari 2026 • Sesi Pagi</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={markAllHadir}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#dbe1ff] text-[#004ac6] text-xs font-bold border border-[#d3e4fe] shadow-xs cursor-pointer transition-colors"
            >
              Tandai Semua Hadir
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="p-2 rounded-xl text-[#737686] hover:bg-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Live Counters */}
        <div className="p-4 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Partisipasi:</span>
            <span className="text-base font-extrabold text-[#006056] font-mono">{percent}%</span>
            <span className="text-slate-400">({hadirCount} dari {total} siswa)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setFilter('semua')}
              className={`px-2.5 py-1 rounded-lg font-bold text-xs cursor-pointer transition-colors ${
                filter === 'semua' ? 'bg-[#0b1c30] text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Semua ({total})
            </button>
            <button
              type="button"
              onClick={() => setFilter('hadir')}
              className={`px-2.5 py-1 rounded-lg font-bold text-xs cursor-pointer transition-colors ${
                filter === 'hadir' ? 'bg-[#006056] text-white' : 'bg-[#71f8e4]/30 text-[#005048]'
              }`}
            >
              Hadir ({hadirCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('sakit')}
              className={`px-2.5 py-1 rounded-lg font-bold text-xs cursor-pointer transition-colors ${
                filter === 'sakit' ? 'bg-[#712ae2] text-white' : 'bg-[#eaddff] text-[#25005a]'
              }`}
            >
              Sakit ({sakitCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('izin')}
              className={`px-2.5 py-1 rounded-lg font-bold text-xs cursor-pointer transition-colors ${
                filter === 'izin' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Izin ({izinCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('alpa')}
              className={`px-2.5 py-1 rounded-lg font-bold text-xs cursor-pointer transition-colors ${
                filter === 'alpa' ? 'bg-[#ba1a1a] text-white' : 'bg-[#ffdad6] text-[#93000a]'
              }`}
            >
              Alpa ({alpaCount})
            </button>
          </div>
        </div>

        {/* Student Roll Call List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2.5 divide-y divide-slate-100">
          {filteredStudents.map((student, idx) => {
            const entry = localAttendance.find(a => a.studentId === student.id);
            const status = entry?.status || 'hadir';

            return (
              <div key={student.id} className="pt-2.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center text-xs font-bold text-slate-400">
                    {idx + 1}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                    {student.photo ? (
                      <img src={student.photo} alt={student.name} className="w-full h-full object-cover" />
                    ) : (
                      student.initials
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{student.name}</p>
                    <p className="text-[11px] text-slate-500 font-mono">NIS: {student.nis}</p>
                  </div>
                </div>

                {/* Status Toggle Buttons */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setStatus(student.id, 'hadir')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      status === 'hadir'
                        ? 'bg-[#006056] text-white shadow-xs'
                        : 'bg-[#eff4ff] text-slate-600 hover:bg-[#dce9ff]'
                    }`}
                  >
                    Hadir
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(student.id, 'sakit')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      status === 'sakit'
                        ? 'bg-[#712ae2] text-white shadow-xs'
                        : 'bg-[#eff4ff] text-slate-600 hover:bg-[#dce9ff]'
                    }`}
                  >
                    Sakit
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(student.id, 'izin')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      status === 'izin'
                        ? 'bg-slate-700 text-white shadow-xs'
                        : 'bg-[#eff4ff] text-slate-600 hover:bg-[#dce9ff]'
                    }`}
                  >
                    Izin
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(student.id, 'alpa')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      status === 'alpa'
                        ? 'bg-[#ba1a1a] text-white shadow-xs'
                        : 'bg-[#eff4ff] text-slate-600 hover:bg-[#dce9ff]'
                    }`}
                  >
                    Alpa
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#eff4ff] border-t border-[#d3e4fe] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-white transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#004ac6] hover:bg-[#2563eb] shadow-md transition-all cursor-pointer"
          >
            Simpan & Rekap Presensi
          </button>
        </div>
      </div>
    </div>
  );
};
