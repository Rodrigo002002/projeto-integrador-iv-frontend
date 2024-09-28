import { IEquipe } from '@/types/IEquipe';
import { IModalidade } from '@/types/IModalidade';

export interface IEvento {
    id: number,
    descricao: string,
    nome: string,
    data: string,
    equipes: IEquipe[],
    modalidade: IModalidade
}

export interface IEventoForm {
    id: number | null,
    descricao: string | null,
    nome: string | null,
    data: string | null,
    equipes: IEquipe[] | null,
    modalidade: IModalidade| null
}
