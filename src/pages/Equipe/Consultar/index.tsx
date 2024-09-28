import { useTranslation } from 'react-i18next';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BasicDataTable from '@/components/DataTable/BasicDataTable';
import { DataTableColumn } from 'mantine-datatable';
import { getEquipesData } from '@/Datas/equipesData';
import { IEquipe } from '@/types/IEquipe';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';
import AlunosModal from '@/components/Modals/Alunos';
import { IAluno } from '@/types/IAluno';
import { IAula } from '@/types/IAula';
import ActionMenu from '@/components/DataTable/ActionMenu';

const EquipeConsultar = () => {
    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('team'),
            icon: 'FaArrowsDownToPeople'
        },
        {
            label: t('consult')
        }
    ];

    // DataTable
    const data: IEquipe[] = getEquipesData();

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
            accessor: 'alunos',
            title: t('students'),
            textAlign: 'center',
            width: '15%',
            render: (item: any) => (
                <Link
                    className="flex justify-center text-primary hover:text-black"
                    to={`/equipe/${item.id}/alunos`}
                >
                    <DynamicIcons name="FaRegAddressBook" />
                </Link>
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
                        onRefresh={() => setRefresh(true)}>

                    </ActionMenu>
                </div>
            )
        }
    ];

    const pageRoute = 'equipe';
    const apiRoute = '/equipe';

    const [refresh, setRefresh] = useState<boolean>(false);

    // Modals
    const [isOpenAulaModal, setOpenAulaModal] = useState<boolean>(false);
    const [isOpenAlunosModal, setOpenAlunosModal] = useState<boolean>(false);

    const [currentAlunos, setCurrentAlunos] = useState<IAluno[]>([]);
    const [currentAulas, setCurrentAulas] = useState<IAula[]>([]);


    return (
        <div>
            <BreadCrumbs
                items={breadCrumbsItems}
            />

            <div className="panel mt-5">
                <div className="text-2xl mb-4">
                    <b>{t('team')}</b>
                </div>
                <div className="flex justify-end mb-5">
                    <Link
                        className="btn btn-primary"
                        to={`/equipe/cadastrar`}>
                        {t('button.create')}
                    </Link>
                </div>

                <BasicDataTable
                    columns={columns}
                    data={data}
                />
            </div>

            <AlunosModal
                isAlunosModal={isOpenAlunosModal}
                setIsAlunosModal={setOpenAlunosModal}
                alunos={currentAlunos}
            />
        </div>
    );
};

export default EquipeConsultar;
