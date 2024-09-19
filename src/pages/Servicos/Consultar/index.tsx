import React, { useState } from 'react';
import { DataTableColumn } from 'mantine-datatable';
import ActionMenu from '@/components/DataTable/ActionMenu';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BasicDataTable from '@/components/DataTable/BasicDataTable';
import professoresData from '@/Datas/professores.json';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';

const ServicoConsultar = () => {
    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('services')
        },
        {
            label: t('consult')
        }
    ];

    const pageRoute = 'servico';
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
            title: 'Tipo'
        },
        {
            accessor: 'pagamento.pago',
            title: 'Pago',
            render: (pago: boolean) => (
                <div>
                    <span>{pago ? t('yes') : t('no')}</span>
                </div>
            )
        },
        {
            accessor: 'professor.nome',
            title: 'Professor'
        },
        {
            accessor: 'aluno.nome',
            title: 'Aluno'
        },
        {
            accessor: 'professor.servico',
            title: 'Ação',
            render: (item: any) => (
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
            )
        }
    ];
    return (
        <div>
            <BreadCrumbs
                items={breadCrumbsItems}
            />

            <div className="panel">
                <div className="flex justify-end mb-5">
                    <Link
                        className="btn btn-primary"
                        to={`/servico/cadastrar`}
                    >
                        {t('button.create')}
                    </Link>
                </div>

                <BasicDataTable
                    columns={columns}
                    data={professoresData[0].servicos}
                />
            </div>
        </div>
    );
};

export default ServicoConsultar;
