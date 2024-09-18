import React, { useEffect, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { useTranslation } from 'react-i18next';
import { IDataTableBasicProps } from './interfaces';

const DataTableBasic: React.FC<IDataTableBasicProps> = ({
                                                          columns,
                                                          data,
                                                          disablePagination = false,
                                                          fetching = false,
                                                          pinLastColumn = false,
                                                          disableMaxHeightCalculate = false,
                                                          minHeight,
                                                          maxHeight
                                                        }) => {
  const { t } = useTranslation();

  const PAGE_SIZES = [10, 20, 30, 50, 100];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const totalRecords = data.length;

  const recordsToDisplay = disablePagination ? data : data.slice((page - 1) * pageSize, page * pageSize);

  const [calcMaxHeight, setCalcMaxHeight] = useState('400px');

  useEffect(() => {
    if (!disableMaxHeightCalculate) {
      const calculateMaxHeight = () => {
        const windowHeight = window.innerHeight;
        const calculatedHeight = windowHeight - 300;
        setCalcMaxHeight(`${calculatedHeight}px`);
      };

      calculateMaxHeight();

      window.addEventListener('resize', calculateMaxHeight);
    }
  }, []);

  // noinspection RequiredAttributes
  return (
    <div className="datatables">
      <DataTable
        pinLastColumn={pinLastColumn}
        withTableBorder={false}
        borderRadius={undefined}
        noRecordsText={t('datatable.noDataContent')}
        highlightOnHover
        className="whitespace-nowrap table-hover table-compact table-bordered"
        records={recordsToDisplay}
        fetching={fetching}
        columns={columns}
        totalRecords={totalRecords}
        recordsPerPage={disablePagination ? totalRecords : pageSize}
        // @ts-ignore
        page={disablePagination ? null : page}
        onPageChange={setPage}
        recordsPerPageOptions={disablePagination ? [] : PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
        height={disableMaxHeightCalculate ? '100%' : calcMaxHeight}
        minHeight={minHeight}
        maxHeight={maxHeight}
        paginationText={({
                           from,
                           to,
                           totalRecords
                         }) => t('datatable.paginationInfo', { from, to, totalRecords })}
      />
    </div>
  );
};

export default DataTableBasic;
