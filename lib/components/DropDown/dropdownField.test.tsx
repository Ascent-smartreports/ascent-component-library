import { render, fireEvent } from "@testing-library/react";
import { Formik, Field } from "formik";
import { DropDown, formatOptionLabel } from ".";
import * as Yup from "yup";

describe("DropDown Component", () => {
  const validationSchema = Yup.object().shape({
    dropdown: Yup.string().required("Dropdown is required"),
  });

  const mockProps = {
    placeholder: "Select an option",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
    validationSchema,
    label: "Dropdown",
    field: {
      name: "dropdown",
      value: "",
    },
    form: {
      setFieldValue: jest.fn(),
      setFieldTouched: jest.fn(),
    },
    error: {},
    isMulti: false,
    testId: "dropdown",
    className: "",
    disabled: false,
  };

  const renderComponent = (props: Partial<typeof mockProps> = {}) =>
    render(
      <Formik
        initialValues={{ dropdown: "" }}
        validationSchema={validationSchema}
        onSubmit={jest.fn()}
      >
        <Field name="dropdown" component={DropDown} {...mockProps} {...props} />
      </Formik>
    );

  test("should render the dropdown with the correct placeholder", () => {
    const { getByText } = renderComponent();
    expect(getByText("Select an option")).toBeInTheDocument();
  });

  test("should render the dropdown with the correct options", () => {
    const { getByText } = renderComponent();

    const input = getByText("Select an option");

    fireEvent.mouseDown(input);

    const option = getByText("Option 1");

    fireEvent.click(option);

    expect(mockProps.form.setFieldValue).toHaveBeenCalledWith(
      "dropdown",

      "option1"
    );
  });

  test("should call setFieldValue when an option is selected", () => {
    const { getByText } = renderComponent();

    const input = getByText("Select an option");

    fireEvent.mouseDown(input);

    const option = getByText("Option 1");

    fireEvent.click(option);

    expect(mockProps.form.setFieldValue).toHaveBeenCalledWith(
      "dropdown",

      "option1"
    );
  });

  test("should call setFieldTouched when an option is selected", () => {
    const { getByText } = renderComponent();

    const input = getByText("Select an option");

    fireEvent.mouseDown(input);

    const option = getByText("Option 1");

    fireEvent.click(option);

    expect(mockProps.form.setFieldTouched).toHaveBeenCalledWith(
      "dropdown",
      true,
      false
    );
  });

  test("should display an error message when validation fails", async () => {
    const { getByText, findByText } = renderComponent({
      error: { value: "Dropdown is required" },
    });

    const input = getByText("Select an option");

    fireEvent.mouseDown(input);

    const option = getByText("Option 1");

    fireEvent.click(option);

    const errorMessage = await findByText("Dropdown is required");

    expect(errorMessage).toBeInTheDocument();
  });

  test("should not display an error message when validation passes", async () => {
    const { getByText, queryByText } = renderComponent();

    const input = getByText("Select an option");

    fireEvent.mouseDown(input);

    const option = getByText("Option 1");

    fireEvent.click(option);

    expect(queryByText("Dropdown is required")).not.toBeInTheDocument();
  });

  test("should call setFieldValue when an option is selected", () => {
    const { getByText } = renderComponent();
    const input = getByText("Select an option");
    fireEvent.mouseDown(input);
    const option = getByText("Option 1");
    fireEvent.click(option);
    expect(mockProps.form.setFieldValue).toHaveBeenCalledWith(
      "dropdown",
      "option1"
    );
  });

  test("should call setFieldTouched when an option is selected", () => {
    const { getByText } = renderComponent();
    const input = getByText("Select an option");
    fireEvent.mouseDown(input);
    const option = getByText("Option 1");
    fireEvent.click(option);
    expect(mockProps.form.setFieldTouched).toHaveBeenCalledWith(
      "dropdown",
      true,
      false
    );
  });

  describe("formatOptionLabel", () => {
    it("should render the option label in the menu context", () => {
      const option = { label: "Option 1", value: "option1" };

      const { getByText } = render(
        <div>{formatOptionLabel(option, { context: "menu" })}</div>
      );

      expect(getByText("Option 1")).toBeInTheDocument();
    });

    it("should render the option label with additional info in the menu context", () => {
      const option = {
        label: "Option 1",

        value: "option1",

        additionalInfo: { key: "value" },
      };

      const { getByText } = render(
        <div>{formatOptionLabel(option, { context: "menu" })}</div>
      );

      expect(getByText("Option 1")).toBeInTheDocument();

      expect(getByText("key: value")).toBeInTheDocument();
    });

    it("should render the option label in the value context", () => {
      const option = { label: "Option 1", value: "option1" };

      const { getByText } = render(
        <div>{formatOptionLabel(option, { context: "value" })}</div>
      );

      expect(getByText("Option 1")).toBeInTheDocument();
    });

    it("should not render additional info in the value context", () => {
      const option = {
        label: "Option 1",

        value: "option1",

        additionalInfo: { key: "value" },
      };

      const { queryByText } = render(
        <div>{formatOptionLabel(option, { context: "value" })}</div>
      );

      expect(queryByText("key: value")).not.toBeInTheDocument();
    });
  });

  test("should call setFieldValue and setFieldTouched when an option is selected", () => {
    const { getByText } = renderComponent();

    const input = getByText("Select an option");

    fireEvent.mouseDown(input);

    const option = getByText("Option 1");

    fireEvent.click(option);

    expect(mockProps.form.setFieldValue).toHaveBeenCalledWith(
      "dropdown",
      "option1"
    );
    expect(mockProps.form.setFieldTouched).toHaveBeenCalledWith(
      "dropdown",
      true,
      false
    );
  });

  // test("should not call setFieldValue and setFieldTouched when the dropdown is disabled", () => {
  //   const { getByText } = renderComponent({ disabled: true });

  //   const input = getByText("Select an option");

  //   fireEvent.mouseDown(input);

  //   const option = getByText("Option 1");

  //   fireEvent.click(option);

  //   expect(mockProps.form.setFieldValue).not.toHaveBeenCalled();
  //   expect(mockProps.form.setFieldTouched).not.toHaveBeenCalled();
  // });

  // test("should call setFieldValue and setFieldTouched with multiple values when isMulti is true", () => {
  //   const { getByText } = renderComponent({ isMulti: true });

  //   const input = getByText("Select an option");

  //   fireEvent.mouseDown(input);

  //   const option1 = getByText("Option 1");
  //   const option2 = getByText("Option 2");

  //   fireEvent.click(option1);
  //   fireEvent.click(option2);

  //   expect(mockProps.form.setFieldValue).toHaveBeenCalledWith("dropdown", [
  //     "option1",
  //     "option2",
  //   ]);
  //   expect(mockProps.form.setFieldTouched).toHaveBeenCalledWith(
  //     "dropdown",
  //     true,
  //     false
  //   );
  // });
  test("should not call setFieldValue and setFieldTouched when the dropdown is disabled", () => {
    const { getByText } = renderComponent({ disabled: true });

    const input = getByText("Select an option");
    console.log(input, "inpuuuuuuuuuu");

    fireEvent.mouseDown(input);

    const option = getByText("Option 1");

    fireEvent.click(option);

    expect(mockProps.form.setFieldValue).toHaveBeenCalledTimes(0);
    expect(mockProps.form.setFieldTouched).toHaveBeenCalledTimes(0);
  });

  test("should call setFieldValue and setFieldTouched with multiple values when isMulti is true", () => {
    const { getByText } = renderComponent({ isMulti: true });

    const input = getByText("Select an option");

    fireEvent.mouseDown(input);

    const option1 = getByText("Option 1");
    const option2 = getByText("Option 2");

    fireEvent.click(option1);
    fireEvent.click(option2);

    expect(mockProps.form.setFieldValue).toHaveBeenCalledTimes(2);
    expect(mockProps.form.setFieldTouched).toHaveBeenCalledTimes(1);
    expect(mockProps.form.setFieldValue).toHaveBeenNthCalledWith(
      1,
      "dropdown",
      "option1"
    );
    expect(mockProps.form.setFieldValue).toHaveBeenNthCalledWith(
      2,
      "dropdown",
      "option2"
    );
  });
});
