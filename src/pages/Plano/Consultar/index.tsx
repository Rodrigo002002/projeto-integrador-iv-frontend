import { useTranslation } from 'react-i18next';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import React, { useState } from 'react';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import BasicDataTable from '@/components/DataTable/BasicDataTable';
import { getPlanosData } from '@/Datas/planosData';
import { DataTableColumn } from 'mantine-datatable';
import ActionMenu from '@/components/DataTable/ActionMenu';
import { Link } from 'react-router-dom';

const PlanoConsultar = () => {
    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('plan'),
            icon: 'CiMoneyCheck1'
        },
        {
            label: t('consult')
        }
    ];

    const pageRoute = 'plano';
    const apiRoute = '/planos';

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
            accessor: 'tipo',
            title: t('type')
        },
        {
            accessor: 'beneficios',
            title: t('benefits'),
            render: (i: any) => (
                i.beneficios.map(beneficio => (
                    <div>
                        <span className="mr-4">{beneficio}</span><br/>
                    </div>
                ))
            )
        },
        {
            accessor: 'preco',
            title: t('price')
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
                        customButtons={(plano) => (
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
                    <b>{t('plan')}</b>
                </div>

                <div className="flex justify-end mb-5">
                    <Link
                        className="btn btn-primary"
                        to={`/plano/cadastrar`}>
                        {t('button.create')}
                    </Link>
                </div>

                <div className="datatables">

                    <BasicDataTable
                        columns={columns}
                        data={getPlanosData()}
                    />
                </div>
            </div>
        </div>
    );
};

export default PlanoConsultar;
