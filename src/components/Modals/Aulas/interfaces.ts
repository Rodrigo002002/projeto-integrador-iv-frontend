import { Dispatch, SetStateAction } from 'react';
import { IAula } from '@/types/IAula';

export interface IAulasModalProps {
    isAulasModal: boolean;
    setIsAulasModal: Dispatch<SetStateAction<boolean>>;
    aulas: IAula[];
}
