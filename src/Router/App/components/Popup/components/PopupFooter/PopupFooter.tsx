import React from "react";
import { popupFooter as popupFooterStyle } from "./PopupFooter.module.css";

function PopupFooter({children}: {children: React.ReactNode}) {

  return (
    <section className={popupFooterStyle}>
      {children}
    </section>
  )

}

export default React.memo(PopupFooter);