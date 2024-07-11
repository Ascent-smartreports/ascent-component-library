import React from "react";
import DataTable from "react-data-table-component";
import { AnyObject } from "yup";
import "../../assets/table.css";

interface tableProps {
  data: AnyObject[];
  columns: AnyObject[];
}
const Table: React.FC<tableProps> = ({ data, columns }) => {
  return (
    <div>
      <p>tabling is gonna come soon!!!</p>
      <DataTable data={data} columns={columns} pagination />
    </div>
  );
};
export default Table;
