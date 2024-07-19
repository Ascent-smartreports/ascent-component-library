import React from "react";
import { Field, FieldProps, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { AiFillAlipayCircle } from "react-icons/ai";
import { FormikDateField } from "../lib/components/DatePicker";
import { ToastContainer } from "react-toastify";
// eslint-disable-next-line react-refresh/only-export-components
export const groupRadioData = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Others", value: "others" },
];
import { useState } from "react";
import {
  DropDown,
  Table,
  Button,
  Heading,
  Label,
  Paragraph,
  SubHeading,
  GroupRadio,
  Card,
  Notify,
  Modal,
  InputField,
} from "../lib/main";
import { TextAreaInput } from "../lib/components/TextAreaInput";
function App() {
  const [selectedGender, setSelectedGender] = React.useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    name: "",
    topic: [],
    description: "",
    date: null,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    description: Yup.string().required("description is required"),
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

  const handleOptionChange = (_label: string, value: string) => {
    setSelectedGender(value);
  };
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

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  function onSave(): void {
    throw new Error("Function not implemented.");
  }
  return (
    <div
      style={{
        width: "50%",
        marginLeft: "25%",
        marginTop: "5%",
      }}
    >
      <Card>
        <>
          <GroupRadio
            testId="gender"
            label="Gender"
            data={groupRadioData}
            handleOptionChange={handleOptionChange}
            selectedValue={selectedGender}
          />
          <Heading>Heading</Heading>
          <SubHeading>sub heading</SubHeading>
          <Label>Label</Label>
          <Paragraph>Im a paragraph</Paragraph>
          <Table data={data} columns={columns} searchText="" />
          <ToastContainer />
          <FormikProvider value={formik}>
            <Field name={"name"}>
              {({ field, form }: FieldProps) => (
                <InputField
                  label={"Name"}
                  field={field}
                  form={form}
                  error={formik.errors.name}
                  validationSchema={validationSchema}
                />
              )}
            </Field>
            <Field name={"description"}>
              {({ field, form }: FieldProps) => (
                <TextAreaInput
                  label={"Description"}
                  field={field}
                  form={form}
                  error={formik.errors.description}
                  validationSchema={validationSchema}
                  height={"150px"}
                />
              )}
            </Field>
            <Field name={"topic"}>
              {({ field, form }: FieldProps) => (
                <DropDown
                  options={[
                    { label: "HTML", value: "html" },
                    { label: "JavaScript", value: "js" },
                  ]}
                  form={form}
                  label={"Topic"}
                  field={field}
                  error={formik.errors.topic}
                  validationSchema={validationSchema}
                  isMulti
                />
              )}
            </Field>
            <Field name={"date"}>
              {({ field, form }: FieldProps) => (
                <FormikDateField
                  form={form}
                  name={"date"}
                  error={formik.errors.date}
                  validationSchema={validationSchema}
                  label={"DOB"}
                  field={field}
                  dateFormat={"YYYY-MM-DD"}
                />
              )}
            </Field>
            <Button
              label={"hello world"}
              type="submit"
              // isDisabled={true}
              onClick={formik.handleSubmit}
              buttonType="outlined"
              testId="demo"
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
            testId="toast"
            buttonType="outlined"
          />
          <Button
            label={"Model"}
            type="submit"
            // isDisabled={true}
            onClick={() => {
              Notify({
                message: "This item has been deleted ",
                type: "ERROR",
                toastType: "solid",
              });
              openModal();
            }}
            testId="toast"
            buttonType="outlined"
          />
          <Modal isOpen={isModalOpen} size="md" closeModal={closeModal}>
            <div className="z-50">
              <label className="block text-sm font-medium text-gray-700">
                URL Name *
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="hrberry.com"
              />
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="hrberry.com"
              />
              <label className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="hrberry.com"
              />
              <label className="block text-sm font-medium text-gray-700">
                URL Name *
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="hrberry.com"
              />
            </div>
            <div className="px-6 py-4 flex justify-center items-center w-full">
              <div className="w-1/2 flex space-x-5">
                <Button
                  label={"close"}
                  type="submit"
                  onClick={() => {
                    closeModal();
                  }}
                  buttonType="outlined"
                  testId={"closeBtn"}
                  icon={<AiFillAlipayCircle />}
                />
                <Button
                  label={"Save"}
                  type="submit"
                  onClick={onSave}
                  testId="saveBtn"
                />
              </div>
            </div>
          </Modal>
        </>
      </Card>
    </div>
  );
}

export default App;
