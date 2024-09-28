import { IPlano } from '@/types/IPlano';
import { getModalidadesData } from '@/Datas/modalidadesData';
import { getPagamentosData } from '@/Datas/pagamentosData';

export const getPlanosData = (): IPlano[] => {
    return [
        {
            id: 1,
            nome: 'Plano Básico',
            tipo: 'Individual',
            beneficios: [
                'Uma Modalidade',
                'Acesso a uma aula particular gratuíta no mês',
            ],
            preco: '100,00',
            modalidades: getModalidadesData()
        }
    ]
}
