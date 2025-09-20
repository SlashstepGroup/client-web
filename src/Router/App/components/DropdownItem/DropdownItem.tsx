import CheckCircleIcon from "#components/icons/CheckCircleIcon";
import React from "react";
import { item as itemStyle } from "./DropdownItem.module.css";

function DropdownItem({isSelected = false, description, onClick, children}: { isSelected?: boolean, description?: ReactNode, onClick: () => void, children: ReactNode }) {

  return (
    <li className={itemStyle}>
      <button type="button" onClick={onClick}>
        <section>
          <section>{children}</section>
          {description ? <p className="item-description">{description}</p> : null}
        </section>
        {isSelected ? <CheckCircleIcon /> : null}
      </button>
    </li>
  )

}

export default React.memo(DropdownItem);