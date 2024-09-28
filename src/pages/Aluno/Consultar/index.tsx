import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import { Link } from 'react-router-dom';
import BasicDataTable from '@/components/DataTable/BasicDataTable';
import React, { useState } from 'react';
import { getAlunosData } from '@/Datas/alunosData';
import { useTranslation } from 'react-i18next';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import { DataTableColumn } from 'mantine-datatable';
import ActionMenu from '@/components/DataTable/ActionMenu';
import { Menu } from '@mantine/core';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';
import DocumentosModal from '@/components/Modals/Documentos';
import { IDocumento } from '@/types/IDocumento';

const AlunoConsultar = () => {
    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('students'),
            icon: 'FaRegAddressBook'
        },
        {
            label: t('consult')
        }
    ];

    const pageRoute = 'aluno';
    const apiRoute = '/alunos';

    const [refresh, setRefresh] = useState<boolean>(false);

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
            title: t('phone')
        },
        {
            accessor: 'email',
            title: t('email')
        },
        {
            accessor: 'turma.id',
            title: t('class')
        },
        {
            accessor: 'plano.nome',
            title: t('plan')
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
                        onRefresh={() => setRefresh(true)}
                        customButtons={(i) => (
                        <div>
                            <Menu.Item
                                leftSection={<DynamicIcons name={'FaRegFileAlt'} />}
                                onClick={() => {
                                    openModalDocumentos(i.documentos);
                                }}
                                style={{
                                    padding: '4px 8px',
                                    fontSize: '14px'
                                }}
                            >
                                {t('documents')}
                            </Menu.Item>
                        </div>
                    )} />
                </div>
            )
        }
    ];

    // Documentos Modal
    const [currentDocumentos, setCurrentDocumentos] = useState<IDocumento[]>([]);

    const [isDocumentoModal, setIsDocumentoModal] = useState<boolean>(false);

    const openModalDocumentos = (documentos: IDocumento[]) => {

        setCurrentDocumentos(documentos);

        setIsDocumentoModal(true);
    };
    return (
        <div>
            <BreadCrumbs
                items={breadCrumbsItems}
            />

            <div className="panel">
                <div className="text-2xl mb-4">
                    <b>{t('student')}</b>
                </div>
                <div className="flex justify-end mb-5">
                    <Link
                        className="btn btn-primary"
                        to={`/aluno/cadastrar`}
                    >
                        {t('button.create')}
                    </Link>
                </div>

                <BasicDataTable
                    columns={columns}
                    data={getAlunosData()}
                />
            </div>

            <DocumentosModal
                title={t('student')}
                isDocumentoModal={isDocumentoModal}
                documentos={currentDocumentos}
                setIsDocumentoModal={setIsDocumentoModal}
            />
        </div>
    );
};

export default AlunoConsultar;
