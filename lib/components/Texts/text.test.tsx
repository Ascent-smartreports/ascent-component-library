import {
  render,
  fireEvent,
  waitFor,
  getAllByText,
} from "@testing-library/react";
import { Heading, SubHeading, Label, ToolTipLabel, Paragraph } from ".";

describe("Text Components", () => {
  describe("Heading", () => {
    it("renders children", () => {
      const { getByText } = render(<Heading>Heading Text</Heading>);
      expect(getByText("Heading Text")).toBeInTheDocument();
    });

    it("renders with default className", () => {
      const { getByText } = render(<Heading>Heading Text</Heading>);
      expect(getByText("Heading Text")).toHaveClass("heading");
    });

    it("renders with custom className", () => {
      const { getByText } = render(
        <Heading className="custom-class">Heading Text</Heading>
      );
      expect(getByText("Heading Text")).toHaveClass("custom-class");
    });

    // it("calls onTextClick when clicked", () => {
    //   const onTextClick = jest.fn();
    //   const { getByText } = render(
    //     <Heading onTextClick={onTextClick}>Heading Text</Heading>
    //   );
    //   const heading = getByText("Heading Text");
    //   fireEvent.click(heading);
    //   expect(onTextClick).toHaveBeenCalledTimes(1);
    // });
    it("calls onTextClick when clicked", () => {
      const onTextClick = jest.fn();
      const { getByText } = render(
        <Heading onTextClick={() => onTextClick()}>Heading Text</Heading>
      );
      const heading = getByText("Heading Text");
      fireEvent.click(heading);
      expect(onTextClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("SubHeading", () => {
    it("renders children", () => {
      const { getByText } = render(<SubHeading>SubHeading Text</SubHeading>);
      expect(getByText("SubHeading Text")).toBeInTheDocument();
    });

    it("renders with default className", () => {
      const { getByText } = render(<SubHeading>SubHeading Text</SubHeading>);
      expect(getByText("SubHeading Text")).toHaveClass("subHeading");
    });

    it("renders with custom className", () => {
      const { getByText } = render(
        <SubHeading className="custom-class">SubHeading Text</SubHeading>
      );
      expect(getByText("SubHeading Text")).toHaveClass("custom-class");
    });

    it("calls onTextClick when clicked", () => {
      const onTextClick = jest.fn();
      const { getByText } = render(
        <SubHeading onTextClick={onTextClick}>SubHeading Text</SubHeading>
      );
      const subheading = getByText("SubHeading Text");
      fireEvent.click(subheading);
      expect(onTextClick).toHaveBeenCalledTimes(1);
    });

    //   it("calls onTextClick when clicked", () => {
    //     const onTextClick = jest.fn();
    //     const { getByText } = render(
    //       <Heading onTextClick={() => onTextClick()}>Heading Text</Heading>
    //     );
    //     const heading = getByText("Heading Text");
    //     fireEvent.click(heading);
    //     expect(onTextClick).toHaveBeenCalledTimes(1);
    //   });
  });

  describe("Label", () => {
    it("renders children", () => {
      const { getByText } = render(<Label>Label Text</Label>);
      expect(getByText("Label Text")).toBeInTheDocument();
    });

    it("renders with default className", () => {
      const { getByText } = render(<Label>Label Text</Label>);
      expect(getByText("Label Text")).toHaveClass("label");
    });

    it("renders with custom className", () => {
      const { getByText } = render(
        <Label className="custom-class">Label Text</Label>
      );
      expect(getByText("Label Text")).toHaveClass("custom-class");
    });

    it("calls onTextClick when clicked", () => {
      const onTextClick = jest.fn();
      const { getByText } = render(
        <Label onTextClick={onTextClick}>Label Text</Label>
      );
      fireEvent.click(getByText("Label Text"));
      expect(onTextClick).toHaveBeenCalledTimes(1);
    });

    it("renders with htmlFor", () => {
      const { getByText } = render(<Label htmlFor="test-id">Label Text</Label>);
      expect(getByText("Label Text")).toHaveAttribute("for", "test-id");
    });
  });

  describe("ToolTipLabel", () => {
    it("renders children", () => {
      const { getByText } = render(
        <ToolTipLabel>ToolTipLabel Text</ToolTipLabel>
      );
      expect(getByText("ToolTipLabel Text")).toBeInTheDocument();
    });

    it("renders with default className", () => {
      const { getByText } = render(
        <ToolTipLabel>ToolTipLabel Text</ToolTipLabel>
      );
      expect(getByText("ToolTipLabel Text")).toHaveClass("label");
    });

    it("renders with custom className", () => {
      const { getByText } = render(
        <ToolTipLabel className="custom-class">ToolTipLabel Text</ToolTipLabel>
      );
      expect(getByText("ToolTipLabel Text")).toHaveClass("custom-class");
    });

    it("calls onTextClick when clicked", () => {
      const onTextClick = jest.fn();
      const { getByText } = render(
        <ToolTipLabel onTextClick={onTextClick}>ToolTipLabel Text</ToolTipLabel>
      );
      fireEvent.click(getByText("ToolTipLabel Text"));
      expect(onTextClick).toHaveBeenCalledTimes(1);
    });

    it("renders tooltip on hover", async () => {
      const { getByText, container } = render(
        <ToolTipLabel>ToolTipLabel Text</ToolTipLabel>
      );

      const label = getByText("ToolTipLabel Text");

      fireEvent.mouseEnter(label);

      await waitFor(() =>
        expect(getAllByText(container, "ToolTipLabel Text")[1]).toHaveStyle(
          "visibility: visible"
        )
      );
    });

    it("hides tooltip on mouse leave", async () => {
      const { getByText, container } = render(
        <ToolTipLabel>ToolTipLabel Text</ToolTipLabel>
      );

      const label = getByText("ToolTipLabel Text");

      fireEvent.mouseEnter(label);

      fireEvent.mouseLeave(label);

      await waitFor(() => {
        const tooltips = getAllByText(container, "ToolTipLabel Text");

        expect(tooltips.length).toBe(1);
      });
    });
  });

  describe("Paragraph", () => {
    it("renders children", () => {
      const { getByText } = render(<Paragraph>Paragraph Text</Paragraph>);
      expect(getByText("Paragraph Text")).toBeInTheDocument();
    });

    it("renders with default className", () => {
      const { getByText } = render(<Paragraph>Paragraph Text</Paragraph>);
      expect(getByText("Paragraph Text")).toHaveClass("paragraph");
    });

    it("renders with custom className", () => {
      const { getByText } = render(
        <Paragraph className="custom-class">Paragraph Text</Paragraph>
      );
      expect(getByText("Paragraph Text")).toHaveClass("custom-class");
    });

    it("renders with error type", () => {
      const { getByText } = render(
        <Paragraph type="error">Paragraph Text</Paragraph>
      );
      expect(getByText("Paragraph Text")).toHaveClass("errorText");
    });

    it("calls onTextClick when clicked", () => {
      const onTextClick = jest.fn();
      const { getByText } = render(
        <Paragraph onTextClick={onTextClick}>Paragraph Text</Paragraph>
      );
      fireEvent.click(getByText("Paragraph Text"));
      expect(onTextClick).toHaveBeenCalledTimes(1);
    });
  });
});
