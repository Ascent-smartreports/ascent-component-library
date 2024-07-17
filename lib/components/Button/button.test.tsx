import { render, fireEvent } from "@testing-library/react";
import Button from "./index";

describe("Button component", () => {
  it("renders with the correct label", () => {
    const label = "Click me!";
    const { getByText } = render(
      <Button testId="" label={label} onClick={() => {}} />
    );
    expect(getByText(label)).toBeDefined();
  });

  it("displays an alert when clicked", () => {
    const { getByRole } = render(
      <Button label="Click me!" testId="" onClick={() => {}} />
    );
    const button = getByRole("button");
    fireEvent.click(button);
    expect(window.alert).toBeDefined();
  });
});

