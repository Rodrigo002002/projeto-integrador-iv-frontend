import { FormikProps, FormikHelpers } from 'formik';
import React from 'react';
import { ObjectSchema, ObjectShape } from 'yup';

export interface FormProviderProps {
    initialValues: any;
    validationSchema?: ObjectShape | ObjectSchema<any, any, any, any>;
    onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void | Promise<any>;
    children: React.ReactNode | Function;
}

export interface FormContextProps {
    formikProps: FormikProps<any>;
    appendValidationToShape: (obj: any) => void;
}
