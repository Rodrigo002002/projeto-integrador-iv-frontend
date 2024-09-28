import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import { useTranslation } from 'react-i18next';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import React, { useState } from 'react';
import { DataTableColumn } from 'mantine-datatable';
import { Link } from 'react-router-dom';
import BasicDataTable from '@/components/DataTable/BasicDataTable';
import { getEventosData } from '@/Datas/eventosData';
import { IEvento } from '@/types/IEvento';
import ActionMenu from '@/components/DataTable/ActionMenu';

const EventoConsultar = () => {
    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('event'),
            icon: 'CiTrophy'
        },
        {
            label: t('consult')
        }
    ];

    // DataTable
    const data: IEvento[] = getEventosData();

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
            accessor: 'data',
            title: t('date.date')
        },
        {
            accessor: 'equipes.id',
            title: t('teams')
        },
        {
            accessor: 'modalidade.nome',
            title: t('modality')
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
                        onRefresh={() => setRefresh(true)}>

                    </ActionMenu>
                </div>
            )
        }
    ]

    const pageRoute = 'evento';
    const apiRoute = '/evento';

    const [refresh, setRefresh] = useState<boolean>(false);

    return (
        <div>
            <BreadCrumbs
                items={breadCrumbsItems}
            />

            <div className="panel mt-5">
                <div className="text-2xl mb-4">
                    <b>{t('event')}</b>
                </div>

                <div className="flex justify-end mb-5">
                    <Link
                        className="btn btn-primary"
                        to={`/evento/cadastrar`}>
                        {t('button.create')}
                    </Link>
                </div>

                <BasicDataTable
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    );
}

export default EventoConsultar;
