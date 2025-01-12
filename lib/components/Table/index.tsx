/* eslint-disable @typescript-eslint/no-explicit-any */
import DataTable, { TableColumn } from "react-data-table-component";
import SortIcon from "../../assets/images/sortIcon.svg";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnyObject } from "yup";
import LIghtSortIcon from "../../assets/images/lightSortIcon.svg";
import "../../assets/table.css";
import { CustomPagination } from "./Pagination";

interface IPagination {
  rowsPerPage: number;
  currentPage: number;
  first: number;
  max: number;
}
interface CustomTableProps<T> {
  columns: AnyObject[];
  isLoading: boolean;
  data: any[];
  meta: IPagination;
  totalRows: number;
  responsive?: boolean;
  paginationRequired?: boolean;
  striped?: boolean;
  defaultRowsPerPage?: number;
  selectableRows?: boolean;
  expandableRows?: boolean;
  selectableRowDisabled?: (row: T) => boolean;
  paginationPerPage?: number;
  clearSelectedRows?: boolean;
  onSort?:
    | ((selectedColumn: TableColumn<T>, sortDirection: "asc" | "desc") => void)
    | undefined;
  onPaginationChange?: (pagination: IPagination) => void;
  handleTablePageChange?: (page: number) => void;
  handleTableRowsPerPageChange?: (newRowsPerPage: number, page: number) => void;
  paginationTableRowsPerPageOptions?: number[];
  onSelectedRowsChange?:
    | ((selected: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: T[];
      }) => void)
    | undefined;
  expandableRowsComponent?: JSX.Element;
}
const Table = <T,>({
  data,
  // meta,
  columns,
  totalRows,
  paginationRequired = true,
  striped = false,
  selectableRows = false,
  expandableRows = false,
  onSort,
  onPaginationChange,
  onSelectedRowsChange,
  expandableRowsComponent,
  clearSelectedRows,
  selectableRowDisabled,
  paginationPerPage = 6,
}: CustomTableProps<T>) => {
  const [columnOrder, setColumnOrder] = useState<"asc" | "desc">("asc");
  const [sortStates, setSortStates] = useState<AnyObject[]>([]);

  const initialPaginationObj: IPagination = {
    rowsPerPage: 10,
    currentPage: 1,
    first: 0,
    max: 11,
  };

  const [pagination, setPagination] =
    useState<IPagination>(initialPaginationObj);

  const updatePagination = (newPagination: IPagination) => {
    setPagination(newPagination);
    if (onPaginationChange) {
      onPaginationChange(newPagination);
    }
  };

  const handleItemsPerPageChange = (newRowsPerPage: number) => {
    updatePagination({
      ...pagination,
      rowsPerPage: newRowsPerPage,
      max: pagination.first + newRowsPerPage + 1,
    });
  };

  const handlePageChange = (page: number) => {
    updatePagination({
      ...pagination,
      currentPage: page,
      max: page * pagination.rowsPerPage + 1,
    });
  };

  const handleSort = (column: TableColumn<T>) => {
    const newSortField = column.sortField || "";

    setSortStates((prevSortStates) => {
      const updatedSortStates = prevSortStates?.map((state) => {
        if (state.sortField === newSortField) {
          if (state.count > 0) {
            setColumnOrder((prevOrder) =>
              prevOrder === "asc" ? "desc" : "asc"
            );
          }

          return {
            ...state,
            count: state.count + 1,
            isActive: true,
          };
        }
        return {
          ...state,
          count: 0,
          isActive: false,
        };
      });

      return updatedSortStates;
    });

    if (onSort) {
      onSort(column, columnOrder);
    }
  };

  const getSortIcon = useCallback(
    (column: string) => {
      const currentSortState = sortStates?.find(
        (state) => state?.sortField === column
      );

      if (currentSortState) {
        return (
          <img
            src={currentSortState?.isActive ? SortIcon : LIghtSortIcon}
            alt="Sort"
            className={`sort-icon ${
              currentSortState?.isActive ? "active" : "active"
            }`}
            style={{
              transform: columnOrder === "desc" ? "rotate(180deg)" : "none",
            }}
            height={14}
            width={8}
          />
        );
      }
      return null;
    },
    [sortStates, columnOrder]
  );

  const updatedColumns = useMemo(
    () =>
      columns?.map((column) => {
        if (column?.sortable && column?.sortField) {
          return {
            ...column,
            name: (
              <div
                style={{
                  gap: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  width: "100%",
                  height: "100%",
                }}
                onClick={() => handleSort(column)}
                className="sortable-column"
              >
                <div style={{ cursor: "pointer" }}>{column.name}</div>
                {getSortIcon(column.sortField as string)}
              </div>
            ),
          };
        }
        return column;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getSortIcon, columns]
  );

  useEffect(() => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      paginationRequired: data && data.length < 10 ? false : paginationRequired,
    }));
  }, [paginationRequired, data]);

  useEffect(() => {
    const updatedSortStates = columns
      ?.filter((column) => column?.sortable)
      ?.map((column) => ({
        sortField: column.sortField || "",
        count: 0,
        isActive: false,
      }))
      ?.map((state) => {
        const matchingSortState = sortStates?.find(
          (value) => value.sortField === state.sortField
        );
        if (matchingSortState) {
          return matchingSortState;
        }
        return state;
      });

    setSortStates(updatedSortStates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  return (
    <div>
      <DataTable
        columns={updatedColumns}
        data={data || []}
        onSort={onSort}
        pagination={paginationRequired}
        striped={striped}
        selectableRows={selectableRows}
        responsive
        expandableRows={expandableRows}
        clearSelectedRows={clearSelectedRows}
        selectableRowDisabled={selectableRowDisabled}
        paginationPerPage={paginationPerPage}
        expandableRowsComponent={expandableRowsComponent as any}
        onSelectedRowsChange={onSelectedRowsChange}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleItemsPerPageChange}
        paginationComponent={CustomPagination}
        paginationTotalRows={totalRows}
      />
    </div>
  );
};

export default Table;
