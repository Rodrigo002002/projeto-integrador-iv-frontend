import React, { Fragment } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';
import { ISimpleTabs } from '@/components/SimpleTabs/interfaces';

const SimpleTabs = ({
                                                    tabs
                                                }: ISimpleTabs) => {

    return (
        <TabGroup>
            <TabList className="flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                {
                    tabs.filter(t => t.visible !== false).map((tab, index) => (
                        <Tab as={Fragment} key={index}>
                            {
                                ({ selected }) => (
                                    <button
                                        className={`
                                            ${selected ? ' text-primary !border-white-light !border-b-white !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''}
                                            hover:text-primary dark:border-[#191e3a]' -mb-[1px] flex items-center border border-transparent p-3.5 py-2
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
                {
                    tabs.filter(t => t.visible !== false).map((tab, index) => (
                        <TabPanel key={index} unmount={false}>
                            {tab.content(index)}
                        </TabPanel>
                    ))
                }
            </TabPanels>
        </TabGroup>
    );
};

export default SimpleTabs;
