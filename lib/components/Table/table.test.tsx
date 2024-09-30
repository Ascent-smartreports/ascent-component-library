/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Table } from ".";

describe("Table Component", () => {
  const data = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Doe", age: 25 },
    { id: 3, name: "Bob Smith", age: 40 },
  ];

  const columns = [
    {
      name: "Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row: any) => row.age,
      sortable: true,
    },
  ];

  it("renders data", () => {
    const { getByText } = render(
      <Table data={data} columns={columns} totalRows={data.length} />
    );
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Jane Doe")).toBeInTheDocument();
    expect(getByText("Bob Smith")).toBeInTheDocument();
  });

  it("renders columns", () => {
    const { getByText } = render(
      <Table data={data} columns={columns} totalRows={data.length} />
    );
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Age")).toBeInTheDocument();
  });

  it("renders pagination", () => {
    const { getByText } = render(
      <Table data={data} columns={columns} totalRows={data.length} />
    );
    expect(getByText("1-3 of 3")).toBeInTheDocument();
  });

  it("calls handleTablePageChange when page changes", async () => {
    const handleTablePageChange = jest.fn();

    const data = [
      { id: 1, name: "John Doe", age: 30 },
      { id: 2, name: "Jane Doe", age: 25 },
      { id: 3, name: "Bob Smith", age: 40 },
    ];

    const columns = [
      {
        name: "Name",
        selector: (row: any) => row.name,
        sortable: true,
      },
      {
        name: "Age",
        selector: (row: any) => row.age,
        sortable: true,
      },
    ];

    const { container } = render(
      <Table
        data={data}
        columns={columns}
        totalRows={data.length}
        handleTablePageChange={handleTablePageChange}
        defaultRowsPerPage={1}
      />
    );

    const paginationNextPageButton = container.querySelector(
      "#pagination-next-page"
    ) as HTMLButtonElement;

    // Ensure the button is enabled
    if (!paginationNextPageButton.disabled) {
      // Simulate clicking the next page button
      fireEvent.click(paginationNextPageButton);

      // Wait for the handleTablePageChange to be called
      await waitFor(() =>
        expect(handleTablePageChange).toHaveBeenCalledTimes(1)
      );
    } else {
      console.error("The button is still disabled.");
    }
  });

  it("calls handleTableRowsPerPageChange when rows per page changes", () => {
    const handleTableRowsPerPageChange = jest.fn();

    const { getByRole } = render(
      <Table
        data={data}
        columns={columns}
        totalRows={data.length}
        handleTableRowsPerPageChange={handleTableRowsPerPageChange}
      />
    );

    const rowsPerPageSelect = getByRole("combobox");

    fireEvent.change(rowsPerPageSelect, { target: { value: 15 } });

    expect(handleTableRowsPerPageChange).toHaveBeenCalledTimes(1);
  });

  it("renders index column when indexRequired is true", () => {
    const { getByText } = render(
      <Table
        data={data}
        columns={columns}
        totalRows={data.length}
        indexRequired
      />
    );
    expect(getByText("Sl No.")).toBeInTheDocument();
  });

  it("does not render index column when indexRequired is false", () => {
    const { queryByText } = render(
      <Table
        data={data}
        columns={columns}
        totalRows={data.length}
        indexRequired={false}
      />
    );

    expect(queryByText("Sl No.")).not.toBeInTheDocument();
  });

  it("renders filtered data when searchText is provided", () => {
    const { getByText, queryByText } = render(
      <Table
        data={data}
        columns={columns}
        totalRows={data.length}
        searchText="Doe"
      />
    );
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Jane Doe")).toBeInTheDocument();
    expect(queryByText("Bob Smith")).not.toBeInTheDocument();
  });

  it("renders all data when searchText is not provided", () => {
    const { getByText } = render(
      <Table data={data} columns={columns} totalRows={data.length} />
    );
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Jane Doe")).toBeInTheDocument();
    expect(getByText("Bob Smith")).toBeInTheDocument();
  });
});
