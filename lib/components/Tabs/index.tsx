import React, { useState, useRef, useEffect } from "react";
import "../../assets/Tabs.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  initialActiveTab?: number;
  headerActions?: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  initialActiveTab = 0,
  headerActions,
}) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const checkScrollPosition = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const { scrollLeft, clientWidth } = tabsRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      tabsRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const currentTabsRef = tabsRef.current;
    checkScrollPosition();
    const handleResize = () => checkScrollPosition();

    if (currentTabsRef) {
      currentTabsRef.addEventListener("scroll", checkScrollPosition);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      if (currentTabsRef) {
        currentTabsRef.removeEventListener("scroll", checkScrollPosition);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        <div className="scroll-arrow-container">
          {showLeftArrow && (
            <button
              className="scroll-arrow left-arrow"
              onClick={() => scrollTabs("left")}
            >
              <FiChevronLeft size={20} />
            </button>
          )}
        </div>
        <div className="tabs-buttons-container" ref={tabsRef}>
          <div className="tabs-buttons">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`tab-label ${activeTab === index ? "active" : ""}`}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </div>
        <div className="scroll-arrow-container">
          {showRightArrow && (
            <button
              className="scroll-arrow right-arrow"
              onClick={() => scrollTabs("right")}
            >
              <FiChevronRight size={20} />
            </button>
          )}
        </div>
        <div className="header-actions">{headerActions}</div>
      </div>
      <div className="tabs-content">{tabs[activeTab].content}</div>
    </div>
  );
};

