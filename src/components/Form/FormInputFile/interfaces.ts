export interface IFormInputFileProps {
    name: string;
    label: string;
    disabled?: boolean;
    info?: string;
    required?: boolean;
    accept?: string[];
    multiple?: boolean;
    onDrop?: (files: File[]) => void;
}
