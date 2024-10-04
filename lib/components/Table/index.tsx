/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useState } from "react";
import DataTable, { TableStyles } from "react-data-table-component";
import { AnyObject } from "yup";

interface TableProps {
  data: any[];
  columns: any;
  totalRows: number;
  searchText?: string;
  indexRequired?: boolean;
  paginationRequired?: boolean;
  defaultRowsPerPage?: number;
  handleTablePageChange?: (page: number) => void;
  handleTableRowsPerPageChange?: (newRowsPerPage: number, page: number) => void;
  paginationTableRowsPerPageOptions?: number[];
}

const customStyles: TableStyles = {
  table: {
    style: {
      borderColor: "#0000000d",
      borderWidth: "0.15rem",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#f8f9fa",
      fontWeight: 600,
      fontSize: "14px",
      color: "#464a53",
    },
  },
  headCells: {
    style: {
      justifyContent: "start",
      alignItems: "start",
    },
  },
  rows: {
    style: {
      "&:nth-of-type(odd)": {
        backgroundColor: "#ffffff",
      },
      "&:nth-of-type(even)": {
        backgroundColor: "#f8f9fa",
      },
      borderBottomWidth: 0,
    },
  },
  cells: {
    style: {
      color: "#464a53",
      justifyContent: "start",
    },
  },
};

export const Table: React.FC<TableProps> = ({
  data,
  columns,
  totalRows,
  searchText,
  indexRequired = true,
  paginationRequired = true,
  defaultRowsPerPage = 10,
  handleTablePageChange,
  handleTableRowsPerPageChange,
  paginationTableRowsPerPageOptions = [10, 15, 20, 25, 30],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const indexRow = {
    name: "Sl No.",
    sortable: true,
    cell: (_: AnyObject, index: number): React.JSX.Element => (
      <div className="">{index + 1 + rowsPerPage * (currentPage - 1)}</div>
    ),
    width: "8%",
  };

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
    if (paginationRequired) {
      setCurrentPage(page);
      if (handleTablePageChange) {
        handleTablePageChange(page);
      }
    }
  };

  const handleRowsPerPageChange = (newRowsPerPage: number, page: number) => {
    if (paginationRequired) {
      setRowsPerPage(newRowsPerPage);
      setCurrentPage(page);
      if (handleTableRowsPerPageChange) {
        handleTableRowsPerPageChange(newRowsPerPage, page);
      }
    }
  };

  return (
    <div>
      <DataTable
        data={paginationRequired ? paginatedData : getData()}
        columns={indexRequired ? [indexRow, ...columns] : columns}
        customStyles={customStyles}
        pagination
        paginationServer
        paginationTotalRows={paginationRequired ? totalRows : getData().length}
        paginationDefaultPage={paginationRequired ? currentPage : 1}
        paginationPerPage={paginationRequired ? rowsPerPage : getData().length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleRowsPerPageChange}
        paginationRowsPerPageOptions={paginationTableRowsPerPageOptions}
        striped
      />
    </div>
  );
};
