import { render, fireEvent } from "@testing-library/react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { TextAreaInput, TextAreaProps } from ".";
// import "@testing-library/jest-dom/extend-expect";


describe("TextAreaInput Component", () => {
  const validationSchema = Yup.object().shape({
    description: Yup.string().required("Description is required"),
  });

  const mockProps = {
    label: "Description",
    field: {
      name: "description",
      value: "",
      onChange: jest.fn(),
      onBlur: jest.fn(),
    },
    form: {
      submitCount: 0,
      setFieldValue: jest.fn(),
    },
    error: "",
    autoFocus: false,
    placeholder: "Enter a description",
    disabled: false,
    height: "100px",
    testId: "text-area",
  };

  const renderComponent = (props: Partial<TextAreaProps> = {}) =>
    render(
      <Formik
        initialValues={{ description: "" }}
        validationSchema={validationSchema}
        onSubmit={jest.fn()}
      >
        <Field
          name="description"
          component={TextAreaInput}
          {...mockProps}
          {...props}
        />
      </Formik>
    );

  test("should render the TextAreaInput with the correct initial value", () => {
    const { getByTestId } = renderComponent();

    const textArea = getByTestId("text-area");
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveValue("");
    expect(textArea).toHaveAttribute("placeholder", "Enter a description");
  });

  test("should update the value when typing", () => {
    const { getByTestId } = renderComponent();
    const textArea = getByTestId("text-area");

    fireEvent.change(textArea, { target: { value: "New description" } });
    expect(mockProps.form.setFieldValue).toHaveBeenCalledWith(
      "description",
      "New description"
    );
  });

  test("should call onBlur when textarea loses focus", () => {
    const { getByTestId } = renderComponent();
    const textArea = getByTestId("text-area");

    fireEvent.blur(textArea);
    expect(mockProps.field.onBlur).toHaveBeenCalled();
  });

  test("should display an error message when validation fails", async () => {
    const { findByText, getByTestId } = renderComponent({
      error: "Description is required",
    });

    const textArea = getByTestId("text-area");

    fireEvent.blur(textArea);
    const errorMessage = await findByText("Description is required");
    expect(errorMessage).toBeInTheDocument();
  });

  test("should render with autoFocus", () => {
    const { getByTestId } = renderComponent({ autoFocus: true });
    const textArea = getByTestId("text-area");

    expect(textArea).toHaveFocus();
  });

  test("should be disabled when disabled prop is passed", () => {
    const { getByTestId } = renderComponent({ disabled: true });
    const textArea = getByTestId("text-area");

    expect(textArea).toBeDisabled();
  });

  test("should respect the maxLength property", () => {
    const { getByTestId } = renderComponent({ maxLength: 50 });
    const textArea = getByTestId("text-area");

    expect(textArea).toHaveAttribute("maxLength", "50");
  });

  test("should have the correct height when height prop is passed", () => {
    const { getByTestId } = renderComponent({ height: "200px" });
    const textArea = getByTestId("text-area");

    expect(textArea).toHaveStyle("height: 200px");
  });
});
