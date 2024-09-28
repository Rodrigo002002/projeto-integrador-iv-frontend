import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import React, { Fragment } from 'react';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';
import { IServicosModalProps } from '@/components/Modals/Servicos/interfaces';
import BasicDataTable from '@/components/DataTable/BasicDataTable';
import { DataTableColumn } from 'mantine-datatable';
import { IPagamento } from '@/types/IPagamento';

const ServicosModal: React.FC<IServicosModalProps> = ({
                                                          isServicoModal,
                                                          servicos,
                                                          setIsServicoModal
                                                      }) => {
    const { t } = useTranslation();

    const columns: DataTableColumn<any>[] = [
        {
            accessor: "id",
            title: "Id"
        },
        {
            accessor: "tipoServico.tipo",
            title: t('type'),
        },
        {
            accessor: "data",
            title: t('date.date'),
        },
        {
            accessor: 'pagamento.pago',
            title: t('paid'),
            textAlign: 'center',
            render: (pago: boolean) => (
                <span className={pago ? "flex justify-center text-success" : "flex justify-center text-danger"}>{pago ? t('yes') : t('no')}</span>
            )
        },
        {
            accessor: "professor.nome",
            title: t('teacher'),
        },
        {
            accessor: "aluno.nome",
            title: t('student'),
        }
    ]
    return (
        <div>
            <Transition appear show={isServicoModal} as={Fragment}>
                <Dialog as="div" open={isServicoModal} onClose={() => setIsServicoModal(false)}
                        className="relative z-[51]">

                    <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0"
                                     enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100"
                                     leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen wpx-4 ">
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
                                    className="panel border-0 p-0 rounded-lg overflow-hidden md:w-full max-w-2xl w-[90%] my-8">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsServicoModal(false);
                                        }}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-white-dark"
                                    >
                                        <DynamicIcons name={'MdClose'} />
                                    </button>

                                    <div
                                        className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        <div className="mb-5">
                                            {t('services')}
                                        </div>

                                        <BasicDataTable
                                            columns={columns}
                                            data={servicos}
                                        />
                                    </div>

                                    <div className="p-5 text-center">
                                        <div className="flex justify-center space-x-5">

                                        </div>

                                        <div className="flex justify-center items-center mt-8">
                                            <button
                                                onClick={() => {
                                                    setIsServicoModal(false);
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

export default ServicosModal;
