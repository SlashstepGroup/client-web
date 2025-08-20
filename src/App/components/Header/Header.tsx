import React, { ReactElement } from "react";
import { header as headerStyle, scopeButton as scopeButtonStyle, sidebarButtonToggle as sidebarButtonToggleStyle } from "./Header.module.css";
import HomeIcon from "../../icons/HomeIcon";

function Header({onSidebarToggle}: {onSidebarToggle?: () => void}): ReactElement {

  return (
    <header id={headerStyle}>
      <button type="button" onClick={onSidebarToggle} id={sidebarButtonToggleStyle}>
        Waltz
      </button>
      <button type="button" id={scopeButtonStyle}>
        <HomeIcon />
        <span>Beastslash</span>
      </button>
    </header>
  );

}

export default React.memo(Header);