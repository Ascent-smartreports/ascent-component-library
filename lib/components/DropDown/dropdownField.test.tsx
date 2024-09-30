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
    error: "",
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

  test("should render the dropdown with the correct label", () => {
    const { getByText } = renderComponent();
    expect(getByText("Dropdown")).toBeInTheDocument();
  });

  test("should render the dropdown with the correct placeholder", () => {
    const { getByPlaceholderText } = renderComponent();
    expect(getByPlaceholderText("Select an option")).toBeInTheDocument();
  });

  test("should render the dropdown with the correct options", () => {
   const { getByPlaceholderText } = renderComponent();

   const input = getByPlaceholderText("Select an option");

   fireEvent.change(input, { target: { value: "Option 1" } });

   expect(mockProps.form.setFieldValue).toHaveBeenCalledWith(
     "dropdown",
     "option1"
   );
  });

  test("should call setFieldValue when an option is selected", () => {
    const { getByPlaceholderText } = renderComponent();

    const input = getByPlaceholderText("Select an option");

    fireEvent.change(input, { target: { value: "Option 1" } });

    expect(mockProps.form.setFieldValue).toHaveBeenCalledWith(
      "dropdown",
      "option1"
    );
  });

  test("should call setFieldTouched when an option is selected", () => {
     const { getByPlaceholderText } = renderComponent();
     const input = getByPlaceholderText("Select an option");
     fireEvent.change(input, { target: { value: "Option 1" } });
     expect(mockProps.form.setFieldTouched).toHaveBeenCalledWith(
       "dropdown",
       true,
       false
     );
  });

  test("should display an error message when validation fails", async () => {
    const { getByPlaceholderText, findByText } = renderComponent({
      error: "Dropdown is required",
    });
    const input = getByPlaceholderText("Select an option");
    fireEvent.change(input, { target: { value: "Option 1" } });
    const errorMessage = await findByText("Dropdown is required");
    expect(errorMessage).toBeInTheDocument();
  });

  test("should not display an error message when validation passes", async () => {
    const { getByPlaceholderText, queryByText } = renderComponent();
    const input = getByPlaceholderText("Select an option");
    fireEvent.change(input, { target: { value: "Option 1" } });
    expect(queryByText("Dropdown is required")).not.toBeInTheDocument();
  });

  test("should render the dropdown with the correct className", () => {
    const { getByTestId } = renderComponent({ className: "custom-class" });
    const dropdown = getByTestId("dropdown");
    expect(dropdown).toHaveClass("custom-class");
  });

  test("should render the dropdown with the correct isMulti prop", () => {
    const { getByTestId } = renderComponent({ isMulti: true });
    const dropdown = getByTestId("dropdown");
    expect(dropdown).toHaveAttribute("multiple");
  });

  test("should render the dropdown with the correct testId prop", () => {
    const { getByTestId } = renderComponent({ testId: "custom-test-id" });
    const dropdown = getByTestId("custom-test-id");
    expect(dropdown).toBeInTheDocument();
  });
});
