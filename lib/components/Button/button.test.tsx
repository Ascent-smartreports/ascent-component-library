import { render, fireEvent } from "@testing-library/react";
import { Button } from "./index";

describe("Button component", () => {
  it("renders with the correct label", () => {
    const label = "Click me!";
    const { getByText } = render(
      <Button label={label} onClick={() => {}} testId={""} />
    );
    expect(getByText(label)).toBeDefined();
  });

  it("displays an alert when clicked", () => {
    const { getByRole } = render(
      <Button label="Click me!" onClick={() => {}} testId={""} />
    );
    const button = getByRole("button");
    fireEvent.click(button);
    expect(window.alert).toBeDefined();
  });

  it("renders with the correct type", () => {
    const { getByRole } = render(
      <Button label="Click me!" onClick={() => {}} type="button" testId={""} />
    );
    const button = getByRole("button");
    expect(button.getAttribute("type")).toBe("button");
  });

  it("renders with the correct button type", () => {
    const { getByRole } = render(
      <Button
        label="Click me!"
        onClick={() => {}}
        buttonType="outlined"
        testId={""}
      />
    );
    const button = getByRole("button");
    expect(button.classList.contains("bg-backgroundLight")).toBe(true);
  });

  it("renders with custom styles", () => {
    const { getByRole } = render(
      <Button
        label="Click me!"
        onClick={() => {}}
        customStyle="text-red-500"
        testId={""}
      />
    );
    const button = getByRole("button");
    expect(button.classList.contains("text-red-500")).toBe(true);
  });

  it("renders with an icon", () => {
    const icon = <div>Icon</div>;
    const { getByText } = render(
      <Button label="Click me!" onClick={() => {}} icon={icon} testId={""} />
    );
    expect(getByText("Icon")).toBeDefined();
  });

  it("is disabled when isDisabled is true", () => {
    const { getByRole } = render(
      <Button
        label="Click me!"
        onClick={() => {}}
        isDisabled={true}
        testId={""}
      />
    );
    const button = getByRole("button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it("has the correct testId", () => {
    const testId = "button-test-id";
    const { getByTestId } = render(
      <Button label="Click me!" onClick={() => {}} testId={testId} />
    );
    expect(getByTestId(testId)).toBeDefined();
  });
});
