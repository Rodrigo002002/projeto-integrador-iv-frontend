import React, { useState } from 'react';
import { DataTableColumn } from 'mantine-datatable';
import ActionMenu from '@/components/DataTable/ActionMenu';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BasicDataTable from '@/components/DataTable/BasicDataTable';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import { getServicosData, getTiposServico } from '@/Datas/servicosData';

const ServicoConsultar = () => {
    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('services'),
            icon: 'MdDesignServices'
        },
        {
            label: t('consult')
        }
    ];

    const pageRoute = 'servico/tipo';
    const apiRoute = '/servicos';

    const [refresh, setRefresh] = useState<boolean>(false);

    // Data Table
    const columns: DataTableColumn<any>[] = [
        {
            accessor: 'id',
            title: 'Id'
        },
        {
            accessor: 'tipo',
            title: t('type')
        },
        {
            accessor: 'preco',
            title: t('price'),
            render: (servico: any) => (
                <span>{`R$ ${servico.preco}`}</span>
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
                        onRefresh={() => setRefresh(true)}
                        customButtons={(servico) => (
                            <div>
                            </div>
                        )}></ActionMenu>
                </div>
            )
        }
    ];
    return (
        <div>
            <BreadCrumbs
                    items={breadCrumbsItems}
                />

            <div className="panel">
                <div className="text-2xl mb-4">
                    <b>{t('service')}</b>
                </div>
                <div className="flex justify-end mb-5">
                    <Link
                        className="btn btn-primary"
                        to={`/servico/tipo/cadastrar`}
                    >
                        {t('button.create')}
                    </Link>
                </div>

                <BasicDataTable
                    columns={columns}
                    data={getTiposServico()}
                />
            </div>
        </div>
    );
};

export default ServicoConsultar;
