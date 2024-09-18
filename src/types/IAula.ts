import { IAluno } from '@/types/IAluno';
import { ITurma } from '@/types/ITurma';

export interface IAula {
    id: number,
    data: string,
    alunosPresentes: IAluno[],
    turmaId: ITurma
}
