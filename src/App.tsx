import { FormikProvider, useFormik } from "formik";
import FormikField from "../lib/components/Input/FormikField";
import { Button } from "../lib/main";
import * as Yup from "yup";
import DropdownField from "../lib/components/DropDown/DropdownField";
function App() {
  const initialValues = {
    name: "",
    topic: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    topic: Yup.string().required("Topics must be selected"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      console.log(formik.values.name);
    },
  });
  return (
    <div style={{ width: 500, backgroundColor: "grey" }}>
      <FormikProvider value={formik}>
        <FormikField
          label="name"
          name={"name"}
          error={formik.errors}
          validationSchema={validationSchema}
        />
        <DropdownField
          options={[{ label: "HTML", value: "html" }]}
          name={"topic"}
          label={"Topic"}
          error={formik.errors.topic}
          validationSchema={validationSchema}
        />
        <Button
          label={"hello world"}
          type="submit"
          // isDisabled={true}
          onClick={formik.handleSubmit}
          buttonType="outlined"
        />
      </FormikProvider>
    </div>
  );
}
export default App;
