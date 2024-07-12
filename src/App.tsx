import { FormikProvider, useFormik } from "formik";
import FormikField from "../lib/components/Input/FormikField";
import { Button } from "../lib/main";
import * as Yup from "yup";
import FormikDateField from "../lib/components/DatePicker";
import Table from "../lib/components/Table";
import DropdownField from "../lib/components/DropDown/DropdownField";
import Notify from "../lib/components/Notify/Notify";
import { ToastContainer } from "react-toastify";
import { GroupRadio } from "../lib/components/GroupRadio";
import { Heading, SubHeading, Label, Paragraph } from "../lib/components/Texts";
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
      Notify({ message: "clicked", type: "SUCCESS", toastType: "solid" });
    },
  });
  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 3,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 4,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  const columns = [
    {
      name: "Title",
      selector: (row: { title: string }) => row.title,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row: { year: string }) => row.year,
    },
  ];
  const groupRadioData = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ];
  return (
    <div
      style={{
        width: "50%",
        marginLeft: "25%",
        marginTop: "5%",
      }}
    >
      <GroupRadio label="Gender" data={groupRadioData} />
      <Heading>Hello</Heading>
      <SubHeading>Waiting</SubHeading>
      <Label>Labels</Label>
      <Paragraph>Im a paragraph</Paragraph>

      <Table data={data} columns={columns} searchText="" />
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
        <FormikDateField
          name={"date"}
          error={formik.errors.date as string}
          validationSchema={validationSchema}
          label={"Date"}
          dateFormat="YYYY-MM-DD"
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
