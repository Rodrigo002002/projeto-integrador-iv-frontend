import { useTranslation } from 'react-i18next';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProfessorForm } from '@/types/IProfessor';
import { defaultData } from '@/pages/Professor/Manter/helpers';
import { FormikProps } from 'formik';
import { FormProvider } from '@/providers/FormProvider';
import FormInput from '@/components/Form/FormInput';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';
import { getProfessoresData } from '@/Datas/professoresData';
import { getTurmasData } from '@/Datas/turmasData';

const TurmaManter = () => {
    const { id } = useParams<{ id: string }>();

    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('class'),
            icon: "FaPeopleGroup",
            uri: '/turma/consultar',
        },
        {
            label: t('consult')
        },
        {
            label: id ? t('edit') : t('create')
        }
    ];

    useEffect(() => {
        if (id) {
            setInitialValues(getTurmasData()[0]);
        }
    }, []);

    const onSubmit = () => {

    }

    const [genericError, setGenericError] = useState<string | null>(null);
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<IProfessorForm>(defaultData);


    return (
        <div>
            <BreadCrumbs
                items={breadCrumbsItems}
            />

            <div className="panel mt-5">
                <div className="text-2xl mb-4">
                    <b>{t('class')}</b>
                </div>
                <FormProvider initialValues={initialValues} onSubmit={onSubmit}>
                    {(formikProps: FormikProps<any>) => (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormInput
                                    name="modalidade"
                                    label={t('modality')}
                                    required={true}
                                    placeholder={t('modality')}
                                />

                                <FormInput
                                    name="periodo"
                                    label={t('period')}
                                    required={true}
                                    placeholder={t('period')}
                                />

                                <FormInput
                                    name="professor"
                                    label={t('teacher')}
                                    required={true}
                                    placeholder={t('teacher')}
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
            </div>
        </div>
    );
}

export default TurmaManter;
