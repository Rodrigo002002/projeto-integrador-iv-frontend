import { useTranslation } from 'react-i18next';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import React, { useEffect, useState } from 'react';
import BasicDataTable from '@/components/DataTable/BasicDataTable';
import { Link, useParams } from 'react-router-dom';
import { DataTableColumn } from 'mantine-datatable';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';
import { IAluno } from '@/types/IAluno';
import AlunosModal from '@/components/Modals/Alunos';
import { IAula } from '@/types/IAula';
import ActionMenu from '@/components/DataTable/ActionMenu';
import { Menu } from '@mantine/core';
import { getTurmasData } from '@/Datas/turmasData';

const TurmaAulas = () => {
    const { id } = useParams<{ id: string }>();

    const { t } = useTranslation();

    const [refresh, setRefresh] = useState(false);

    const [aulas, setAulas] = useState<IAula[]>([]);

    useEffect(() => {
        if (id) {
            setAulas(getTurmasData()[0].aulas);
        }
    }, [id]);

    useEffect(() => {

    }, [refresh]);

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('class'),
            icon: "FaPeopleGroup",
            uri: '/turma/consultar'
        },
        {
            label: t('consult')
        },
        {
            label: t('classes')
        }
    ];

    // DataTable
    const pageRoute = `aula`;
    const apiRoute = '/aulas';

    const columns: DataTableColumn<any>[] = [
        {
            accessor: 'id',
            title: 'Id'
        },
        {
            accessor: 'data',
            title: t('date.date')
        },
        {
            accessor: 'alunosPresentes',
            title: t('presentStudents'),
            render: (item: any) => (
                <div>
                    <button
                        className="text-primary hover:text-black"
                        onClick={() => openAlunosModal(item)}
                    >
                        <DynamicIcons name="FaEye" />
                    </button>
                </div>
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
                        hideEdit={true}
                        onRefresh={() => setRefresh(true)}
                        customButtons={(i) => (
                            <div>
                                <Menu.Item
                                    leftSection={<DynamicIcons name={'LuPencilLine'} />}
                                    component={Link}
                                    to={`/aula/editar/${id}/${item.id}`}
                                    style={{
                                        padding: '4px 8px',
                                        fontSize: '14px'
                                    }}
                                >
                                    {t('button.edit')}
                                </Menu.Item>
                            </div>
                        )}
                    />
                </div>
            )
        }
    ];



    // Modals
    const [isOpenAlunosModal, setOpenAlunosModal] = useState<boolean>(false);

    const [currentAlunos, setCurrentAlunos] = useState<IAluno[]>([]);

    const openAlunosModal = (alunos: any) => {
        var mappedAlunos: IAluno[] = []
        alunos.alunosPresentes.map(alunoIndex => (
            mappedAlunos.push(alunoIndex)
        ));

        console.log(mappedAlunos);
        setOpenAlunosModal(true);
        setCurrentAlunos(mappedAlunos);
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
                    <Link
                        className="btn btn-primary"
                        to={`/aula/cadastrar/${id}`}
                    >
                        {t('button.create')}
                    </Link>
                </div>

                <div className="datatables">
                    <BasicDataTable
                        columns={columns}
                        data={aulas}
                    />
                </div>
            </div>

            <AlunosModal
                isAlunosModal={isOpenAlunosModal}
                setIsAlunosModal={setOpenAlunosModal}
                alunos={currentAlunos}
            />

        </div>
    );
}

export default TurmaAulas;
