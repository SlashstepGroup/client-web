import React from "react";
import { popupContent as popupContentStyle } from "./PopupContent.module.css";

function PopupContent({children}: {children: React.ReactNode}) {

  return (
    <section className={popupContentStyle}>
      {children}
    </section>
  )

}

export default React.memo(PopupContent);