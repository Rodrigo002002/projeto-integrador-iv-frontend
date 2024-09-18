import { IModalidade } from '@/types/IModalidade';
import { IPagamento } from '@/types/IPagamento';

export interface IPlano {
    id: number,
    nome: string,
    tipo: string,
    beneficios: string[],
    preco: string,
    modalidades: IModalidade[],
    pagamentos: IPagamento[],
}
