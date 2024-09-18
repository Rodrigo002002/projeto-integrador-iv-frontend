import { IProfessorResponse } from '@/types/IProfessor';
import { IPagamento } from '@/types/IPagamento';
import { IAluno } from '@/types/IAluno';

export interface IServico {
    id: number;
    tipo: string;
    pagamento: IPagamento | null;
    professor: IProfessorResponse;
    aluno: IAluno;
}
