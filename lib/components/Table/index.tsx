/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import "../../assets/table.css";

interface TableProps {
  data: any[];
  columns: any;
  searchText?: string;
  totalRows?: number;
  defaultRowsPerPage?: number;
  handleTablePageChange?: (page: number) => void;
  handleTableRowsPerPageChange?: (newRowsPerPage: number, page: number) => void;
  paginationTableRowsPerPageOptions?: number[];
}

export const Table: React.FC<TableProps> = ({
  data,
  columns,
  searchText,
  totalRows,
  defaultRowsPerPage = 10,
  handleTablePageChange,
  handleTableRowsPerPageChange,
  paginationTableRowsPerPageOptions = [10, 15, 20, 25, 30],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const getData = useCallback(() => {
    if (searchText) {
      const filteredItems = data.filter(
        (item) =>
          JSON.stringify(item)
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) !== -1
      );
      return filteredItems;
    } else return data;
  }, [data, searchText]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return getData().slice(startIndex, endIndex);
  }, [currentPage, rowsPerPage, getData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (handleTablePageChange) {
      handleTablePageChange(page);
    }
  };

  const handleRowsPerPageChange = (newRowsPerPage: number, page: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(page);
    if (handleTableRowsPerPageChange) {
      handleTableRowsPerPageChange(newRowsPerPage, page);
    }
  };

  return (
    <div>
      <DataTable
        data={paginatedData}
        columns={columns}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationDefaultPage={currentPage}
        paginationPerPage={rowsPerPage}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleRowsPerPageChange}
        paginationRowsPerPageOptions={paginationTableRowsPerPageOptions}
        striped
      />
    </div>
  );
};
