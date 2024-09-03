import React, { useState } from "react";
import "../../assets/stepperTabs.css";
import { Button } from "../Button";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface StepperTabsProps {
  tabs: Tab[];
  onSubmit: () => void;
  initialActiveTab?: number;
  headerActions?: React.ReactNode;
}

export const StepperTabs: React.FC<StepperTabsProps> = ({
  tabs,
  onSubmit,
  initialActiveTab = 0,
  headerActions,
}) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  const handlePrev = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const handleNext = () => {
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="stepper-tabs-container">
      <div className="stepper-tabs-header">
        <div className="tabs-buttons">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab-label ${activeTab === index ? "active" : ""}`}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-x-3 w-[16vw]">
          <Button
            label={"Prev"}
            onClick={handlePrev}
            testId={"prevBtn"}
            isDisabled={activeTab === 0}
          />

          {activeTab < tabs.length - 1 && (
            <Button label={"Next"} onClick={handleNext} testId={"nextBtn"} />
          )}
          {activeTab === tabs.length - 1 && (
            <Button
              label={"Submit"}
              onClick={handleSubmit}
              testId={"submitBtn"}
            />
          )}
          {headerActions}
        </div>
      </div>
      <div className="stepper-tabs-content">{tabs[activeTab].content}</div>
    </div>
  );
};
