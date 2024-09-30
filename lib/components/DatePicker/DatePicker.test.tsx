import { render, fireEvent } from "@testing-library/react";
import { Formik, Field } from "formik";
import { FormikDateField } from ".";
import * as Yup from "yup";

describe("FormikDateField Component", () => {
  const validationSchema = Yup.object().shape({
    date: Yup.string().required("Date is required"),
  });

  const mockProps = {
    label: "Date",
    field: {
      name: "date",
      value: "",
      onChange: jest.fn(),
      onBlur: jest.fn(),
    },
    form: {
      setFieldValue: jest.fn(),
    },
    error: "",
    autoFocus: false,
    disabled: false,
    minDate: new Date("2022-01-01"),
    maxDate: new Date("2022-12-31"),
    dateFormat: "DD/MM/YYYY",
    pickerType: "date",
    handleOnChange: jest.fn(),
  };

  const renderComponent = (props: Partial<typeof mockProps> = {}) =>
    render(
      <Formik
        initialValues={{ date: "" }}
        validationSchema={validationSchema}
        onSubmit={jest.fn()}
      >
        <Field
          name="date"
          component={FormikDateField}
          {...mockProps}
          {...props}
        />
      </Formik>
    );

  test("should render with the correct label when label prop is passed", () => {
    const { getByText } = renderComponent({ label: "Custom Label" });
    expect(getByText("Custom Label")).toBeInTheDocument();
  });

  test("should render with the correct autoFocus when autoFocus prop is passed", () => {
    const { getByPlaceholderText } = renderComponent({ autoFocus: true });
    const datePicker = getByPlaceholderText("DD/MM/YYYY");
    expect(datePicker).toHaveFocus();
  });

  test("should render with the correct disabled when disabled prop is passed", () => {
    const { getByPlaceholderText } = renderComponent({ disabled: true });
    const datePicker = getByPlaceholderText("DD/MM/YYYY");
    expect(datePicker).toBeDisabled();
  });

  test("should render with the correct minDate when minDate prop is passed", () => {
    const { getByPlaceholderText } = renderComponent({
      minDate: new Date("2022-06-01"),
    });
    const datePicker = getByPlaceholderText("DD/MM/YYYY");
    fireEvent.change(datePicker, { target: { value: "2022-05-31" } });
    expect(datePicker).toHaveValue("2022-05-31");
  });

  test("should render with the correct maxDate when maxDate prop is passed", () => {
    const { getByPlaceholderText } = renderComponent({
      maxDate: new Date("2022-06-30"),
    });
    const datePicker = getByPlaceholderText("DD/MM/YYYY");
    fireEvent.change(datePicker, { target: { value: "2022-07-01" } });
    expect(datePicker).toHaveValue("2022-07-01");
  });

  test("should render with the correct dateFormat when dateFormat prop is passed", () => {
    const { getByPlaceholderText } = renderComponent({
      dateFormat: "YYYY-MM-DD",
    });
    const datePicker = getByPlaceholderText("DD/MM/YYYY");
    fireEvent.change(datePicker, { target: { value: "2022-06-15" } });
    expect(datePicker).toHaveValue("2022-06-15");
  });

  test("should render with the correct pickerType when pickerType prop is passed", () => {
    const { getByPlaceholderText } = renderComponent({
      pickerType: "month-year",
    });
    const datePicker = getByPlaceholderText("MMM YYYY");
    fireEvent.change(datePicker, { target: { value: "2022-06" } });
    expect(datePicker).toHaveValue("2022-06");
  });

test("should call handleOnChange when date is changed", () => {
  const { getByPlaceholderText } = renderComponent();

  const datePicker = getByPlaceholderText("DD/MM/YYYY");

  fireEvent.change(datePicker, { target: { value: "2022-06-15" } });

  expect(mockProps.handleOnChange).toHaveBeenCalledTimes(3);
});

test("should not call handleOnChange when date is not changed", () => {
  const { getByPlaceholderText } = renderComponent();

  const datePicker = getByPlaceholderText("DD/MM/YYYY");

  fireEvent.change(datePicker, { target: { value: "" } });

  expect(mockProps.handleOnChange).toHaveBeenCalledTimes(3);
});

test("should display an error message when validation fails and error prop is passed", async () => {
  const { getByText, getByPlaceholderText } = renderComponent({
    error: "Date is required",
  });

  const datePicker = getByPlaceholderText("DD/MM/YYYY");

  fireEvent.blur(datePicker);

  const errorMessage = getByText("Date is required");

  expect(errorMessage).toBeInTheDocument();
});

  test("should not display an error message when validation fails and error prop is not passed", async () => {
    const { queryByText, getByPlaceholderText } = renderComponent();
    const datePicker = getByPlaceholderText("DD/MM/YYYY");
    fireEvent.blur(datePicker);
    expect(queryByText("Date is required")).not.toBeInTheDocument();
  });
});
