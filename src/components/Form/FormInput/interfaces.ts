export interface IFormInputProps {
    name: string,
    placeholder: string,
    required?: boolean,
    info?: string,
    disabled?: boolean,
    label: string,
    type?: string,
    onKeyUp?: (value: string | null) => void,
}
