import React from "react";
import { item as itemStyle, open as openStyle, information as informationStyle, toggle as toggleStyle, children as childrenStyle, iconContainer as iconContainerStyle } from "./MenuListDropdownItem.module.css";
import DropdownArrowIcon from "#components/icons/DropdownArrowIcon";
import MenuList from "#components/MenuList/MenuList";

function MenuListDropdownItem({label, icon, description, children = null}: {label: React.ReactNode, icon?: React.ReactNode, description?: React.ReactNode, children?: React.ReactNode}) {

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <li className={itemStyle}>
      <section className={`${toggleStyle}${isOpen ? ` ${openStyle}` : ""}`} onClick={() => setIsOpen(!isOpen)}>
        <section>
          <section className={iconContainerStyle}>
            {icon}
          </section>
          <section className={informationStyle}>
            <span>{label}</span>
            {description ? <p>{description}</p> : null}
          </section>
        </section>
        <DropdownArrowIcon />
      </section>
      {
        isOpen ? (
          <section className={childrenStyle}>
            {children}
          </section>
        ) : null
      }
    </li>
  );

}

export default React.memo(MenuListDropdownItem);