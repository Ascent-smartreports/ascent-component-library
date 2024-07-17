import { render } from "@testing-library/react";
import * as Yup from "yup";
import { Formik, useFormikContext } from "formik";
import { DropdownField } from "./DropdownField";

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
        <DropdownField
          name="topic"
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
        <DropdownField
          name="topic"
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
          defaultValue={[{ label: "React JS", value: "React" }]}
        />
      </Formik>
    );
  });
});
