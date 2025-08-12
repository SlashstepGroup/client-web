import React from "react";
import { spinner as spinnerStyle } from "./Spinner.module.css";

function Spinner() {

  return (
    <svg width="24" height="24" stroke="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={spinnerStyle}>
      <g>
        <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle>
      </g>
    </svg>
  )

}

export default React.memo(Spinner);