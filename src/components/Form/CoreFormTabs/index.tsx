import React, { Fragment, useEffect, useState } from 'react';
import { FormikProps } from 'formik';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';
import { ICoreFormTabsProps } from '@/components/Form/CoreFormTabs/interfaces';
import { FormProvider } from '@/providers/FormProvider';
import SubmitButton from '@/components/Form/Buttons/Submit';
import { ErrorGroupProvider } from '@/providers/ErrorGroupProvider';
import { useTranslation } from 'react-i18next';

const CoreFormTabs: React.FC<ICoreFormTabsProps> = ({
                                                        tabs,
                                                        nonFormTabs = [],
                                                        initialValues,
                                                        validationSchema,
                                                        onSubmit,
                                                        genericError = null
                                                    }) => {

    const { t } = useTranslation();

    const [currentTabErrors, setCurrentTabErrors] = useState<Record<number, boolean>>({});

    const updateTabErrorState = (index: number, hasError: boolean) => {
        setCurrentTabErrors((prevErrors) => ({
            ...prevErrors,
            [index]: hasError
        }));
    };

    return (
        <TabGroup>
            <TabList className="flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                {
                    [...tabs, ...nonFormTabs].filter(t => t.visible !== false).map((tab, index) => (
                        <Tab as={Fragment} key={index}>
                            {
                                ({ selected }) => (
                                    <button
                                        className={`
                                            ${selected ? ' text-primary !border-white-light !border-b-white !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''}
                                            ${currentTabErrors[index] ? 'text-red-500 hover:text-red-800' : 'hover:text-primary'}
                                            dark:border-[#191e3a]' -mb-[1px] flex items-center border border-transparent p-3.5 py-2
                                        `}
                                    >
                                        <DynamicIcons name={tab.icon} className="ltr:mr-2 rtl:ml-2" />
                                        {tab.name}
                                    </button>
                                )
                            }
                        </Tab>
                    ))
                }
            </TabList>

            <TabPanels className="flex-1 border border-t-0 border-white-light p-4 text-sm dark:border-[#191e3a]">
                <FormProvider
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {
                        (formikProps: FormikProps<any>) => (
                            <>
                                {
                                    tabs.filter(t => t.visible !== false).map((tab, index) => (
                                        <ErrorGroupProvider key={index}>
                                            {(hasError: boolean) => {

                                                useEffect(() => {
                                                    updateTabErrorState(index, hasError);
                                                }, [hasError, index]);

                                                return (
                                                    <TabPanel unmount={false}>
                                                        {tab.content(formikProps, index)}

                                                        <div className="mt-5">
                                                            {genericError && (
                                                                <div
                                                                    className="flex items-center p-3.5 rounded text-warning bg-warning-light dark:bg-warning-dark-light">
                                                                    <span className="ltr:pr-2 rtl:pl-2">
                                                                        <strong className="ltr:mr-1 rtl:ml-1">{t('attention')}!</strong>
                                                                        {genericError}
                                                                    </span>
                                                                </div>
                                                            )}

                                                            <SubmitButton loading={formikProps.isSubmitting} />
                                                        </div>
                                                    </TabPanel>
                                                );
                                            }}
                                        </ErrorGroupProvider>
                                    ))
                                }
                            </>
                        )
                    }
                </FormProvider>

                {
                    nonFormTabs != undefined && nonFormTabs.filter(t => t.visible !== false).map((tab, index) => (
                        <TabPanel key={index} unmount={false}>
                            {tab.content(index)}
                        </TabPanel>
                    ))
                }
            </TabPanels>
        </TabGroup>
    );
};

export default CoreFormTabs;
