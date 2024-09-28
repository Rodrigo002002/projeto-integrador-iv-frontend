import React from 'react';

export interface ISimpleTabs {
    tabs: ISimpleTabsProps[]
}

export interface ISimpleTabsProps {
    name: string;
    icon: string;
    visible?: boolean;
    content: (tabIndex: number) => React.ReactNode;
}
