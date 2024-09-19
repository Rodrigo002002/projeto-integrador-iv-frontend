import { useTranslation } from 'react-i18next';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import React, { useState } from 'react';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import { Link } from 'react-router-dom';
import BasicDataTable from '@/components/DataTable/BasicDataTable';
import turmasData from '@/Datas/turmas.json';
import { DataTableColumn } from 'mantine-datatable';
import ActionMenu from '@/components/DataTable/ActionMenu';
import { Menu } from '@mantine/core';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';
import { IAula } from '@/types/IAula';
import { IAluno } from '@/types/IAluno';
import AulasModal from '@/components/Modals/Aulas';
import AlunosModal from '@/components/Modals/Alunos';

const TurmaConsultar = () => {
    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('class')
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

    const openAulasModal = (aulas: any) => {
        var mappedAulas: IAula[] = []
        aulas.aulas.map(aula => mappedAulas.push(aula));
        setOpenAulaModal(true)
        setCurrentAulas(mappedAulas);
    }

    const openAlunosModal = (alunos: any) => {
        var mappedAlunos: IAluno[] = []
        alunos.alunos.map(aluno => mappedAlunos.push(aluno));
        setOpenAlunosModal(true)
        setCurrentAlunos(mappedAlunos);
    }
    // DataTable
    const columns: DataTableColumn<any>[] = [
        {
            accessor: 'id',
            title: 'Id'
        },
        {
            accessor: 'modalidade',
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
            render: (i: IAluno[]) => (
                <button
                    className="text-primary hover:text-black"
                    onClick={() => openAlunosModal(i)}
                >
                    <DynamicIcons name="FaEye" />
                </button>
            )
        },
        {
            accessor: 'aulas',
            title: 'Ação',
            render: (item: IAula[]) => (
                <ActionMenu
                    item={item}
                    apiRoute={apiRoute}
                    pageRoute={pageRoute}
                    hideEnable={true}
                    onRefresh={() => setRefresh(true)}
                    customButtons={(i) => (
                        <div>
                            <Menu.Item
                                leftSection={<DynamicIcons name={'FaBook'} />}
                                onClick={() => {
                                    openAulasModal(i);
                                }}
                                style={{
                                    padding: '4px 8px',
                                    fontSize: '14px'
                                }}
                            >
                                {t('classes')}
                            </Menu.Item>
                        </div>
                    )}></ActionMenu>
            )
        }
    ]
    return (
        <div>
            <BreadCrumbs
                items={breadCrumbsItems}
            />

            <div className="panel">
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
                    data={turmasData}
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
