export interface IFormInputRgProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    info?: string;
    required?: boolean;
    onKeyUp?: (value: number | null, originalValue: string | null) => void;
}
