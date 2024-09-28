import { IProfessorResponse } from '@/types/IProfessor';
import { IPagamento } from '@/types/IPagamento';
import { IAluno } from '@/types/IAluno';

export interface ITipoServico {
    id: number;
    tipo: string;
    preco: string
}

export interface ITipoServicoForm {
    id: number | null;
    tipo: string | null;
    preco: string | null;
}

export interface IServico {
    id: number;
    tipoServico: ITipoServico;
    data: string;
    pagamento: IPagamento | null;
    professor: IProfessorResponse;
    aluno: IAluno;
}

export interface IServicoForm {
    id: number | null;
    tipoServico: ITipoServico | null;
    data: string | null;
    pagamento: IPagamento | null;
    professor: IProfessorResponse | null,
    aluno: IAluno | null,
}
