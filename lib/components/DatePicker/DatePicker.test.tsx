import { render } from "@testing-library/react";
import FormikDateField from ".";
import * as Yup from "yup";
import { Formik, useFormikContext } from "formik";

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useFormikContext: jest.fn(),
}));

const validationSchema = Yup.object().shape({
  dob: Yup.string().required("name is required"),
});
const errors = {
  dob: "Name value is required",
};
describe("formikfield component", () => {
  it("render the component with no errors", () => {
    const mockContextValues = {
      values: { dob: null },
      errors: { dob: "" },
      handleChange: jest.fn(),
      setFieldValue: jest.fn(),
    };
    (useFormikContext as jest.Mock).mockReturnValue(mockContextValues);
    render(
      <Formik
        initialValues={{ name: "dob" }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        <FormikDateField
          name="dob"
          label="DOB"
          error={errors.dob}
          validationSchema={validationSchema}
        />
      </Formik>
    );
    expect(errors.dob).not.toBeDefined();
  });
});
