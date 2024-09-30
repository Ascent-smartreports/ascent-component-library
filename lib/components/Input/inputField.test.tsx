import { render, fireEvent } from "@testing-library/react";
import { Formik, Field } from "formik";
import { InputField } from ".";
import * as Yup from "yup";

describe("InputField Component", () => {
  const validationSchema = Yup.object().shape({
    input: Yup.string().required("Input is required"),
  });

  const mockProps = {
    label: "Input",
    validationSchema,
    field: {
      name: "input",
      value: "",
      onChange: jest.fn(),
      onBlur: jest.fn(),
    },
    form: {
      setFieldTouched: jest.fn(),
      validateField: jest.fn(),
      setFieldValue: jest.fn(),
    },
    testId: "input",
    error: "",
    className: "",
    type: "text",
    placeholder: "Enter Input",
    disabled: false,
    isPassword: false,
    maxLength: 10,
    rightIcon: <div>Right Icon</div>,
    leftIcon: <div>Left Icon</div>,
    accept: undefined,
    multiple: false,
    onFileChange: jest.fn(),
    autoFocus: false,
  };

  const renderComponent = (props: Partial<typeof mockProps> = {}) =>
    render(
      <Formik
        initialValues={{ input: "" }}
        validationSchema={validationSchema}
        onSubmit={jest.fn()}
      >
        <Field name="input" component={InputField} {...mockProps} {...props} />
      </Formik>
    );

  test("should render the input field with the correct label", () => {
    const { getByText } = renderComponent();
    expect(getByText("Input*")).toBeInTheDocument();
  });

  test("should call onChange when the input field is changed", () => {
    const { getByPlaceholderText } = renderComponent();

    const input = getByPlaceholderText("Enter Input");
    fireEvent.change(input, { target: { value: "Hello" } });

    expect(mockProps.form.setFieldValue).toHaveBeenCalledTimes(1);
  });

  test("should display an error message when validation fails", async () => {
    const { getByPlaceholderText, findByText } = renderComponent({
      error: "Input is required",
    });
    const input = getByPlaceholderText("Enter Input");
    fireEvent.change(input, { target: { value: "" } });
    const errorMessage = await findByText("Input is required");
    expect(errorMessage).toBeInTheDocument();
  });

  test("should not display an error message when validation passes", async () => {
    const { getByPlaceholderText, queryByText } = renderComponent();
    const input = getByPlaceholderText("Enter Input");
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(queryByText("Input is required")).not.toBeInTheDocument();
  });

  test("should render the input field with the correct file input", () => {
    const { getByLabelText } = renderComponent({ type: "file" });

    const fileInput = getByLabelText("Input*");

    const file = new File(["file content"], "file.txt", { type: "text/plain" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockProps.form.setFieldValue).toHaveBeenCalledWith(
      "input",
      expect.any(File),
      false
    );
  });
  test("should render the input field with the correct multiple file input", () => {
    const { getByLabelText } = renderComponent({
      type: "file",
      multiple: true,
    });

    const fileInput = getByLabelText("Input*");

    const file1 = new File(["file content"], "file1.txt", {
      type: "text/plain",
    });
    const file2 = new File(["file content"], "file2.txt", {
      type: "text/plain",
    });
    fireEvent.change(fileInput, { target: { files: [file1, file2] } });

    expect(mockProps.form.setFieldValue).toHaveBeenCalledWith(
      "input",
      expect.arrayContaining([expect.any(File)]),
      false
    );
  });

  test("should toggle password visibility", () => {
    const { getByPlaceholderText, getByLabelText } = renderComponent({
      isPassword: true,
    });
    const passwordInput = getByPlaceholderText("Enter Input");
    const toggleButton = getByLabelText("Show password");
    expect(passwordInput).toHaveAttribute("type", "password");
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");
    const hideButton = getByLabelText("Hide password");
    fireEvent.click(hideButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("should handle left and right icons correctly", () => {
    const { getByText } = renderComponent();
    expect(getByText("Right Icon")).toBeInTheDocument();
    expect(getByText("Left Icon")).toBeInTheDocument();
  });

  test("should handle onBlur event", () => {
    const { getByPlaceholderText } = renderComponent();
    const input = getByPlaceholderText("Enter Input");
    fireEvent.blur(input);

    expect(mockProps.field.onBlur).toHaveBeenCalled();
  });

  test("should handle onFocus event", () => {
    const { getByPlaceholderText } = renderComponent();
    const input = getByPlaceholderText("Enter Input");
    fireEvent.focus(input);

    expect(mockProps.field.onBlur).toHaveBeenCalled();
  });

  test("should render disabled input correctly", () => {
    const { getByPlaceholderText } = renderComponent({ disabled: true });
    const input = getByPlaceholderText("Enter Input");
    expect(input).toBeDisabled();
  });
});
