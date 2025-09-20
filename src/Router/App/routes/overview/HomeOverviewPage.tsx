import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import MenuList from "#components/MenuList/MenuList";
import MenuListLinkItem from "#components/menu-list-items/MenuListLinkItem/MenuListLinkItem";
import Tip from "#components/Tip/Tip";
import FlagIcon from "#components/icons/FlagIcon";
import HomeIcon from "#components/icons/HomeIcon";
import React, { useEffect } from "react";

function HomeOverviewPage({setHeaderTitle, setFallbackBackPathname}: {setHeaderTitle: (newHeaderTitle: string | null) => void, setFallbackBackPathname: (newPathname: string | null) => void}) {

  useEffect(() => {

    document.title = "Overview • Slashstep"

    setHeaderTitle("Welcome");
    setFallbackBackPathname("/");

  }, [setHeaderTitle, setFallbackBackPathname]);

  return (
    <section id="main-container">
      <main>
        <h1>Welcome to Slashstep</h1>
        <p>Select an instance to get started.</p>
      </main>
    </section>
  );

}

export default React.memo(HomeOverviewPage);