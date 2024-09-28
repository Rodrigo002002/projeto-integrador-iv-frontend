import { IAluno } from '@/types/IAluno';
import { IProfessorResponse } from '@/types/IProfessor';
import { IAula } from '@/types/IAula';
import { IModalidade } from '@/types/IModalidade';

export interface ITurma {
    id: number;
    modalidade?: IModalidade;
    aulas?: IAula[];
    alunos?: IAluno[];
    professor?: IProfessorResponse;
    periodo: string;
}

export interface ITurmaForm {
    id: number | null,
    modalidade?: IModalidade | null,
    aulas?: IAula[] | null,
    alunos?: IAluno[] | null,
    professor?: IProfessorResponse | null,
    periodo: string | null
}
