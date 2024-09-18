import { IAluno } from '@/types/IAluno';
import { IProfessorResponse } from '@/types/IProfessor';
import { IAula } from '@/types/IAula';
import { IModalidade } from '@/types/IModalidade';

export interface ITurma {
    id: number;
    modalidade?: IModalidade;
    aulas?: IAula[];
    aluno?: IAluno[];
    professor?: IProfessorResponse;
    periodo: string;
}
