import { IDocumento } from '@/types/IDocumento';
import { IServico } from '@/types/IServico';

export interface IProfessorResponse {
    id: string,
    nome: string,
    role: string,
    rg: string,
    cpf: string,
    telefone: string,
    email: string,
    documentos: IDocumento[],
    servicos?: IServico[],
}

export interface IProfessorRequest {
    nome: string,
    role: string,
    telefone: string,
    email: string,
    rg: string,
    cpf: string,
    documentosIds: number[],
    servicoId: number
}

export interface IProfessorForm {
    nome: string | null,
    role: string | null,
    telefone: string | null,
    email: string | null,
    rg: string | null,
    cpf: string | null,
    documentos: IDocumento[] | null,
    servicos: IServico[] | null,
}
