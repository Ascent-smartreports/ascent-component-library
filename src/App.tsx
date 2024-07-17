import React from "react";
import { FormikProvider, useFormik } from "formik";
import { FormikField } from "../lib/components/Input/FormikField";
import { Card } from "../lib/components/Card";
import { Button } from "../lib/components/Button";
import * as Yup from "yup";
import { AiFillAlipayCircle } from "react-icons/ai";
import { FormikDateField } from "../lib/components/DatePicker";
import { Table } from "../lib/components/Table";
import { DropdownField } from "../lib/components/DropDown/DropdownField";
import { Notify } from "../lib/components/Notify/Notify";
import { ToastContainer } from "react-toastify";
import { GroupRadio } from "../lib/components/GroupRadio";
import { Heading, SubHeading, Label, Paragraph } from "../lib/components/Texts";
// eslint-disable-next-line react-refresh/only-export-components
export const groupRadioData = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Others", value: "others" },
];
import { useState } from "react";
import { Modal } from "../lib/components/Modal/Modal";
function App() {
  const [selectedGender, setSelectedGender] = React.useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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



