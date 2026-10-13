import React from 'react';
import { useClassHub } from '../../context/ClassHubContext';
import { InputPresensiModal } from './InputPresensiModal';
import { CatatBayarModal } from './CatatBayarModal';
import { KwitansiModal } from './KwitansiModal';
import { CekBuktiModal } from './CekBuktiModal';
import { TambahSiswaModal } from './TambahSiswaModal';
import { NonaktifSiswaModal } from './NonaktifSiswaModal';
import { SuratDokterModal } from './SuratDokterModal';
import { QuizModal } from './QuizModal';
import { HandnoteModal } from './HandnoteModal';
import { StudentPayModal } from './StudentPayModal';
import { AssignmentDetailModal } from './AssignmentDetailModal';

export const ModalRoot: React.FC = () => {
  const { activeModal } = useClassHub();

  if (!activeModal) return null;

  switch (activeModal) {
    case 'input-presensi':
      return <InputPresensiModal />;
    case 'catat-bayar':
      return <CatatBayarModal />;
    case 'kwitansi':
      return <KwitansiModal />;
    case 'cek-bukti':
      return <CekBuktiModal />;
    case 'tambah-siswa':
      return <TambahSiswaModal />;
    case 'nonaktif-siswa':
      return <NonaktifSiswaModal />;
    case 'surat-dokter':
      return <SuratDokterModal />;
    case 'quiz':
      return <QuizModal />;
    case 'handnote':
      return <HandnoteModal />;
    case 'student-pay':
      return <StudentPayModal />;
    case 'assignment-detail':
      return <AssignmentDetailModal />;
    default:
      return null;
  }
};
