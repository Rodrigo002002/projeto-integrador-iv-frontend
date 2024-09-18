import { IDocumento } from '@/types/IDocumento';
import { ITurma } from '@/types/ITurma';
import { IPlano } from '@/types/IPlano';

export interface IAluno {
    id: string,
    nome: string;
    role: string;
    telefone: string;
    email: string;
    password?: string;
    turma: ITurma;
    rg?: string;
    cpf?: string;
    documentos?: IDocumento[];
    plano?: IPlano;
}
