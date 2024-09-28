import { IAula } from '@/types/IAula';
import { getAlunoNoClass, getAlunosData } from '@/Datas/alunosData';
import { getTurmasData } from '@/Datas/turmasData';

export const getAulasData = (): IAula[] => {
    return [
        {
            id: 1,
            data: '10/10/2024',
            alunosPresentes: getAlunosData(),
            turma: getTurmasData()[0]
        }
    ];
};

export const getAulasNoClass = (): IAula[] => {
    return [
        {
            id: 1,
            data: '10/10/2024',
            alunosPresentes: getAlunoNoClass()
        }
    ];
};
