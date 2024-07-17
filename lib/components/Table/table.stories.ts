import type { Meta, StoryObj } from "@storybook/react";
import "../../assets/button.module.scss";
import Table from ".";

const meta: Meta<typeof Table> = {
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;
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
export const Primary: Story = {
  args: {
    data: data,
    columns: columns,
  },
};

export const SearchableTable: Story = {
  args: {
    data: data,
    columns: columns,
    searchText: "Ghost",
  },
};
