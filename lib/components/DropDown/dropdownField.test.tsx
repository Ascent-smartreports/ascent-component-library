import { render } from "@testing-library/react";
import * as Yup from "yup";
import { Field, FieldProps, Formik, useFormikContext } from "formik";
import { DropDown } from ".";

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useFormikContext: jest.fn(),
}));

const validationSchema = Yup.object().shape({
  topic: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    )
    .min(1, "Topics must be selected"),
});

const errors = {
  topic: "At least one topic must be selected",
};

describe("DropdownField component", () => {
  it("renders the component with no errors", () => {
    const mockContextValues = {
      values: { topic: [] },
      errors: { topic: "" },
      handleChange: jest.fn(),
      setFieldValue: jest.fn(),
    };
    (useFormikContext as jest.Mock).mockReturnValue(mockContextValues);
    render(
      <Formik
        initialValues={{ name: "", topic: [] }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        <Field name="topic">
          {({ field, form }: FieldProps) => (
            <DropDown
              form={form}
              testId="topic"
              label="Topic"
              error={errors.topic}
              validationSchema={validationSchema}
              field={field}
              options={[
                {
                  label: "React Native",
                  value: "RN",
                },
                { label: "React JS", value: "React" },
              ]}
            />
          )}
        </Field>
      </Formik>
    );
  });

  it("renders the component with a default value", () => {
    const mockContextValues = {
      values: { topic: [{ label: "React JS", value: "React" }] },
      errors: { topic: "" },
      handleChange: jest.fn(),
      setFieldValue: jest.fn(),
    };
    (useFormikContext as jest.Mock).mockReturnValue(mockContextValues);
    render(
      <Formik
        initialValues={{
          name: "",
          topic: [{ label: "React JS", value: "React" }],
        }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        <Field name="topic">
          {({ field, form }: FieldProps) => (
            <DropDown
              form={form}
              testId="topic"
              field={field}
              label="Topic"
              error={errors.topic}
              validationSchema={validationSchema}
              options={[
                {
                  label: "React Native",
                  value: "RN",
                },
                { label: "React JS", value: "React" },
              ]}
            />
          )}
        </Field>
      </Formik>
    );
  });
});
