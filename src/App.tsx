import { FormikProvider, useFormik } from "formik";
import FormikField from "../lib/components/Input/FormikField";
import { Button } from "../lib/main";
import * as Yup from "yup";
import FormikDateField from "../lib/components/DatePicker";
import DropdownField from "../lib/components/DropDown/DropdownField";
function App() {
  const initialValues = {
    name: "",
    topic: [],
    date: null,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    topic: Yup.array()
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        })
      )
      .min(1, "Topics must be selected"),
    date: Yup.date().required("define some date"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      console.log(formik.values);
    },
  });

  return (
    <div
      style={{
        width: "50%",
        marginLeft: "25%",
        marginTop: "5%",
      }}
    >
      <FormikProvider value={formik}>
        <FormikField
          label="name"
          name={"name"}
          error={formik.errors.name}
          validationSchema={validationSchema}
        />
        <DropdownField
          options={[
            { label: "HTML", value: "html" },
            { label: "JavaScript", value: "js" },
          ]}
          name={"topic"}
          label={"Topic"}
          error={formik.errors.topic}
          validationSchema={validationSchema}
          isMulti
        />
        <FormikDateField
          name={"date"}
          error={formik.errors.date as string}
          validationSchema={validationSchema}
          label={"Date"}
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
