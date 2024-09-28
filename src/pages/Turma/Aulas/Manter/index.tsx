import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { IAulaForm } from '@/types/IAula';
import { defaultValues } from '@/pages/Turma/Aulas/Manter/interfaces';
import CoreLoader from '@/components/Loader';
import { FormProvider } from '@/providers/FormProvider';
import { FormikProps } from 'formik';
import FormInput from '@/components/Form/FormInput';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';
import { useTranslation } from 'react-i18next';
import { IProfessorForm } from '@/types/IProfessor';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import { getTurmasData } from '@/Datas/turmasData';

const ManterAula = () => {
    const { turmaId, aulaId } = useParams<{ turmaId: string, aulaId: string }>();

    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('class'),
            uri: `/turma/consultar`,
            icon: 'FaPeopleGroup'
        },
        {
            label: t('clasS'),
            uri: `/turma/${turmaId}/aulas`,
        },
        {
            label: aulaId ? t('edit') : t('create')
        }
    ];
    const [initialValues, setInitialValues] = useState<IAulaForm>(defaultValues);

    const [genericError, setGenericError] = useState<string | null>(null);
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);

    useEffect(() => {
        if (aulaId) {
            setInitialValues(getTurmasData()[0].aulas[0]);
            return;
        }
    }, [aulaId]);

    useEffect(() => {

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
                    <b>{t('class')}</b>
                </div>
                <CoreLoader id={'aulas'}>
                    <FormProvider initialValues={initialValues} onSubmit={onSubmit}>
                        {(formikProps: FormikProps<any>) => (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormInput
                                        name="data"
                                        label={t('date.date')}
                                        required={true}
                                        placeholder={t('date.date')}
                                    />

                                    {aulaId && (
                                        <FormInput
                                            name="alunosPresentes"
                                            label={t('presentStudents')}
                                            required={true}
                                            placeholder={t('presentStudents')}
                                        />
                                    )}
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

export default ManterAula;
