import { IEquipe } from '@/types/IEquipe';
import { getAlunosData } from '@/Datas/alunosData';

export const getEquipesData = (): IEquipe[] => {
    return [
        {
            id: 1,
            nome: 'Corrida solidária',
            alunos: getAlunosData()
        }
    ]
}
