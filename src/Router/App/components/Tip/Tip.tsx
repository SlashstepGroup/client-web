import React from "react";
import { tip as tipStyle, warning as warningStyle, error as errorStyle } from "./Tip.module.css";
import ExclamationMarkCircleIcon from "#components/icons/ExclamationMarkCircleIcon";
import AboutIcon from "#components/icons/AboutIcon";
import StopSignIcon from "#components/icons/StopSignIcon";

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