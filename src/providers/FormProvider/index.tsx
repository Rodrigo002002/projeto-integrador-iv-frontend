import React, { createContext, useContext, useState } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { FormContextProps, FormProviderProps } from './interfaces';
import * as Yup from 'yup';

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};

export const FormProvider: React.FC<FormProviderProps> = ({
                                                              initialValues,
                                                              validationSchema,
                                                              onSubmit,
                                                              children
                                                          }) => {

    const [dynamicSchema, setDynamicSchema] = useState<Yup.ObjectShape>({});

    const appendValidationToShape = (obj: any) => {
        setDynamicSchema((prevSchema: any) => {
            return {
                ...obj,
                ...prevSchema
            };
        });
    };

    const getFinalValidationSchema = () => {
        if (Yup.isSchema(validationSchema)) {
            return validationSchema;
        }

        return Yup.object().shape(dynamicSchema);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={getFinalValidationSchema()}
            onSubmit={onSubmit}
            enableReinitialize={true}
        >
            {(formikProps: FormikProps<any>) => (
                <FormContext.Provider value={{ formikProps, appendValidationToShape }}>
                    <Form className="space-y-5">
                        {
                            typeof children === 'function'
                                ? children(formikProps)
                                : <>{children}</>
                        }
                    </Form>
                </FormContext.Provider>
            )}
        </Formik>
    );
};
