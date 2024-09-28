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
import { Link, useParams } from 'react-router-dom';
import CoreLoader from '@/components/Loader';
import { getProfessoresData } from '@/Datas/professoresData';
import { defaultData } from './helpers';
import SimpleTabs from '@/components/SimpleTabs';
import { ICoreFormTab } from '@/components/Form/CoreFormTabs/interfaces';
import CoreFormTabs from '@/components/Form/CoreFormTabs';
import BasicDataTable from '@/components/DataTable/BasicDataTable';
import { DataTableColumn } from 'mantine-datatable';
import SimpleModal from '@/components/Modals/SimpleModal';
import ActionMenu from '@/components/DataTable/ActionMenu';
import { Menu } from '@mantine/core';
import { id } from 'date-fns/locale';

const ProfessorManter = () => {
    const { id } = useParams<{ id: string }>();

    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('teacher'),
            uri: '/professor/consultar',
            icon: 'FaPerson'
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
            setInitialValues(getProfessoresData()[0]);
        }
    }, []);

    // Form
    const [genericError, setGenericError] = useState<string | null>(null);
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<IProfessorForm>(defaultData);

    const onSubmit = (values: IProfessorForm) => {

    };

    // DataTable
    const pageRoute = 'servico';
    const apiRoute = '/servicos';

    const [refresh, setRefresh] = useState<boolean>(false);

    const columns: DataTableColumn<any>[] = [
        {
            accessor: "id",
            title: "Id"
        },
        {
            accessor: "tipoServico.tipo",
            title: t('type'),
        },
        {
            accessor: 'pagamento.pago',
            title: t('paid'),
            textAlign: 'center',
            render: (pago) => (
                <span className={pago.pagamento.pago ? "flex justify-center text-success" : "flex justify-center text-danger"}>{pago.pagamento.pago ? t('yes') : t('no')}</span>
            )
        },
        {
            accessor: "professor.nome",
            title: t('teacher'),
        },
        {
            accessor: "aluno.nome",
            title: t('student'),
        },
        {
            accessor: '#',
            title: t('action'),
            width: '10%',
            textAlign: 'center',
            render: (item: any) => (
                <div className="flex justify-center">
                    <ActionMenu
                        item={item}
                        apiRoute={apiRoute}
                        pageRoute={pageRoute}
                        hideEnable={true}
                        hideEdit={true}
                        onRefresh={() => setRefresh(true)}
                        customButtons={(i) => (
                            <div>
                                <Menu.Item
                                    leftSection={<DynamicIcons name={'LuPencilLine'} />}
                                    component={Link}
                                    to={`/servico/editar/${id}/${item.id}`}
                                    style={{
                                        padding: '4px 8px',
                                        fontSize: '14px'
                                    }}
                                >
                                    {t('button.edit')}
                                </Menu.Item>
                            </div>
                        )}>

                    </ActionMenu>
                </div>
            )
        }
    ]

    // Tabs
    const tabs: ICoreFormTab[] = [
        {
            name: t('teacher'),
            icon: 'FaPerson',
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

                    <div className="grid grid-cols-1 gap-4 mt-4">
                        <FormInputFile
                            name="documentosIds"
                            label={t('documents')}
                            required={true}
                            multiple={true}
                        />
                    </div>
                </>
            )
        },
        {
            name: t('service'),
            icon: 'MdDesignServices',
            visible: !!id,
            content: () => (
                <>
                    <div className="flex justify-end mb-5">
                        <button
                            className="btn btn-primary"
                            type={'button'}
                            onClick={() => setIsModalOpen(true)}
                        >
                            {t('button.include')}
                        </button>
                    </div>

                    <div className="datatables">
                        <BasicDataTable
                            columns={columns}
                            data={initialValues.servicos ? initialValues.servicos : []}
                        />
                    </div>
                </>
            )
        }
    ]

    // Modal

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <BreadCrumbs
                items={breadCrumbsItems}
            />

            <div className="panel mt-5">
                <CoreLoader id={'professores'}>
                    <CoreFormTabs
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        tabs={tabs}
                    />
                </CoreLoader>
            </div>

            <SimpleModal
                title={t('service')}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}>
                <FormProvider initialValues={initialValues} onSubmit={onSubmit}>
                    {(formikProps: FormikProps<any>) => (
                        <>
                            <FormInput
                                name="servicos"
                                label={t('service')}
                                required={true}
                                placeholder={t('services')}
                            />

                            <FormInput
                                name="alunos"
                                label={t('student')}
                                required={true}
                                placeholder={t('student')}
                            />

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
            </SimpleModal>
        </div>
    );
};

export default ProfessorManter;
