import React from "react";
import { tip as tipStyle } from "./Tip.module.css";
import { useNavigate } from "react-router-dom";

function Tip({ children }: { children: React.ReactNode }) {

  return (
    <section className={tipStyle}>
      {children}
    </section>
  );

}

export default React.memo(Tip);