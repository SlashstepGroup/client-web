import React from "react";
import { tip as tipStyle, warning as warningStyle, error as errorStyle } from "./Tip.module.css";
import ExclamationMarkCircleIcon from "#icons/ExclamationMarkCircleIcon";
import AboutIcon from "#icons/AboutIcon";
import StopSignIcon from "#icons/StopSignIcon";

function Tip({ children, type }: { children: React.ReactNode, type?: "Error" | "Warning" | "Info" }) {

  return (
    <section className={`${tipStyle} ${type === "Warning" ? warningStyle : (type === "Error" ? errorStyle : "")}`}>
      {
        type === "Warning" ? <ExclamationMarkCircleIcon /> : (type === "Error" ? <StopSignIcon /> : <AboutIcon />)
      }
      <span>{children}</span>
    </section>
  );

}

export default React.memo(Tip);