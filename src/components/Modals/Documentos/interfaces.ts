import { Dispatch, SetStateAction } from 'react';
import { IDocumento } from '@/types/IDocumento';

export interface IDocumentosModalProps {
    title: string,
    isDocumentoModal: boolean;
    setIsDocumentoModal: Dispatch<SetStateAction<boolean>>;
    documentos: IDocumento[];
}
