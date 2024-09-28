import { IDocumento } from '@/types/IDocumento';
import { ITurma } from '@/types/ITurma';
import { IPlano } from '@/types/IPlano';
import { IPagamento } from '@/types/IPagamento';

export interface IAluno {
    id: string,
    nome: string;
    role: string;
    telefone: string;
    email: string;
    password?: string;
    turma?: ITurma;
    rg?: string;
    cpf?: string;
    documentos?: IDocumento[];
    plano?: IPlano;
    pagamentos: IPagamento[];
}

export interface IAlunoForm {
    id: string | null,
    nome: string | null,
    role: string | null,
    telefone: string | null,
    email: string | null,
    password?: string | null,
    turma?: ITurma | null,
    rg?: string | null,
    cpf?: string | null,
    documentos?: IDocumento[] | null,
    plano?: IPlano | null,
    pagamentos: IPagamento[] | null
}
