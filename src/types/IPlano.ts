import { IModalidade } from '@/types/IModalidade';
import { IPagamento } from '@/types/IPagamento';

export interface IPlano {
    id: number,
    nome: string,
    tipo: string,
    beneficios: string[],
    preco: string,
    modalidades: IModalidade[]
}

export interface IPlanoForm {
    id: number | null,
    nome: string | null,
    tipo: string | null,
    beneficios: string[] | null,
    preco: string | null,
    modalidades: IModalidade[] | null
}
