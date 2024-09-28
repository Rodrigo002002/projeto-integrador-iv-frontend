import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import React, { useEffect, useState } from 'react';
import { defaultData } from './helpers';
import { IProfessorForm } from '@/types/IProfessor';
import { IPagamentoForm } from '@/types/IPagamento';
import { getPlanosData } from '@/Datas/planosData';
import { FormProvider } from '@/providers/FormProvider';
import { FormikProps } from 'formik';
import FormInput from '@/components/Form/FormInput';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import { getPagamentosData } from '@/Datas/pagamentosData';

const PagamentoManter = () => {
    const { idAluno, idPagamento } = useParams<{ idAluno: string, idPagamento: string }>();

    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('student'),
            icon: 'FaRegAddressBook',
            uri: `/aluno/editar/${idAluno}`
        },
        {
            label: t('plan')
        },
        {
            label: idPagamento ? t('edit') : t('create')
        }
    ];

    // Form
    const [genericError, setGenericError] = useState<string | null>(null);
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<IPagamentoForm>(defaultData);


    useEffect(() => {
        if (idPagamento) {
            setInitialValues(getPagamentosData()[0]);
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
                <FormProvider initialValues={initialValues} onSubmit={onSubmit}>
                    {(formikProps: FormikProps<any>) => (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormInput
                                    name="dataPagamento"
                                    label={t('date.payment')}
                                    required={true}
                                    placeholder={t('date.payment')}
                                />

                                <FormInput
                                    name="dataPrazo"
                                    label={t('date.deadline')}
                                    required={true}
                                    placeholder={t('date.deadline')}
                                />

                                <FormInput
                                    name="valor"
                                    label={t('value')}
                                    required={true}
                                    placeholder={t('value')}
                                />

                                <FormInput
                                    name="planoId"
                                    label={t('plan')}
                                    required={true}
                                    placeholder={t('plan')}
                                />

                                <FormInput
                                    name="servicoId"
                                    label={t('service')}
                                    required={true}
                                    placeholder={t('service')}
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
                                    {t('button.include')}
                                </button>
                            </div>
                        </>
                    )}
                </FormProvider></div>
        </div>
    );
};

export default PagamentoManter;
