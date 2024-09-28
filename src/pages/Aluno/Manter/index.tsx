import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import CoreLoader from '@/components/Loader';
import CoreFormTabs from '@/components/Form/CoreFormTabs';
import React, { useEffect, useState } from 'react';
import { ICoreFormTab } from '@/components/Form/CoreFormTabs/interfaces';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAlunosData } from '@/Datas/alunosData';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import FormInputFile from '@/components/Form/FormInputFile';
import FormInput from '@/components/Form/FormInput';
import FormInputRg from '@/components/Form/FormInputRg';
import FormInputCpf from '@/components/Form/FormInputCpf';
import BasicDataTable from '@/components/DataTable/BasicDataTable';
import { IAlunoForm } from '@/types/IAluno';
import { defaultData } from '@/pages/Aluno/Manter/helpers';
import { DataTableColumn } from 'mantine-datatable';
import ActionMenu from '@/components/DataTable/ActionMenu';
import { Menu } from '@mantine/core';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';
import SimpleModal from '@/components/Modals/SimpleModal';
import { FormProvider } from '@/providers/FormProvider';
import { FormikProps } from 'formik';

const AlunoManter = () => {
    const { id } = useParams<{ id: string }>();

    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('student'),
            uri: '/aluno/consultar',
            icon: 'FaRegAddressBook'
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
            setInitialValues(getAlunosData()[0]);
        }
    }, []);

    // DataTable
    const pageRoute = 'pagamento';
    const apiRoute = '/pagamentos';

    const [refresh, setRefresh] = useState<boolean>(false);

    const columns: DataTableColumn<any>[] = [
        {
            accessor: 'id',
            title: 'Id'
        },
        {
            accessor: 'dataPagamento',
            title: t('date.payment')
        },
        {
            accessor: 'dataPrazo',
            title: t('date.deadline')
        },
        {
            accessor: 'valor',
            title: t('value'),
            render: (i) => (
                <span>{`R$ ${i.valor}`}</span>
            )
        },
        {
            accessor: 'planoId',
            title: t('type'),
            render: (planoId) => (
                <span>{planoId.planoId ? t('plan') : t('service')}</span>
            )
        },
        {
            accessor: 'pago',
            title: t('paid'),
            textAlign: 'center',
            render: (pago) => (
                <span
                    className={pago.pago ? 'flex justify-center text-success' : 'flex justify-center text-danger'}>{pago.pago ? t('yes') : t('no')}</span>
            )
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
                                    to={`/pagamento/editar/${id}/${item.id}`}
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
    ];

    // Tabs
    const tabs: ICoreFormTab[] = [
        {
            name: t('student'),
            icon: 'FaRegAddressBook',
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

                        <FormInputCpf
                            name="turma"
                            label={t('class')}
                            required={true}
                            placeholder={t('class')}
                        />

                        <FormInputCpf
                            name="plano.nome"
                            label={t('pan')}
                            required={true}
                            placeholder={t('pan')}
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
            name: t('payment'),
            icon: 'MdAttachMoney',
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
                            data={initialValues.pagamentos ? initialValues.pagamentos : []}
                        />
                    </div>
                </>
            )
        }
    ];

    // Modal

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form
    const [genericError, setGenericError] = useState<string | null>(null);
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<IAlunoForm>(defaultData);

    const onSubmit = (values: IAlunoForm) => {

    };

    return (
        <div>
            <BreadCrumbs
                items={breadCrumbsItems}
            />

            <div className="panel mt-5">
                <CoreLoader id={'alunos'}>
                    <CoreFormTabs
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        tabs={tabs}
                    />
                </CoreLoader>
            </div>

            <SimpleModal
                title={t('payment')}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}>
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
                </FormProvider>
            </SimpleModal>
        </div>
    );
};

export default AlunoManter;
