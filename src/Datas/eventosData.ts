import { IEvento } from '@/types/IEvento';
import { getEquipesData } from '@/Datas/equipesData';
import { getModalidadesData } from '@/Datas/modalidadesData';

export const getEventosData = (): IEvento[] => {
    return [
        {
            id: 1,
            nome: 'Falcões',
            data: '1010/2024',
            equipes: getEquipesData(),
            modalidade: getModalidadesData()[0]
        }
    ];
};
