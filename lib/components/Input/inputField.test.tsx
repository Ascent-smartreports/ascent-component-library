import { render } from "@testing-library/react";
import { FormikField } from "./FormikField";
import * as Yup from "yup";
import { Formik, useFormikContext } from "formik";

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
        <FormikField
          name="name"
          label="name"
          error={errors.name}
          validationSchema={validationSchema}
          type="text"
        />
      </Formik>
    );
  });
});
