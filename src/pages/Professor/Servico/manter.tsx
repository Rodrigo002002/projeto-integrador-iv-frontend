import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import React, { useEffect, useState } from 'react';
import { IServicoForm } from '@/types/IServico';
import { IProfessorForm } from '@/types/IProfessor';
import { FormikProps } from 'formik';
import CoreLoader from '@/components/Loader';
import { FormProvider } from '@/providers/FormProvider';
import FormInput from '@/components/Form/FormInput';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';
import { defaultData } from './helpers';
import { getServicosData } from '@/Datas/servicosData';

const ServicoManter = () => {
    const { idProfessor, idServico } = useParams<{ idProfessor: string, idServico: string }>();

    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('teacher'),
            icon: "FaPerson",
            uri: `/professor/editar/${idProfessor}`,
        },
        {
            label: t('service'),
        },
        {
            label: idServico ? t('edit') : t('create')
        }
    ];

    // Form
    const [genericError, setGenericError] = useState<string | null>(null);
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<IServicoForm>(defaultData);


    useEffect(() => {
        if (idServico) {
            setInitialValues(getServicosData()[0]);
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
                <div className="text-2xl mb-4">
                    <b>{t('service')}</b>
                </div>
                <CoreLoader id={'servicos'}>
                    <FormProvider initialValues={initialValues} onSubmit={onSubmit}>
                        {(formikProps: FormikProps<any>) => (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormInput
                                        name="tipoServico.tipo"
                                        label={t('type')}
                                        required={true}
                                        placeholder={t('type')}
                                    />

                                    <FormInput
                                        name="data"
                                        label={t('date.date')}
                                        required={true}
                                        placeholder={t('date.date')}
                                    />

                                    <FormInput
                                        name="aluno.nome"
                                        label={t('student')}
                                        required={true}
                                        placeholder={t('student')}
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

export default ServicoManter;
