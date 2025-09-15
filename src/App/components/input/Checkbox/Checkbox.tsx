import CheckIcon from "#components/icons/CheckIcon";
import React from "react";
import { checkbox as checkboxStyle, checked as checkedStyle } from "./Checkbox.module.css";

function Checkbox({isChecked, onClick}: {isChecked: boolean, onClick: (event: React.MouseEvent) => void}) {

  return (
    <button className={`${checkboxStyle}${isChecked ? ` ${checkedStyle}` : ""}`} onClick={onClick} type="button">
      <CheckIcon />
    </button>
  )

}

export default React.memo(Checkbox);