import { DataTableColumn } from 'mantine-datatable';

export interface IDataTableBasicProps {
    columns: DataTableColumn<any>[];
    data: any[];
    disablePagination?: boolean;
    fetching?: boolean;
    pinLastColumn?: boolean;
    disableMaxHeightCalculate?: boolean;
    minHeight?: string | number;
    maxHeight?: string | number;
}
