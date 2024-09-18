import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IDocumentosModalProps } from '@/components/Modals/Documentos/interfaces';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import React, { Fragment } from 'react';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';

const DocumentosModal: React.FC<IDocumentosModalProps> = ({
                                                              title,
                                                              isDocumentoModal,
                                                              documentos,
                                                              setIsDocumentoModal,
                                                          }) => {
    const { id } = useParams<{ id: string }>();

    const { t } = useTranslation();

    return (
        <div>
            <Transition appear show={isDocumentoModal} as={Fragment}>
                <Dialog as="div" open={isDocumentoModal} onClose={() => setIsDocumentoModal(false)}
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
                                            setIsDocumentoModal(false);
                                        }}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-white-dark"
                                    >
                                        <DynamicIcons name={'MdClose'} />
                                    </button>

                                    <div
                                        className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        {title}
                                    </div>

                                    <div className="p-5 text-center">
                                        <div className="flex justify-center space-x-5">
                                            {documentos && documentos.map(documento => (
                                                <div className="content-center panel bg-gray-100 shadow-black">
                                                    <h1 className="text-black"><b>{documento.tipo}</b></h1>
                                                    <div className="w-full">
                                                        <DynamicIcons className="w-32 h-32" name="IoDocumentText" />
                                                    </div>
                                                    <span className="text-black">{t('clickToOpen')}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-center items-center mt-8">
                                        <button
                                                onClick={() => {
                                                    setIsDocumentoModal(false);
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
}

export default DocumentosModal;
