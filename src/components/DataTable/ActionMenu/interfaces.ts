export interface ActionMenuProps {
    item: any;
    apiRoute: string;
    customButtons?: (item: any) => void;
    hideEdit?: boolean;
    hideDelete?: boolean;
    hideDisable?: boolean;
    hideEnable?: boolean;
    deleteDirectBtn?: boolean;
    onRefresh?: () => void;
    pageRoute?: string;
    updateRoute?: string;
    activeColumnName?: string;
}
