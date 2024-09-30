/* eslint-disable @typescript-eslint/no-explicit-any */
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
    placeholder: "",
    disabled: false,
    isPassword: false,
    maxLength: 10,
    rightIcon: <></>,
    leftIcon: <></>,
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
        <Field
          name="input"
          component={InputField}
          {...mockProps}
          {...props}
          onFileChange={props.onFileChange || mockProps.onFileChange}
        />
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
    const { getByPlaceholderText } = renderComponent({ type: "file" });
    const fileInputContainer = getByPlaceholderText("file", {
      exact: true,
    })?.closest("div");
    if (fileInputContainer) {
      const inputFile = fileInputContainer.querySelector("input[type='file']");
      if (inputFile) {
        expect(inputFile).toHaveAttribute("type", "file");
        expect(inputFile).not.toHaveAttribute("multiple");
      } else {
        const inputFileFallback = fileInputContainer.querySelector("input");
        if (inputFileFallback) {
          expect(inputFileFallback).toHaveAttribute("type", "file");
          expect(inputFileFallback).not.toHaveAttribute("multiple");
        } else {
          expect(inputFileFallback).not.toBeNull();
        }
      }
    } else {
      expect(fileInputContainer).not.toBeNull();
    }
  });

  test("should render the input field with the correct multiple file input", () => {
    const { getByPlaceholderText } = renderComponent({
      type: "file",
      multiple: true,
    });
    const fileInputContainer = getByPlaceholderText("file", {
      exact: true,
    })?.closest("div");
    if (fileInputContainer) {
      const inputFile = fileInputContainer.querySelector("input[type='file']");
      if (inputFile) {
        expect(inputFile).toHaveAttribute("type", "file");
        expect(inputFile).toHaveAttribute("multiple", "");
      } else {
        const inputFileFallback = fileInputContainer.querySelector("input");
        if (inputFileFallback) {
          expect(inputFileFallback).toHaveAttribute("type", "file");
          expect(inputFileFallback).toHaveAttribute("multiple", "");
        } else {
          expect(inputFileFallback).not.toBeNull();
        }
      }
    } else {
      expect(fileInputContainer).not.toBeNull();
    }
  });
});
