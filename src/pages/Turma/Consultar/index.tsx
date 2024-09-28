import { useTranslation } from 'react-i18next';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import React, { useState } from 'react';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import { Link } from 'react-router-dom';
import BasicDataTable from '@/components/DataTable/BasicDataTable';
import { DataTableColumn } from 'mantine-datatable';
import ActionMenu from '@/components/DataTable/ActionMenu';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';
import { IAula } from '@/types/IAula';
import { IAluno } from '@/types/IAluno';
import AulasModal from '@/components/Modals/Aulas';
import AlunosModal from '@/components/Modals/Alunos';
import { getTurmasData } from '@/Datas/turmasData';

const TurmaConsultar = () => {
    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('class'),
            icon: "FaPeopleGroup"
        },
        {
            label: t('consult')
        }
    ];

    const pageRoute = 'turma';
    const apiRoute = '/turmas';

    const [refresh, setRefresh] = useState<boolean>(false);

    // Modals
    const [isOpenAulaModal, setOpenAulaModal] = useState<boolean>(false);
    const [isOpenAlunosModal, setOpenAlunosModal] = useState<boolean>(false);

    const [currentAlunos, setCurrentAlunos] = useState<IAluno[]>([]);
    const [currentAulas, setCurrentAulas] = useState<IAula[]>([]);

    // const openAulasModal = (aulas: IAula[]) => {
    //     setOpenAulaModal(true)
    //     setCurrentAulas(aulas);
    // }
    //
    // const openAlunosModal = (alunos: IAluno[]) => {
    //     setOpenAlunosModal(true)
    //     setCurrentAlunos(alunos);
    // }
    // DataTable
    const columns: DataTableColumn<any>[] = [
        {
            accessor: 'id',
            title: 'Id'
        },
        {
            accessor: 'modalidade.nome',
            title: t('modality')
        },
        {
            accessor: 'professor.nome',
            title: t('teacher')
        },
        {
            accessor: 'periodo',
            title: t('period')
        },
        {
            accessor: 'alunos',
            title: t('students'),
            textAlign: 'center',
            width: '15%',
            render: (item: any) => (
                <Link
                    className="flex justify-center text-primary hover:text-black"
                    to={`/turma/${item.id}/alunos`}
                >
                    <DynamicIcons name="FaRegAddressBook" />
                </Link>
            )
        },
        {
            accessor: 'aulas',
            title: t('classes'),
            textAlign: 'center',
            width: '15%',
            render: (item: any) => (
                <Link
                    className="flex justify-center text-primary hover:text-black"
                    to={`/turma/${item.id}/aulas`}
                >
                    <DynamicIcons name="FaBook" />
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
    ]
    return (
        <div>
            <BreadCrumbs
                items={breadCrumbsItems}
            />

            <div className="panel">
                <div className="text-2xl mb-4">
                    <b>{t('class')}</b>
                </div>
                <div className="flex justify-end mb-5">
                    <Link
                        className="btn btn-primary"
                        to={`/turma/cadastrar`}
                    >
                        {t('button.create')}
                    </Link>
                </div>

                <BasicDataTable
                    columns={columns}
                    data={getTurmasData()}
                />
            </div>

            <AulasModal
                isAulasModal={isOpenAulaModal}
                setIsAulasModal={setOpenAulaModal}
                aulas={currentAulas}
            />

            <AlunosModal
                isAlunosModal={isOpenAlunosModal}
                setIsAlunosModal={setOpenAlunosModal}
                alunos={currentAlunos}
            />
        </div>
    );
}

export default TurmaConsultar;
