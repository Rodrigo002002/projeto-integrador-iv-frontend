import { useTranslation } from 'react-i18next';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import React, { useState } from 'react';
import { DataTableColumn } from 'mantine-datatable';
import BasicDataTable from '@/components/DataTable/BasicDataTable';
import { getTurmasData } from '@/Datas/turmasData';
import { Link, useParams } from 'react-router-dom';
import SimpleModal from '@/components/Modals/SimpleModal';
import FormInput from '@/components/Form/FormInput';
import { FormProvider } from '@/providers/FormProvider';
import { FormikProps } from 'formik';
import { IAluno } from '@/types/IAluno';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';

const TurmaAlunos = () => {
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
            label: t('students')
        }
    ];

    const columns: DataTableColumn<any>[] = [
        {
            accessor: 'id',
            title: 'Id'
        },
        {
            accessor: 'nome',
            title: t('name')
        },
        {
            accessor: 'telefone',
            title: t('telefone')
        },
        {
            accessor: 'email',
            title: t('email')
        },
        {
            accessor: 'rg',
            title: t('rg')
        },
        {
            accessor: 'cpf',
            title: t('cpf')
        }
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialValues, setInitialValues] = useState<IAluno[]>();

    const [genericError, setGenericError] = useState<string | null>(null);
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);

    const onSubmit = () => {

    }

    return (
        <div>
            <BreadCrumbs
                items={breadCrumbsItems}
            />

            <div className="panel mt-5">
                <div className="text-2xl mb-4">
                    <b>{t('class')}</b>
                </div>
                <div className="flex justify-end mb-5">
                    <button
                        className="btn btn-primary"
                        onClick={() => setIsModalOpen(true)}
                    >
                        {t('button.include')}
                    </button>
                </div>

                <div className="datatables">
                    <BasicDataTable
                        columns={columns}
                        data={getTurmasData()[0].alunos}
                    />
                </div>
            </div>

            <SimpleModal
                title={t('student')}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}>
                <FormProvider initialValues={initialValues} onSubmit={onSubmit}>
                    {(formikProps: FormikProps<any>) => (
                        <>
                            <FormInput
                                name="alunos"
                                label={t('student')}
                                required={true}
                                placeholder={t('students')}
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
}

export default TurmaAlunos;
