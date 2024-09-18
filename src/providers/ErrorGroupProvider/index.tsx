import React, { createContext, useContext, useState } from 'react';
import { IErrorGroupContextProps, IErrorGroupProviderProps } from '@/providers/ErrorGroupProvider/interfaces';

const ErrorGroupContext = createContext<IErrorGroupContextProps | undefined>(undefined);

export const useErrorGroup = (): IErrorGroupContextProps | undefined => {
    return useContext(ErrorGroupContext);
};

export const ErrorGroupProvider: React.FC<IErrorGroupProviderProps> = ({
                                                                           children
                                                                       }) => {

    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [hasError, setHasError] = useState<boolean>(false);

    const setFieldErrorState = (fieldName: string, errorState: boolean) => {
        setErrors((prevErrors) => {
            const newErrors = {
                ...prevErrors,
                ...{ [fieldName]: errorState }
            };

            setHasError(Object.values(newErrors).some((error) => error));

            return newErrors;
        });
    };

    return (
        <ErrorGroupContext.Provider value={{ errors, hasError, setFieldErrorState }}>
            {children(hasError)}
        </ErrorGroupContext.Provider>
    );
};
