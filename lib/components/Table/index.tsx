/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import DataTable from "react-data-table-component";
import "../../assets/table.css";
interface tableProps {
  data: any[];
  columns: any;
  searchText?: string;
}
const Table: React.FC<tableProps> = ({ data, columns, searchText }) => {
  const getData = () => {
    if (searchText) {
      const filteredItems = data.filter(
        (item) =>
          JSON.stringify(item)
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) !== -1
      );
      return filteredItems;
    } else return data;
  };
  return (
    <div>
      <p>tabling is gonna come soon!!!</p>
      <DataTable data={getData()} columns={columns} pagination striped />
    </div>
  );
};
export default Table;
