import { useTranslation } from 'react-i18next';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { defaultData } from './helpers';
import { getPlanosData } from '@/Datas/planosData';
import { IPlanoForm } from '@/types/IPlano';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import CoreLoader from '@/components/Loader';
import CoreFormTabs from '@/components/Form/CoreFormTabs';
import { ICoreFormTab } from '@/components/Form/CoreFormTabs/interfaces';
import FormInput from '@/components/Form/FormInput';
import BasicDataTable from '@/components/DataTable/BasicDataTable';
import { DataTableColumn } from 'mantine-datatable';

const PlanoManter = () => {
    const { id } = useParams<{ id: string }>();

    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('plan'),
            icon: 'CiMoneyCheck1',
            uri: '/plano/consultar'
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
    const [initialValues, setInitialValues] = useState<IPlanoForm>(defaultData);


    useEffect(() => {
        if (id) {
            setInitialValues(getPlanosData()[0]);
        }
    }, []);

    const onSubmit = (values: IPlanoForm) => {

    };

    const tabs: ICoreFormTab[] = [
        {
            name: t('plan'),
            icon: 'CiMoneyCheck1',
            content: () => (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormInput
                            name="nome"
                            label={t('name')}
                            required={true}
                            placeholder={t('name')}
                        />

                        <FormInput
                            name="tipo"
                            label={t('type')}
                            required={true}
                            placeholder={t('type')}
                        />

                        <FormInput
                            name="beneficios"
                            label={t('benefits')}
                            required={true}
                            placeholder={t('benefits')}
                        />

                        <FormInput
                            name="preco"
                            label={t('price')}
                            required={true}
                            placeholder={t('price')}
                        />

                        <FormInput
                            name="modalidades"
                            label={t('modality')}
                            required={true}
                            placeholder={t('modality')}
                        />
                    </div>
                </>
            )
        }
    ]

    return (
        <div>
            <BreadCrumbs
                items={breadCrumbsItems}
            />

            <div className="panel">
                <div className="text-2xl mb-4">
                    <b>{t('plan')}</b>
                </div>

                <CoreLoader id={'planos'}>
                    <CoreFormTabs
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        tabs={tabs}
                    />
                </CoreLoader>
            </div>
        </div>
    );
};

export default PlanoManter;
