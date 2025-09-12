import React, { ReactElement, useEffect, useState } from "react";
import { pageName as pageNameStyle, header as headerStyle, scopeButton as scopeButtonStyle, sidebarButtonToggle as sidebarButtonToggleStyle, homeButton as homeButtonStyle, backButton as backButtonStyle } from "./Header.module.css";
import CloudIcon from "#icons/CloudIcon";
import Skeleton from "#components/Skeleton/Skeleton";
import MenuIcon from "#icons/MenuIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "#icons/HomeIcon";
import { Instance, Project, Workspace } from "@waltzgroup/javascript-sdk";
import ClipboardIcon from "#icons/ClipboardIcon";
import WorldIcon from "#icons/WorldIcon";
import BackArrowIcon from "#icons/BackArrowIcon";

function Header({onSidebarToggle, scope, isUpdatingResources, fallbackBackPathname, title}: {onSidebarToggle?: () => void, scope: Instance | Workspace | Project | null, isUpdatingResources: boolean, title: string | null, fallbackBackPathname: string | null}): ReactElement {

  const [backURLStack, setBackURLStack] = useState<string[]>([]);

  const scopeIcon = scope ? (
    scope instanceof Project ? <ClipboardIcon /> : (
      scope instanceof Workspace ? <WorldIcon /> : <CloudIcon />
    )
  ) : <HomeIcon />;

  const scopeName = scope ? (
    scope instanceof Project ? scope.displayName : (
      scope instanceof Workspace ? scope.displayName : scope.displayName
    )
  ) : "Select a resource";

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {

  }, [pathname, backURLStack]);

  return (
    <header id={headerStyle}>
      {
        backURLStack.length > 0 || fallbackBackPathname ? (
          <button type="button" onClick={() => navigate(backURLStack[backURLStack.length - 1] ?? fallbackBackPathname)} id={backButtonStyle}>
            <BackArrowIcon />
          </button>
        ) : null
      }
      {
        title ? (
          <h1 id={pageNameStyle}>{title}</h1>
        ) : null
      }
      <button type="button" onClick={onSidebarToggle} id={sidebarButtonToggleStyle}>
        <MenuIcon />
      </button>
      <Link to="/" id={homeButtonStyle}>Slashstep</Link>
      <button type="button" id={scopeButtonStyle}>
        {
          isUpdatingResources ? <Skeleton width={100} height={20} /> : (
            <>
              {scopeIcon}
              <span>
                {scopeName}
              </span>
            </>
          )
        }
      </button>
    </header>
  );

}

export default React.memo(Header);