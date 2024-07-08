import { FormikProvider, useFormik } from "formik";
import FormikField from "../lib/components/Input/FormikField";
import { Button } from "../lib/main";
import * as Yup from "yup";
function App() {
  const initialValues = {
    name: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      console.log(formik.values.name);
    },
  });
  return (
    <div style={{ width: 500 }}>
      <FormikProvider value={formik}>
        <FormikField
          label="name"
          name={"name"}
          error={formik.errors}
          validationSchema={validationSchema}
        />
        <Button
          label={"hello world"}
          // isDisabled={true}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          // buttonType="outlined"
        />
      </FormikProvider>
    </div>
  );
}
export default App;
