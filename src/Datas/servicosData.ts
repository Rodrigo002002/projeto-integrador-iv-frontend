import { IServico, ITipoServico } from '@/types/IServico';
import { getProfessorNoService } from '@/Datas/professoresData';
import { getAlunosData } from '@/Datas/alunosData';

export const getServicosData = (): IServico[] => {
    return [
        {
            id: 1,
            tipoServico: getTiposServico()[0],
            data: '10/10/2024',
            pagamento: {
                id: 1,
                dataPagamento: '10/09/2024',
                dataPrazo: '10/10/2024',
                valor: '100,00',
                pago: true
            },
            professor: getProfessorNoService(),
            aluno: getAlunosData()[0]
        }
    ];
};

export const getTiposServico = (): ITipoServico[] => {
    return [
        {
            id: 1,
            tipo: 'Aula particular',
            preco: '100,00'
        }
    ];
};
