import React, { Fragment, useState } from 'react';
import { IAulasModalProps } from '@/components/Modals/Aulas/interfaces';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';
import BasicDataTable from '@/components/DataTable/BasicDataTable';
import { useTranslation } from 'react-i18next';
import { DataTableColumn } from 'mantine-datatable';
import { IAluno } from '@/types/IAluno';
import AlunosModal from '@/components/Modals/Alunos';

const AulasModal: React.FC<IAulasModalProps> = ({
                                                    isAulasModal,
                                                    aulas,
                                                    setIsAulasModal
                                                }) => {
    const { t } = useTranslation();

    // Modals
    const [isOpenAlunosModal, setOpenAlunosModal] = useState<boolean>(false);

    const [currentAlunos, setCurrentAlunos] = useState<IAluno[]>([]);

    const openAlunosModal = (alunos: any) => {
        var mappedAlunos: IAluno[] = []
        alunos.alunosPresentes.map(alunoIndex => (
            mappedAlunos.push(alunoIndex)
        ));

        console.log(mappedAlunos);
        setIsAulasModal(false);
        setOpenAlunosModal(true);
        setCurrentAlunos(mappedAlunos);
    }

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
            title: t('students'),
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
        }
    ];

    return (
        <div>
            <Transition appear show={isAulasModal} as={Fragment}>
                <Dialog as="div" open={isAulasModal} onClose={() => setIsAulasModal(false)}
                        className="relative z-[51]">

                    <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0"
                                     enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100"
                                     leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 ">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel
                                    className="panel border-0 p-0 rounded-lg overflow-hidden md:w-full max-w-lg w-[90%] my-8">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsAulasModal(false);
                                        }}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-white-dark"
                                    >
                                        <DynamicIcons name={'MdClose'} />
                                    </button>

                                    <div
                                        className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        <div className="mb-5">
                                            {t('classes')}
                                        </div>

                                        <BasicDataTable
                                            columns={columns}
                                            data={aulas}
                                        />
                                    </div>

                                    <div className="p-5 text-center">
                                        <div className="flex justify-center space-x-5">

                                        </div>

                                        <div className="flex justify-center items-center mt-8">
                                            <button
                                                onClick={() => {
                                                    setIsAulasModal(false);
                                                }}
                                                type="button"
                                                className="btn btn-outline-danger"
                                            >
                                                {t('button.cancel')}
                                            </button>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <AlunosModal
                isAlunosModal={isOpenAlunosModal}
                setIsAlunosModal={setOpenAlunosModal}
                alunos={currentAlunos}
            />
        </div>
    );
};

export default AulasModal;
