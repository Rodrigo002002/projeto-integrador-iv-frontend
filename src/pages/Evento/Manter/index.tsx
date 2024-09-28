import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import React, { useEffect, useState } from 'react';
import { getEventosData } from '@/Datas/eventosData';
import { defaultData } from './helpers';
import { IEventoForm } from '@/types/IEvento';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import { FormikProps } from 'formik';
import { FormProvider } from '@/providers/FormProvider';
import FormInput from '@/components/Form/FormInput';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';

const EventoManter = () => {
    const { id } = useParams<{ id: string }>();

    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('event'),
            uri: '/evento/consultar',
            icon: 'CiTrophy'
        },
        {
            label: t('consult')
        },
        {
            label: id ? t('edit') : t('create')
        }
    ];

    // Form
    const [genericError, setGenericError] = useState<string | null>(null);
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<IEventoForm>(defaultData);

    const onSubmit = (values: IEventoForm) => {

    };

    useEffect(() => {
        if (id) {
            setInitialValues(getEventosData()[0]);
        }
    }, []);

    return (
        <div>
            <BreadCrumbs
                items={breadCrumbsItems}
            />

            <div className="panel mt-5">
                <div className="text-2xl mb-4">
                    <b>{t('event')}</b>
                </div>

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
                                    name="data"
                                    label={t('date.date')}
                                    required={true}
                                    placeholder={t('date.date')}
                                />

                                <FormInput
                                    name="equipes"
                                    label={t('team')}
                                    required={true}
                                    placeholder={t('team')}
                                />

                                <FormInput
                                    name="modalidade.nome"
                                    label={t('modality')}
                                    required={true}
                                    placeholder={t('modality')}
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
                </FormProvider>
            </div>
        </div>
    );
};

export default EventoManter;
