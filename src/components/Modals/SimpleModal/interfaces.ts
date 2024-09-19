import { ReactNode } from 'react';

export interface ISimpleModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    afterLeave?: () => void;
}
