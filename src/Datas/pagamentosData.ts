import { IPagamento } from '@/types/IPagamento';

export const getPagamentosData = (): IPagamento[] => {
    return [
        {
            id: 1,
            dataPagamento: '01/09/2024',
            dataPrazo: '10/10/2024',
            servicoId: 1,
            valor: '100,00',
            pago: true
        },
        {
            id: 2,
            dataPagamento: '01/09/2024',
            dataPrazo: '10/10/2024',
            planoId: 1,
            valor: '100,00',
            pago: true
        }
    ];
};
