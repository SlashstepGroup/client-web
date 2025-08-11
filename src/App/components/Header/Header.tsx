import React, { ReactElement } from "react";
import { header as headerStyle, scopeButton as scopeButtonStyle } from "./Header.module.css";
import HomeIcon from "../../icons/HomeIcon";

function Header() {

  return (
    <header id={headerStyle}>
      <h1>Gaze</h1>
      <button type="button" id={scopeButtonStyle}>
        <HomeIcon />
        <span>Beastslash</span>
      </button>
    </header>
  );

}

export default React.memo(Header);