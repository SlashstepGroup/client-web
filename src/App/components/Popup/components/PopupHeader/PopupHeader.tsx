import React from "react";
import { popupHeader as popupHeaderStyle } from "./PopupHeader.module.css";
import CloseIcon from "./Icons/CloseIcon/CloseIcon";

function PopupHeader({children, onClose}: {children: React.ReactNode, onClose?: (() => void)}) {

  return (
    <section id={popupHeaderStyle}>
      <section>{children}</section>
      {
        onClose ? (
          <button type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        ) : null
      }
    </section>
  )

}

export default React.memo(PopupHeader);