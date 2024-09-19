import React, { Fragment } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { CloseButton } from '@mantine/core';
import { ISimpleModalProps } from '@/components/Modals/SimpleModal/interfaces';

const SimpleModal: React.FC<ISimpleModalProps> = ({
                                                      isOpen,
                                                      onClose,
                                                      title,
                                                      children,
                                                      afterLeave
                                                  }) => {

    return (
        <Transition appear show={isOpen} as={Fragment} afterLeave={afterLeave}>
            <Dialog as="div" className="relative z-[51]" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="transition-opacity ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <TransitionChild
                            as={Fragment}
                            enter="transition-transform ease-out duration-300"
                            enterFrom="scale-95"
                            enterTo="scale-100"
                            leave="transition-transform ease-in duration-200"
                            leaveFrom="scale-100"
                            leaveTo="scale-95"
                        >
                            <DialogPanel
                                className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                {/* Close Button */}
                                <CloseButton
                                    className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    onClick={onClose}
                                />

                                {/* Modal Header */}
                                <div
                                    className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                    {title}
                                </div>

                                <div className="p-5">
                                    {children}
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default SimpleModal;
