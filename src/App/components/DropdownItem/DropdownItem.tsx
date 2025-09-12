import CheckCircleIcon from "#icons/CheckCircleIcon";
import React from "react";
import { item as itemStyle } from "./DropdownItem.module.css";

function DropdownItem({isSelected = false, description, label, onClick}: { isSelected?: boolean, description?: ReactNode, onClick: () => void, label?: React.ReactNode }) {

  return (
    <li className={itemStyle}>
      <button type="button" onClick={onClick}>
        <section>
          <section>{label}</section>
          {description ? <p className="item-description">{description}</p> : null}
        </section>
        {isSelected ? <CheckCircleIcon /> : null}
      </button>
    </li>
  )

}

export default React.memo(DropdownItem);