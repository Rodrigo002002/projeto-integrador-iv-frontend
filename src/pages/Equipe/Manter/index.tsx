import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import React, { useEffect, useState } from 'react';
import { getEquipesData } from '@/Datas/equipesData';
import { defaultData } from './helpers';
import { IEquipeForm } from '@/types/IEquipe';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import { FormikProps } from 'formik';
import { FormProvider } from '@/providers/FormProvider';
import { IAlunoForm } from '@/types/IAluno';
import FormInput from '@/components/Form/FormInput';

const EquipeManter = () => {
    const { id } = useParams<{ id: string }>();

    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('team'),
            uri: '/equipe/consultar',
            icon: 'FaArrowsDownToPeople'
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
            setInitialValues(getEquipesData()[0]);
        }
    }, []);

    // Form
    const [genericError, setGenericError] = useState<string | null>(null);
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<IEquipeForm>(defaultData);

    const onSubmit = (values: IAlunoForm) => {

    };

    return (
        <div>
            <BreadCrumbs
                items={breadCrumbsItems}
            />

            <div className="panel mt-5">
                <div className="text-2xl mb-5">
                    <span><b>{t('team')}</b></span>
                </div>

                <FormProvider initialValues={initialValues} onSubmit={onSubmit}>
                    {(formikProps: FormikProps<any>) => (
                        <>
                            <div className="grid col-span-1 sm:grid-cols-2 gap-4">
                                <FormInput
                                    name="nome"
                                    label={t('name')}
                                    required={true}
                                    placeholder={t('name')}
                                />
                            </div>
                        </>
                    )}
                </FormProvider>
            </div>
        </div>
    );
};

export default EquipeManter;
