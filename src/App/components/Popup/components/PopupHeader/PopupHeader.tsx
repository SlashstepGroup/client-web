import React from "react";
import { popupHeader as popupHeaderStyle } from "./PopupHeader.module.css";
import CloseIcon from "../../../../icons/CloseIcon";

function PopupHeader({children, onClose}: {children: React.ReactNode, onClose?: (() => void)}) {

  return (
    <section className={popupHeaderStyle}>
      <section>
        <b>{children}</b>
      </section>
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