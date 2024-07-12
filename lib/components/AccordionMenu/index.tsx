import React from "react";

interface accordionProps {
  menu?: { label: string; value: string }[];
}
const AccordionMenu: React.FC<accordionProps> = () => {
  return (
    <div>
      <p>Accordion's menu is getting ready </p>
    </div>
  );
};
export default AccordionMenu;
