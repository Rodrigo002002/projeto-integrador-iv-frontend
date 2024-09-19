import { Dispatch, SetStateAction } from 'react';
import { IAluno } from '@/types/IAluno';

export interface IAlunosModalProps {
    isAlunosModal: boolean;
    setIsAlunosModal: Dispatch<SetStateAction<boolean>>;
    alunos: IAluno[];
}
