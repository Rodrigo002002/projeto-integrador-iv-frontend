import { IAluno } from '@/types/IAluno';

export interface IEquipe {
    id: number,
    nome: string,
    alunos: IAluno[]
}

export interface IEquipeForm {
    id: number | null,
    nome: string | null,
    alunos: IAluno[] | null
}
