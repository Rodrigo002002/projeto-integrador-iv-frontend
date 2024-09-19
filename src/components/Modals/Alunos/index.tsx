import React, { Fragment } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';
import BasicDataTable from '@/components/DataTable/BasicDataTable';
import { useTranslation } from 'react-i18next';
import { DataTableColumn } from 'mantine-datatable';
import { IAlunosModalProps } from '@/components/Modals/Alunos/interfaces';

const AlunosModal: React.FC<IAlunosModalProps> = ({
                                                      isAlunosModal,
                                                      alunos,
                                                      setIsAlunosModal
                                                  }) => {
    const { t } = useTranslation();

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
            accessor: 'telefone',
            title: t('telefone')
        },
        {
            accessor: 'email',
            title: t('email')
        },
        {
            accessor: 'rg',
            title: t('rg')
        },
        {
            accessor: 'cpf',
            title: t('cpf')
        },
        {
            accessor: 'turma',
            title: t('class')
        }
    ];

    return (
        <div>
            <Transition appear show={isAlunosModal} as={Fragment}>
                <Dialog as="div" open={isAlunosModal} onClose={() => setIsAlunosModal(false)}
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
                                            setIsAlunosModal(false);
                                        }}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-white-dark"
                                    >
                                        <DynamicIcons name={'MdClose'} />
                                    </button>

                                    <div
                                        className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        {t('students')}

                                        <BasicDataTable
                                            columns={columns}
                                            data={alunos}
                                        />
                                    </div>

                                    <div className="p-5 text-center">
                                        <div className="flex justify-center space-x-5">

                                        </div>

                                        <div className="flex justify-center items-center mt-8">
                                            <button
                                                onClick={() => {
                                                    setIsAlunosModal(false);
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
        </div>
    );
};

export default AlunosModal;
