import { render, screen, fireEvent, act } from "@testing-library/react";
import { TextAreaInput } from ".";
import * as Yup from "yup";
import { Field, FieldProps, Formik, useFormikContext } from "formik";
import "@testing-library/jest-dom";

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useFormikContext: jest.fn(),
}));

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
});

const errors = {
  description: "Description value is required",
};

describe("TextAreaInput component", () => {
  const mockContextValues = {
    values: { description: "" },
    errors: { description: "" },
    handleChange: jest.fn(),
    setFieldValue: jest.fn(),
  };

  beforeEach(() => {
    (useFormikContext as jest.Mock).mockReturnValue(mockContextValues);
  });

  it("renders the component with no errors", () => {
    render(
      <Formik
        initialValues={{ description: "" }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        <Field name="description">
          {({ field, form }: FieldProps) => (
            <TextAreaInput
              form={form}
              testId="descr"
              label="Description"
              field={field}
              error={errors.description}
              validationSchema={validationSchema}
              height="150px"
            />
          )}
        </Field>
      </Formik>
    );

    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("renders the component with errors", () => {
    mockContextValues.errors.description = "Description is required";

    render(
      <Formik
        initialValues={{ description: "" }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        <Field name="description">
          {({ field, form }: FieldProps) => (
            <TextAreaInput
              form={form}
              label="Description"
              testId="desc"
              field={field}
              error={mockContextValues.errors.description}
              validationSchema={validationSchema}
              height="150px"
            />
          )}
        </Field>
      </Formik>
    );

    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(
      screen.getByText("Description value is required")
    ).toBeInTheDocument();
  });

  it("calls setFieldValue on change", () => {
    render(
      <Formik
        initialValues={{ description: "" }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        <Field name="description">
          {({ field, form }: FieldProps) => (
            <TextAreaInput
              form={form}
              label="Description"
              testId="description"
              field={field}
              error={errors.description}
              validationSchema={validationSchema}
              height="150px"
            />
          )}
        </Field>
      </Formik>
    );

    const textarea = screen.getByRole("textbox");
    act(() => {
      fireEvent.change(textarea, { target: { value: "New description" } });
    });

    expect(mockContextValues.setFieldValue).toHaveBeenCalledWith(
      "description",
      "New description"
    );
  });
});
