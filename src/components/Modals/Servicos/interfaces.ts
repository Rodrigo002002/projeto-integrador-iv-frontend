import { Dispatch, SetStateAction } from 'react';
import { IServico } from '@/types/IServico';

export interface IServicosModalProps {
    isServicoModal: boolean;
    setIsServicoModal: Dispatch<SetStateAction<boolean>>;
    servicos: IServico[];
}
