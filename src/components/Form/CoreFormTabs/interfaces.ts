import { ReactNode } from 'react';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import { ISimpleTabsProps } from '@/components/SimpleTabs/interfaces';

export interface ICoreFormTab {
    name: string;
    icon: string;
    visible?: boolean;
    content: (formikProps: FormikProps<any>, tabIndex: number) => ReactNode;
}

export interface ICoreFormTabsProps {
    tabs: ICoreFormTab[];
    nonFormTabs?: ISimpleTabsProps[];
    initialValues: any;
    validationSchema?: Yup.ObjectSchema<any>;
    onSubmit: (values: any, formikHelpers: any) => void;
    formikProps?: FormikProps<any>;
    genericError?: string | null;
}
