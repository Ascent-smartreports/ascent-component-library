/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import DataTable from "react-data-table-component";
import "../../assets/table.css";
interface tableProps {
  data: any[];
  columns: any;
}
const Table: React.FC<tableProps> = ({ data, columns }) => {
  return (
    <div>
      <p>tabling is gonna come soon!!!</p>
      <DataTable data={data} columns={columns} pagination striped />
    </div>
  );
};
export default Table;
