import React, { useEffect } from "react";
import { Field, FieldProps, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { AiFillAlipayCircle } from "react-icons/ai";
import { FormikDateField } from "../lib/components/DatePicker";
import { ToastContainer } from "react-toastify";
import { MdOutlineEmail } from "react-icons/md";

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
  TextAreaInput,
  CustomCheckbox,
} from "../lib/main";
import { Toaster } from "react-hot-toast";
import AccordionMenu from "./components/AccordianMenu";
// import { menu, subMenu } from "./components/menu";
// import { modifiedData } from "./components/responseObject";
// import { modifiedData2 } from "./components/roleResponseObj";
import { buildMenuTree } from "./components/roleResponseObj";
import { response as res } from "./components/responseObject";
import { response2 } from "./components/roleResponseObj";

function App() {
  const [selectedGender, setSelectedGender] = React.useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkboxState, setCheckBoxState] = useState<string>("unselected");

  const initialValues = {
    name: "",
    topic: { label: "HTML", value: "html" },
    topic2: [{ label: "HTML", value: "html" }],
    description: "",
    date: null,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    description: Yup.string().required("description is required"),
    topic:
      // Yup.array()
      // .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }),
    //   )
    // .min(1, "Topics must be selected")
    topic2: Yup.array()
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        })
      )
      .min(1, "Topics must be selected"),
    date: Yup.string().required("define some date"),
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
      title: "Beetlejuice1",
      year: "1988",
    },
    {
      id: 2,
      title: "Beetlejuice2",
      year: "1984",
    },
    {
      id: 3,
      title: "Beetlejuice3",
      year: "1984",
    },
    {
      id: 4,
      title: "Beetlejuice4",
      year: "1984",
    },
    {
      id: 5,
      title: "Beetlejuice5",
      year: "1988",
    },
    {
      id: 6,
      title: "Beetlejuice6",
      year: "1984",
    },
    {
      id: 7,
      title: "Beetlejuice7",
      year: "1984",
    },
    {
      id: 8,
      title: "Beetlejuice8",
      year: "1984",
    },
    {
      id: 9,
      title: "Beetlejuice9",
      year: "1988",
    },
    {
      id: 10,
      title: "Beetlejuice10",
      year: "1984",
    },
    {
      id: 11,
      title: "Beetlejuice11",
      year: "1984",
    },
    {
      id: 12,
      title: "Beetlejuice12",
      year: "1984",
    },
    {
      id: 13,
      title: "Beetlejuice13",
      year: "1988",
    },
    {
      id: 14,
      title: "Beetlejuice14",
      year: "1984",
    },
    {
      id: 15,
      title: "Beetlejuice15",
      year: "1984",
    },
    {
      id: 16,
      title: "Beetlejuice16",
      year: "1984",
    },
    {
      id: 17,
      title: "Beetlejuice17",
      year: "1988",
    },
    {
      id: 18,
      title: "Beetlejuice18",
      year: "1984",
    },
    {
      id: 19,
      title: "Beetlejuice19",
      year: "1984",
    },
    {
      id: 20,
      title: "Beetlejuice20",
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
  // const [response, setResponse] = useState([{ reportId: "", sortId: 1 }]);
  // console.log(response, "response");
  // console.log(modifiedData, "**********************");
  // console.log(modifiedData2, "9999999999999");
  const [response, setResponse] = useState<Yup.AnyObject>([]);
  // const[]
  const menuTreeArray1 = buildMenuTree(
    res.data,
    {
      menuId: "id",
      parentId: "parentId",
      isChecked: "isChecked",
      isExpanded: "isExpanded",
      menuName: "name",
    },
    0
  );
  const menuTreeArray2 = buildMenuTree(
    response2.data.rolePermissions,
    {
      menuId: "menuId",
      parentId: "parentId",
      isChecked: "isCheckedId",
      isExpanded: "expanded",
      menuName: "menuName",
    },
    0
  );

  useEffect(() => {
    console.log(response, "**************");
  }, [response]);

  return (
    <>
      <div className="flex">
        <Card className="my-10 p-10 bg-backgroundLight">
          <AccordionMenu menu={menuTreeArray1} setResponse={setResponse} />
        </Card>
        <Card className="my-10 p-10 bg-backgroundLight">
          <AccordionMenu menu={menuTreeArray2} setResponse={setResponse} />
        </Card>
      </div>
      <Toaster />
      <Card>
        <>
          {/* <div>
            <Field name={"topic"}>
              {({ field, form }: FieldProps) => (
                <DropDown
                  testId="topic"
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
            <Field name={"name"}>
              {({ field, form }: FieldProps) => (
                <div className="">
                  <InputField
                    label={"Name"}
                    field={field}
                    form={form}
                    leftIcon={<MdOutlineEmail color="red" />}
                    rightIcon={<MdOutlineEmail color="red" />}
                    className="my-24 bg-backgroundDarkYellow "
                    testId="name"
                    error={formik.errors.name}
                    validationSchema={validationSchema}
                  />
                </div>
              )}
            </Field>
            <GroupRadio
              testId="gender"
              label="Gender"
              data={groupRadioData}
              handleOptionChange={handleOptionChange}
              selectedValue={selectedGender}
            />
          </div> */}
          <CustomCheckbox
            labelText={"Double CheckBox"}
            clickType="double"
            testId={""}
            isChecked={true}
            onStateChange={(state) => {
              console.log(checkboxState);
              setCheckBoxState(state);
            }}
            customStyleLabel="bg-backgroundLightRed"
          />
          <CustomCheckbox
            labelText="4 click"
            clickType="quadruple"
            testId={""}
          />
          <Heading>Heading</Heading>
          <SubHeading>sub heading</SubHeading>
          <Label>Label</Label>
          <Paragraph>Im a paragraph</Paragraph>
          <Table
            data={data}
            columns={columns}
            searchText=""
            defaultRowsPerPage={5}
            totalRows={55}
            paginationTableRowsPerPageOptions={[5, 10, 15, 20]}
          />
          <ToastContainer />
          <FormikProvider value={formik}>
            <div className="flex gap-x-1">
              <Field name={"name"}>
                {({ field, form }: FieldProps) => (
                  <div className="">
                    <InputField
                      label={"Name"}
                      field={field}
                      form={form}
                      leftIcon={<MdOutlineEmail color="red" />}
                      rightIcon={<MdOutlineEmail color="red" />}
                      // className="my-24 bg-backgroundDarkYellow "
                      testId="name"
                      error={formik.errors.name}
                      validationSchema={validationSchema}
                    />
                  </div>
                )}
              </Field>
              <Field name={"topic"}>
                {({ field, form }: FieldProps) => (
                  <DropDown
                    testId="topic"
                    options={[
                      { label: "HTML", value: "html" },
                      { label: "JavaScript", value: "js" },
                    ]}
                    form={form}
                    label={"Topic"}
                    field={field}
                    error={formik.errors.topic}
                    validationSchema={validationSchema}
                    isMulti={false}
                    defaultValue={{ label: "HTML", value: "html" }}
                  />
                )}
              </Field>
              {/* <Field name={"description"}>
                {({ field, form }: FieldProps) => (
                  <TextAreaInput
                    label={"Description"}
                    field={field}
                    form={form}
                    error={formik.errors.description}
                    validationSchema={validationSchema}
                    height={"150px"}
                    testId="desc"
                  />
                )}
              </Field> */}
              <GroupRadio
                testId="gender"
                label="Gender"
                data={groupRadioData}
                handleOptionChange={handleOptionChange}
                selectedValue={selectedGender}
              />
            </div>
            <div className="flex flex-row">
              <Field name={"name"}>
                {({ field, form }: FieldProps) => (
                  <div className="">
                    <InputField
                      label={"Name"}
                      field={field}
                      form={form}
                      leftIcon={<MdOutlineEmail color="red" />}
                      rightIcon={<MdOutlineEmail color="red" />}
                      className="my-24 bg-backgroundDarkYellow "
                      testId="name"
                      error={formik.errors.name}
                      validationSchema={validationSchema}
                    />
                  </div>
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
                    testId="desc"
                  />
                )}
              </Field>
              <Field name={"topic2"}>
                {({ field, form }: FieldProps) => (
                  <DropDown
                    testId="topic"
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
                    defaultValue={[{ label: "HTML", value: "html" }]}
                  />
                )}
              </Field>
              <Field name={"date"}>
                {({ field, form }: FieldProps) => (
                  <FormikDateField
                    form={form}
                    testId="date"
                    name={"date"}
                    error={formik.errors.date}
                    validationSchema={validationSchema}
                    label={"DOB"}
                    field={field}
                    dateFormat={"YYYY-MM-DD"}
                  />
                )}
              </Field>
            </div>
            <Field name={"topic"}>
              {({ field, form }: FieldProps) => (
                <DropDown
                  testId="topic"
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
                  testId="date"
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
              customStyle="my-4"
              testId="demo"
            />
          </FormikProvider>
          <Button
            label={"Toast"}
            type="submit"
            // isDisabled={true}
            onClick={() => {
              Notify({
                message:
                  "This item has been deleted This item has been deleted This item has been deletedThis item has been deleted This item has been deleted",
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
                message:
                  "This item has been deleted This item has been deleted This item has been deleted",
                type: "ERROR",
                toastType: "solid",
                duration: 500,
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
    </>
  );
}

export default App;
