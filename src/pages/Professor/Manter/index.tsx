import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import React, { useEffect, useState } from 'react';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import { useTranslation } from 'react-i18next';
import { FormProvider } from '@/providers/FormProvider';
import { FormikProps } from 'formik';
import { IProfessorForm } from '@/types/IProfessor';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';
import FormInput from '@/components/Form/FormInput';
import FormInputRg from '@/components/Form/FormInputRg';
import FormInputCpf from '@/components/Form/FormInputCpf';
import FormInputFile from '@/components/Form/FormInputFile';
import { useParams } from 'react-router-dom';
import professoresData from '@/Datas/professores.json';
import CoreLoader from '@/components/Loader';

const ProfessorManter = () => {
    const { id } = useParams<{ id: string }>();

    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('teacher'),
            uri: '/professor/consultar'
        },
        {
            label: id ? t('edit') : t('create')
        }
    ];

    // Form
    const formInitialValues: IProfessorForm = {
        nome: null,
        role: null,
        telefone: null,
        email: null,
        rg: null,
        cpf: null,
        documentos: null,
        servicos: null
    };

    const [genericError, setGenericError] = useState<string | null>(null);
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState(formInitialValues);

    useEffect(() => {
        if (id) {
            setInitialValues(professoresData[0]);
        }
    }, []);

    const onSubmit = (values: IProfessorForm) => {

    };

    return (
        <div>
            <BreadCrumbs
                items={breadCrumbsItems}
            />

            <div className="panel mt-5">
                <CoreLoader id={'professores'}>
                    <FormProvider initialValues={initialValues} onSubmit={onSubmit}>
                        {(formikProps: FormikProps<any>) => (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormInput
                                        name="nome"
                                        label={t('name')}
                                        required={true}
                                        placeholder={t('name')}
                                    />

                                    <FormInput
                                        name="telefone"
                                        label={t('phone')}
                                        required={true}
                                        placeholder={t('phone')}
                                    />

                                    <FormInput
                                        name="email"
                                        label={t('email')}
                                        required={true}
                                        placeholder={t('email')}
                                    />

                                    <FormInputRg
                                        name="rg"
                                        label={t('RG')}
                                        required={true}
                                        placeholder={t('RG')}
                                    />

                                    <FormInputCpf
                                        name="cpf"
                                        label={t('CPF')}
                                        required={true}
                                        placeholder={t('CPF')}
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <FormInputFile
                                        name="documentosIds"
                                        label={t('documents')}
                                        required={true}
                                        multiple={true}
                                    />
                                </div>

                                {genericError && (
                                    <div
                                        className="flex items-center p-3.5 rounded text-warning bg-warning-light dark:bg-warning-dark-light">
                                        <span className="ltr:pr-2 rtl:pl-2">
                                            <strong className="ltr:mr-1 rtl:ml-1">{t('errorProcessing')}!</strong>
                                            {genericError}
                                        </span>
                                    </div>
                                )}

                                <div className="flex w-full justify-end">
                                    <button type="submit" className="btn btn-primary !mt-6" disabled={loadingBtn}>
                                        <DynamicIcons name="IoSave" className="mr-2 w-4 h-5" />
                                        {t('button.save')}
                                    </button>
                                </div>
                            </>
                        )}
                    </FormProvider>
                </CoreLoader>
            </div>
        </div>
    );
};

export default ProfessorManter;
