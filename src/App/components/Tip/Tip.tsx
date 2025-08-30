import React from "react";
import { tip as tipStyle, warning as warningStyle } from "./Tip.module.css";
import ExclamationMarkCircleIcon from "#icons/ExclamationMarkCircleIcon";
import AboutIcon from "#icons/AboutIcon";

function Tip({ children, type }: { children: React.ReactNode, type?: "Warning" | "Info" }) {

  return (
    <section className={`${tipStyle} ${type === "Warning" ? warningStyle : ""}`}>
      {
        type === "Warning" ? <ExclamationMarkCircleIcon /> : <AboutIcon />
      }
      <span>{children}</span>
    </section>
  );

}

export default React.memo(Tip);