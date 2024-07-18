import { render } from "@testing-library/react";
import { InputField } from ".";
import * as Yup from "yup";
import { Field, FieldProps, Formik, useFormikContext } from "formik";

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useFormikContext: jest.fn(),
}));

const validationSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
});
const errors = {
  name: "Name value is required",
};
describe("formikfield component", () => {
  it("render the component with no errors", () => {
    const mockContextValues = {
      values: { name: "" },
      errors: { name: "" },
      handleChange: jest.fn(),
      setFieldValue: jest.fn(),
    };
    (useFormikContext as jest.Mock).mockReturnValue(mockContextValues);
    render(
      <Formik
        initialValues={{ name: "" }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        <Field name="name">
          {({ field, form }: FieldProps) => (
            <InputField
              form={form}
              label="name"
              field={field}
              error={errors.name}
              validationSchema={validationSchema}
              type="text"
            />
          )}
        </Field>
      </Formik>
    );
  });
});
