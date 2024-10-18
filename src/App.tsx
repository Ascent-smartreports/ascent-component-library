import React, { useEffect } from "react";
import { Field, FieldProps, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { AiFillAlipayCircle } from "react-icons/ai";
import { FormikDateField } from "../lib/components/DatePicker";
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
  Paragraph,
  SubHeading,
  GroupRadio,
  Card,
  Notify,
  Modal,
  InputField,
  TextAreaInput,
  CustomCheckbox,
  // NotifySuccess,
} from "ascent-component-library";
import { Toaster } from "react-hot-toast";
import AccordionMenu from "./components/AccordianMenu";
import LatestAccordianMenu from "./components/LatestAccordianMenu";
// import { menu, subMenu } from "./components/menu";
// import { modifiedData } from "./components/responseObject";
// import { modifiedData2 } from "./components/roleResponseObj";
import { buildMenuTree } from "./components/roleResponseObj";
import { response as res } from "./components/responseObject";
import { response2 } from "./components/roleResponseObj";
import AccordionMenu2 from "./components/UpdatedAccordianMenu";
// import { roleResponse } from "./components/newResponseObj";
import {
  roleResponseNew,
  updateMenuState,
  updateMenuState2,
} from "./components/updatedNewResponseObj";
import { ToolTipLabel } from "../lib/main";
import { Tabs } from "../lib/components/Tabs";
import { StepperTabs } from "../lib/components/StepperTabs";
interface InitialValues {
  name: File | null;
  name2: string;
  topic: { label: string; value: string } | undefined;
  topic2: [{ label: string; value: string }] | undefined;
  description: string;
  date: string | null;
}

function App() {
  const [selectedGender, setSelectedGender] = React.useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkboxState, setCheckBoxState] = useState<string>("unselected");
  // const [state, setState] = useState<{ label: string; value: string }>();
  const initialValues: InitialValues = {
    name: null,
    name2: "",
    topic: undefined,
    // topic: { label: "HTML", value: "html" },
    topic2: undefined,
    description: "",
    date: null,
  };

  useEffect(() => {
    setTimeout(() => {
      // setState({ label: "HTML", value: "html" });
      formik.setFieldValue("topic", { label: "HTML", value: "html" });
      formik.setFieldValue("topic2", [
        { label: "HTML", value: "html" },
        { label: "JavaScript", value: "js" },
      ]);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isValidFileType = (fileName: any, fileTypes: string | any[]) => {
    const extension = fileName?.split(".")?.pop().toLowerCase();
    return fileTypes.includes(extension);
  };

  const validationSchema = Yup.object().shape({
    // name: Yup.string().required("name is required"),
    description: Yup.string().required("description is required"),
    topic: Yup.object()
      .shape({
        value: Yup.string().required("Topic value is required"),
      })
      .required("topic is required"),
    name2: Yup.string(),
    name: Yup.mixed()
      .required("Name is required")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .test("fileFormat", "Unsupported Format", (value: any) => {
        console.log(value, "valueeeeeeeee");

        if (!value) return true;
        const allowedTypes = [
          "application/vnd.ms-excel", // .xls
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
          "text/csv", // .csv
          "application/pdf", // .pdf
          "application/zip", // .zip
          "application/x-zip-compressed", // .zip
        ];
        const allowedExtensions = ["xls", "xlsx", "csv", "pdf", "zip"];

        if (Array.isArray(value)) {
          return value.every(
            (file) =>
              allowedTypes.includes(file.type) ||
              isValidFileType(file.name, allowedExtensions)
          );
        }
        return (
          allowedTypes.includes(value.type) ||
          isValidFileType(value.name, allowedExtensions)
        );
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .test("fileSize", "File size is too large", (value: any) => {
        if (!value) return true;
        if (Array.isArray(value)) {
          return value.every((file) => file.size <= 2000000);
        }
        return value.size <= 2000000;
      }),
    // .test(
    //   "fileSize",
    //   "File size is too large",
    //   (value: Yup.AnyObject) => !value || (value && value.size <= 2000000) // 2 MB size limit
    // ),
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
      formik.resetForm();
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
  const data2 = [
    {
      id: 1,
      title: "Beetle1",
      year: "1988",
    },
    {
      id: 2,
      title: "Beetle2",
      year: "1984",
    },
    {
      id: 3,
      title: "Beetle3",
      year: "1984",
    },
    {
      id: 4,
      title: "Beetle4",
      year: "1984",
    },
    {
      id: 5,
      title: "Beetle5",
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

  const tabs = [
    {
      label: "Details",
      content: (
        <div>
          <Table
            data={data}
            columns={columns}
            searchText=""
            defaultRowsPerPage={5}
            totalRows={55}
            paginationTableRowsPerPageOptions={[5, 10, 15, 20]}
          />
        </div>
      ),
    },
    {
      label: "Content (Advanced)",
      content: (
        <div>
          <Table
            data={data2}
            columns={columns}
            searchText=""
            defaultRowsPerPage={5}
            totalRows={55}
            paginationTableRowsPerPageOptions={[5, 10, 15, 20]}
          />
        </div>
      ),
    },
    {
      label: "PDF External",
      content: (
        <div>
          <h3>PDF External Content</h3>
        </div>
      ),
    },
    {
      label: "Details",
      content: (
        <div>
          <h3>Details Content</h3>
        </div>
      ),
    },
    {
      label: "Content (Advanced)",
      content: (
        <div>
          <h3>Content (Advanced) Content</h3>
        </div>
      ),
    },
    {
      label: "PDF External",
      content: (
        <div>
          <h3>PDF External Content</h3>
        </div>
      ),
    },
  ];

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reportData: any[] = [
    {
      reportName: "AnnualReport",
      reportId: "1",
      sheets: [
        {
          sheetId: "1",
          sheetName: "RBAC1",
          sheetChildren: [
            {
              filterId: "1",
              filterFieldName: "Filters",
              filterChildren: [
                {
                  filterChildrenId: "1",
                  filterName: "UserGroupFilter1",
                  subFilters: [
                    {
                      subfilterChildrenId: "1",
                      subfiltername: "userGroupSub555",
                    },
                  ],
                },
                {
                  filterChildrenId: "2",
                  filterName: "UserGroupFilter2",
                  subFilters: [
                    {
                      subfilterChildrenId: "2",
                      subfiltername: "userGroupSub444",
                    },
                  ],
                },
                {
                  filterChildrenId: "3",
                  filterName: "UserGroupFilter3",
                  subFilters: [
                    {
                      subfilterChildrenId: "3",
                      subfiltername: "userGroupSub333",
                    },
                  ],
                },
              ],
            },
            {
              custumFieldId: "2",
              custumFieldName: "CustomFields",
              customFieldChildren: [
                {
                  customFieldChildrenId: "11",
                  customFieldChildrenName: "cus11",
                },
                {
                  customFieldChildrenId: "12",
                  customFieldChildrenName: "cus12",
                },
                {
                  customFieldChildrenId: "13",
                  customFieldChildrenName: "cus13",
                },
                {
                  customFieldChildrenId: "14",
                  customFieldChildrenName: "cus14",
                },
                {
                  customFieldChildrenId: "15",
                  customFieldChildrenName: "cus15",
                },
                {
                  customFieldChildrenId: "16",
                  customFieldChildrenName: "cus16",
                },
              ],
            },
          ],
        },
        {
          sheetId: "1",
          sheetName: "RBAC2",
          sheetChildren: [
            {
              filterId: "1",
              filterFieldName: "UserGroupFilter",
              filterChildren: [
                {
                  filterChildrenId: "1",
                  filterName: "userGroupSub",
                },
              ],
            },
          ],
          customFields: [
            { customFieldId: "1", customFieldName: "cus1" },
            { customFieldId: "2", customFieldName: "cus2" },
            { customFieldId: "3", customFieldName: "cus3" },
            { customFieldId: "4", customFieldName: "cus4" },
            { customFieldId: "5", customFieldName: "cus5" },
            { customFieldId: "6", customFieldName: "cus6" },
          ],
        },
      ],
    },
  ];

  // Define the keys for accessing dynamic fields
  const reportMenuKeys = {
    idKeys: [
      "reportId",
      "sheetId",
      "filterId",
      "custumFieldId",
      "filterChildrenId",
      "subfilterChildrenId",
      "customFieldChildrenId",
    ],
    nameKeys: [
      "reportName",
      "sheetName",
      "filterFieldName",
      "custumFieldName",
      "filterName",
      "subfiltername",
      "customFieldChildrenName",
    ],
    childrenKeys: [
      "sheets",
      "sheetChildren",
      "filterChildren",
      "customFieldChildren",
      "subFilters",
    ], // Possible children keys
  };
  console.log(
    updateMenuState2(reportData, reportMenuKeys),
    "pppppppppppppppppppppp"
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateReportMenuKeys = (reportData: any[]) => {
    const reportMenuKeys = {
      idKeys: new Set<string>(),
      nameKeys: new Set<string>(),
      childrenKeys: new Set<string>(),
    };

    const traverse = (data: Yup.AnyObject) => {
      if (Array.isArray(data)) {
        data.forEach((item) => traverse(item));
      } else if (typeof data === "object" && data !== null) {
        Object.keys(data).forEach((key) => {
          if (key.toLowerCase().includes("id")) {
            reportMenuKeys.idKeys.add(key);
          }
          if (key.toLowerCase().includes("name")) {
            reportMenuKeys.nameKeys.add(key);
          }
          if (Array.isArray(data[key])) {
            reportMenuKeys.childrenKeys.add(key);
          }
          traverse(data[key]);
        });
      }
    };

    traverse(reportData);

    return {
      idKeys: Array.from(reportMenuKeys.idKeys),
      nameKeys: Array.from(reportMenuKeys.nameKeys),
      childrenKeys: Array.from(reportMenuKeys.childrenKeys),
    };
  };

  const reportResponse = [
    {
      reportName: "AnnualReport",
      reportId: "1",
      sheets: [
        {
          sheetId: "1",
          sheetName: "RBAC1",
          filters: [
            {
              filterId: "1",
              filterName: "UserGroupFilter",
              subFilters: [
                {
                  subfilterId: "1",
                  subfiltername: "userGroupSub",
                },
              ],
            },
            {
              filterId: "2",
              filterName: "UserGroupFilter",
              subFilters: [
                {
                  subfilterId: "1",
                  subfiltername: "userGroupSub",
                },
              ],
            },
            {
              filterId: "3",
              filterName: "UserGroupFilter",
              subFilters: [
                {
                  subfilterId: "1",
                  subfiltername: "userGroupSub",
                },
              ],
            },
          ],
          customFields: [
            { customFieldId: "1", customFieldName: "cus1**" },
            { customFieldId: "1", customFieldName: "cus156" },
            { customFieldId: "1", customFieldName: "cus1ll" },
            { customFieldId: "1", customFieldName: "cus1uu" },
            { customFieldId: "1", customFieldName: "cus1**" },
            { customFieldId: "1", customFieldName: "cus1--" },
          ],
        },
        {
          sheetId: "1",
          sheetName: "RBAC2",
          filters: [
            {
              filterId: "1",
              filterName: "UserGroupFilter",
              subFilters: [
                {
                  subfilterId: "1",
                  subfiltername: "userGroupSub",
                },
              ],
            },
          ],
          customFields: [
            { customFieldId: "1", customFieldName: "cus1" },
            { customFieldId: "1", customFieldName: "cus12" },
            { customFieldId: "1", customFieldName: "cus13" },
            { customFieldId: "1", customFieldName: "cus155" },
            { customFieldId: "1", customFieldName: "cus18" },
            { customFieldId: "1", customFieldName: "cus19" },
          ],
        },
      ],
    },
  ];

  console.log(generateReportMenuKeys(reportData), "reportData");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformReportData = (reportData: Yup.AnyObject): any[] => {
    return reportData.map((report: Yup.AnyObject) => {
      return {
        reportName: report.reportName,
        reportId: report.reportId,
        sheets: report.sheets.map((sheet: Yup.AnyObject) => {
          const sheetChildren: Yup.AnyObject[] = [];

          if (sheet.filters && sheet.filters.length > 0) {
            sheetChildren.push({
              filterId: sheet.filters[0].filterId,
              filterFieldName: "Filters",
              filterChildren: sheet.filters.map((filter: Yup.AnyObject) => {
                return {
                  filterChildrenId: filter.filterId,
                  filterName: filter.filterName,
                  subFilters: filter.subFilters.map(
                    (subFilter: Yup.AnyObject) => ({
                      subfilterChildrenId: subFilter.subfilterId,
                      subfiltername: subFilter.subfiltername,
                    })
                  ),
                };
              }),
            });
          }

          if (sheet.customFields && sheet.customFields.length > 0) {
            sheetChildren.push({
              custumFieldId: sheet.customFields[0].customFieldId,
              custumFieldName: "CustomFields",
              customFieldChildren: sheet.customFields.map(
                (customField: Yup.AnyObject) => {
                  return {
                    customFieldChildrenId: customField.customFieldId,
                    customFieldChildrenName: customField.customFieldName,
                  };
                }
              ),
            });
          }

          return {
            sheetId: sheet.sheetId,
            sheetName: sheet.sheetName,
            sheetChildren,
          };
        }),
      };
    });
  };

  console.log(transformReportData(reportResponse), "++++++++++++++");

  return (
    <>
      <div className="flex">
        <Card className="my-10 p-10 bg-backgroundLight">
          <LatestAccordianMenu
            // resetMenus={false}
            menus={updateMenuState2(
              transformReportData(reportResponse),
              reportMenuKeys
            )}
            setResponse={setResponse}
            menuKeys={generateReportMenuKeys(reportData)}
          />
        </Card>
        <Card className="my-10 p-10 bg-backgroundLight">
          <AccordionMenu menu={menuTreeArray1} setResponse={setResponse} />
        </Card>
        <Card className="my-10 p-10 bg-backgroundLight">
          <AccordionMenu menu={menuTreeArray2} setResponse={setResponse} />
        </Card>
        <Card className="my-10 p-10 bg-backgroundLight">
          <AccordionMenu2
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            menus={updateMenuState(roleResponseNew)}
            setResponse={setResponse}
            menuKeys={{
              idKeys: ["roleId", "menuId", "subMenuId", "permissionId"],
              nameKeys: [
                "roleName",
                "menuName",
                "subMenuName",
                "permissionName",
                "menuName",
              ],
            }}
          />
        </Card>
      </div>
      <Toaster />
      <Toaster />
      <div className="border-2 border-gray-300">
        <Tabs
          tabs={tabs}
          // headerActions={
          //   <>
          //     <div className="w-[30vw] flex gap-x-3">
          //       <Button
          //         label={"Save"}
          //         type="submit"
          //         // isDisabled={true}
          //         onClick={formik.handleSubmit}
          //         buttonType="outlined"
          //         customStyle="my-4"
          //         testId="demo"
          //       />
          //       <Button
          //         label={"Add"}
          //         type="submit"
          //         // isDisabled={true}
          //         onClick={formik.handleSubmit}
          //         buttonType="outlined"
          //         customStyle="my-4"
          //         testId="demo"
          //       />
          //       <Button
          //         label={"hello world"}
          //         type="submit"
          //         // isDisabled={true}
          //         onClick={formik.handleSubmit}
          //         buttonType="outlined"
          //         customStyle="my-4"
          //         testId="demo"
          //       />
          //       <Button
          //         label={"hello world"}
          //         type="submit"
          //         // isDisabled={true}
          //         onClick={formik.handleSubmit}
          //         buttonType="outlined"
          //         customStyle="my-4"
          //         testId="demo"
          //       />
          //     </div>
          //   </>
          // }
        />
      </div>
      <StepperTabs
        tabs={tabs}
        onSubmit={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

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
          <ToolTipLabel>
            LabelLabelLabelLabelLabelLabelLabelLabelLabel
          </ToolTipLabel>
          <Paragraph>Im a paragraph</Paragraph>
          <Table
            data={data}
            columns={columns}
            searchText=""
            defaultRowsPerPage={5}
            totalRows={55}
            paginationTableRowsPerPageOptions={[5, 10, 15, 20]}
          />
          <FormikProvider value={formik}>
            <div className="flex gap-x-1">
              <Field name={"name"}>
                {({ field, form }: FieldProps) => (
                  <div className="">
                    <InputField
                      label={"Name"}
                      field={field}
                      form={form}
                      // leftIcon={<MdOutlineEmail color="red" />}
                      // rightIcon={<MdOutlineEmail color="red" />}
                      // className="my-24 bg-backgroundDarkYellow "
                      testId="name"
                      type="file"
                      multiple={true}
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
                      {
                        label: "HTML",
                        value: "html",
                        additionalInfo: {
                          Code: "santhosh@example.com",
                          Role: "Developer",
                        },
                      },
                      {
                        label: "JavaScript",
                        value: "js",
                        additionalInfo: {
                          Code: "jayaram@example.com",
                          Role: "Developer",
                        },
                      },
                    ]}
                    form={form}
                    label={"Topic"}
                    field={field}
                    error={formik.errors.topic}
                    validationSchema={validationSchema}
                    isMulti={false}
                    disabled={true}
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
              <Field name={"name2"}>
                {({ field, form }: FieldProps) => (
                  <div className="">
                    <InputField
                      label={"name2"}
                      field={field}
                      form={form}
                      testId="name2"
                      error={formik.errors.name2}
                      validationSchema={validationSchema}
                    />
                  </div>
                )}
              </Field>
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
              {/* <Field name={"topic2"}>
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
                    error={formik.errors.topic.value}
                    validationSchema={validationSchema}
                    isMulti
                  />
                )}
              </Field> */}
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
                    // dateFormat={"yyyy MMM"}
                    // dateFormat={"MMM yyyy"}
                    // pickerType="month-year"
                    dateFormat={"DD/MM/YYYY"}
                    pickerType="date"
                  />
                )}
              </Field>
            </div>
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
                  // disabled={true}
                  onChange={(values) => {
                    console.log(values, "values");
                  }}
                />
              )}
            </Field>
            {/* <Field name={"date"}>
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
            </Field> */}
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
          <Modal isOpen={isModalOpen} size="xs" closeModal={closeModal}>
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
