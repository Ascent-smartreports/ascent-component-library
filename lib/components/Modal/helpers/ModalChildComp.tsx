import { Button } from "../../Button";
import * as Yup from "yup";
import { Field, FieldProps, FormikProvider, useFormik } from "formik";
import { Notify } from "../../Notify/Notify";
import { InputField } from "../../Input";

export const ModalChildComp = () => {
  const initialValues = {
    name: "",
    date: null,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    date: Yup.date().required("define some date"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      console.log(formik.values);
      Notify({ message: "clicked", type: "SUCCESS", toastType: "solid" });
    },
  });
  return (
    <>
      <div className="flex flex-col justify-center z-50">
        <FormikProvider value={formik}>
          <Field name={"name"}>
            {({ field, form }: FieldProps) => (
              <InputField
                label={"Name"}
                field={field}
                testId="name"
                form={form}
                error={formik.errors.name}
                validationSchema={validationSchema}
              />
            )}
          </Field>
          {/* <FormikField
            label="city"
            name={"city"}
            error={formik.errors.name}
            validationSchema={validationSchema}
          /> */}
          <div className="flex justify-center items-center">
            <div className="w-1/2 flex flex-row items-center space-x-3">
              <Button
                label={"close"}
                type="submit"
                // isDisabled={true}
                onClick={formik.handleSubmit}
                buttonType="outlined"
                testId="demo"
              />
              <Button
                label={"submit"}
                type="submit"
                // isDisabled={true}
                onClick={formik.handleSubmit}
                buttonType="outlined"
                testId="demo"
              />
            </div>
          </div>
        </FormikProvider>
      </div>
    </>
  );
};
