import { render, fireEvent } from "@testing-library/react";
import { Formik, Field } from "formik";
import { DropDown } from ".";
import * as Yup from "yup";

describe("DropDown Component", () => {
  const validationSchema = Yup.object().shape({
    dropdown: Yup.string().required("Dropdown is required"),
  });

  const mockProps = {
    placeholder: "Select an option",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
    validationSchema,
    label: "Dropdown",
    field: {
      name: "dropdown",
      value: "",
    },
    form: {
      setFieldValue: jest.fn(),
      setFieldTouched: jest.fn(),
    },
    error: {},
    isMulti: false,
    testId: "dropdown",
    className: "",
  };

  const renderComponent = (props: Partial<typeof mockProps> = {}) =>
    render(
      <Formik
        initialValues={{ dropdown: "" }}
        validationSchema={validationSchema}
        onSubmit={jest.fn()}
      >
        <Field name="dropdown" component={DropDown} {...mockProps} {...props} />
      </Formik>
    );

  test("should render the dropdown with the correct placeholder", () => {
    const { getByText } = renderComponent();
    expect(getByText("Select an option")).toBeInTheDocument();
  });

  test("should render the dropdown with the correct options", () => {
    const { getByText } = renderComponent();

    const input = getByText("Select an option");

    fireEvent.mouseDown(input);

    const option = getByText("Option 1");

    fireEvent.click(option);

    expect(mockProps.form.setFieldValue).toHaveBeenCalledWith(
      "dropdown",

      "option1"
    );
  });

  test("should call setFieldValue when an option is selected", () => {
    const { getByText } = renderComponent();

    const input = getByText("Select an option");

    fireEvent.mouseDown(input);

    const option = getByText("Option 1");

    fireEvent.click(option);

    expect(mockProps.form.setFieldValue).toHaveBeenCalledWith(
      "dropdown",

      "option1"
    );
  });

  test("should call setFieldTouched when an option is selected", () => {
    const { getByText } = renderComponent();

    const input = getByText("Select an option");

    fireEvent.mouseDown(input);

    const option = getByText("Option 1");

    fireEvent.click(option);

    expect(mockProps.form.setFieldTouched).toHaveBeenCalledWith(
      "dropdown",
      true,
      false
    );
  });

  test("should display an error message when validation fails", async () => {
    const { getByText, findByText } = renderComponent({
      error: { value: "Dropdown is required" },
    });

    const input = getByText("Select an option");

    fireEvent.mouseDown(input);

    const option = getByText("Option 1");

    fireEvent.click(option);

    const errorMessage = await findByText("Dropdown is required");

    expect(errorMessage).toBeInTheDocument();
  });

  test("should not display an error message when validation passes", async () => {
    const { getByText, queryByText } = renderComponent();

    const input = getByText("Select an option");

    fireEvent.mouseDown(input);

    const option = getByText("Option 1");

    fireEvent.click(option);

    expect(queryByText("Dropdown is required")).not.toBeInTheDocument();
  });
});
