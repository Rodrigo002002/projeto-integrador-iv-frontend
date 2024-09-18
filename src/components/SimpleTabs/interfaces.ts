import React from 'react';

export interface ISimpleTabsProps {
    name: string;
    icon: string;
    visible?: boolean;
    content: (tabIndex: number) => React.ReactNode;
}
