import { DataTableColumn } from 'mantine-datatable';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import BasicDataTable from '@/components/DataTable/BasicDataTable';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IProfessorResponse } from '@/types/IProfessor';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';
import ActionMenu from '@/components/DataTable/ActionMenu';
import { Menu } from '@mantine/core';
import { Link } from 'react-router-dom';
import DocumentosModal from '@/components/Modals/Documentos';
import { IDocumento } from '@/types/IDocumento';
import { IServico } from '@/types/IServico';
import ServicosModal from '@/components/Modals/Servicos';
import { getProfessoresData } from '@/Datas/professoresData';

const ProfessorConsultar = () => {
    const { t } = useTranslation();
    const [refresh, setRefresh] = useState<boolean>(false);

    const pageRoute = 'professor';
    const apiRoute = '/professor';

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('teacher'),
            icon: 'FaPerson'
        },
        {
            label: t('consult')
        }
    ];

    // DataTable
    const data: IProfessorResponse[] = getProfessoresData();

    const columns: DataTableColumn<any>[] = [
        {
            accessor: 'id',
            title: 'Id'
        },
        {
            accessor: 'nome',
            title: 'Nome'
        },
        {
            accessor: 'telefone',
            title: 'Telefone'
        },
        {
            accessor: 'email',
            title: 'Email'
        },
        {
            accessor: 'rg',
            title: 'RG'
        },
        {
            accessor: 'cpf',
            title: 'CPF'
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
                                    leftSection={<DynamicIcons name={'MdDesignServices'} />}
                                    onClick={() => {
                                        openModalServicos(i.servicos);
                                    }}
                                    style={{
                                        padding: '4px 8px',
                                        fontSize: '14px'
                                    }}
                                >
                                    {t('services')}
                                </Menu.Item>

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
                        )}></ActionMenu>
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

    // Servicos Modal
    const [currentServicos, setCurrentServicos] = useState<IServico[]>([]);

    const [isServicoModal, setIsServicoModal] = useState<boolean>(false);

    const openModalServicos = (servicos: IServico[]) => {

        setCurrentServicos(servicos);

        setIsServicoModal(true);
    };

    return (
        <div>
            <BreadCrumbs
                items={breadCrumbsItems}
            />

            <div className="panel">
                <div className="text-2xl mb-4">
                    <b>{t('teacher')}</b>
                </div>
                <div className="flex justify-end mb-5">
                    <Link
                        className="btn btn-primary"
                        to={`/professor/cadastrar`}>
                        {t('button.create')}
                    </Link>
                </div>

                <BasicDataTable
                    columns={columns}
                    data={data}
                />
            </div>

            <DocumentosModal
                title={t('teacher')}
                isDocumentoModal={isDocumentoModal}
                documentos={currentDocumentos}
                setIsDocumentoModal={setIsDocumentoModal}
            />

            <ServicosModal
                isServicoModal={isServicoModal}
                servicos={currentServicos}
                setIsServicoModal={setIsServicoModal}
            />
        </div>
    );
};

export default ProfessorConsultar;
