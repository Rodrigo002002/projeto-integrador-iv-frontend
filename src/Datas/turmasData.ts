import { getProfessoresData, getProfessorNoService } from '@/Datas/professoresData';
import { ITurma } from '@/types/ITurma';
import { getModalidadesData } from '@/Datas/modalidadesData';
import { getAlunoNoClass } from '@/Datas/alunosData';
import { getAulasNoClass } from '@/Datas/aulasData';

export const getTurmasData = (): ITurma[] => {
    return [
        {
            id: 1,
            modalidade: getModalidadesData()[0],
            aulas: getAulasNoClass(),
            alunos: getAlunoNoClass(),
            professor: getProfessorNoService(),
            periodo: 'Diurno'
        }
    ];
};
