import { FormikProvider, useFormik } from "formik";
import FormikField from "../lib/components/Input/FormikField";
import { Button } from "../lib/main";
import * as Yup from "yup";
import DropdownField from "../lib/components/DropDown/DropdownField";
import Notify from "../lib/components/Notify/Notify";
import { ToastContainer } from "react-toastify";
function App() {
  const initialValues = {
    name: "",
    topic: [],
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
    <div
      style={{
        width: "50%",
        marginLeft: "25%",
        marginTop: "5%",
      }}
    >
      <ToastContainer />
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
        <Button
          label={"hello world"}
          type="submit"
          // isDisabled={true}
          onClick={formik.handleSubmit}
          buttonType="outlined"
        />
      </FormikProvider>
      <Button
        label={"Toast"}
        type="submit"
        // isDisabled={true}
        onClick={() => {
          Notify({
            message: "This item has been deleted ",
            type: "ERROR",
            toastType: "solid",
          });
        }}
        buttonType="outlined"
      />
    </div>
  );
}
export default App;
