import { render } from "@testing-library/react";
import { Table } from ".";

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 3,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 4,
    title: "Ghostbusters",
    year: "1984",
  },
];

const columns = [
  {
    name: "Title",
    selector: (row: { title: string }) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row: { year: string }) => row.year,
  },
];
describe("Button component", () => {
  it("renders with the correct label", () => {
    render(<Table data={data} columns={columns} totalRows={10} />);
  });
});
