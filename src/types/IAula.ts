import { IAluno } from '@/types/IAluno';
import { ITurma } from '@/types/ITurma';

export interface IAula {
    id: number,
    data: string,
    alunosPresentes: IAluno[],
    turma?: ITurma
}

export interface IAulaForm {
    id: number | null,
    data: string | null,
    alunosPresentes?: IAluno[] | null,
    turma: ITurma | null
}

