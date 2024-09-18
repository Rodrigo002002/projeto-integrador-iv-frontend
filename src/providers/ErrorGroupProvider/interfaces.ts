export interface IErrorGroupContextProps {
    errors: Record<string, boolean>;
    hasError: boolean;
    setFieldErrorState: (fieldName: string, errorState: boolean) => void;
}

export interface IErrorGroupProviderProps {
    children: Function;
}
