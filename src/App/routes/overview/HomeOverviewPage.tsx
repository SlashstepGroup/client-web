import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import MenuList from "#components/MenuList/MenuList";
import MenuListLinkItem from "#components/MenuListLinkItem/MenuListLinkItem";
import Spinner from "#components/Spinner/Spinner";
import Tip from "#components/Tip/Tip";
import HomeIcon from "#icons/HomeIcon";
import React, { useEffect } from "react";

function HomeOverviewPage({setHeaderTitle, setFallbackBackPathname}: {setHeaderTitle: (newHeaderTitle: string | null) => void, setFallbackBackPathname: (newPathname: string | null) => void}) {

  useEffect(() => {

    document.title = "Overview • Slashstep"

    setHeaderTitle("Welcome");
    setFallbackBackPathname("/");

  }, [setHeaderTitle, setFallbackBackPathname]);

  return (
    <section id="main-container">
      <BreadcrumbList>
      </BreadcrumbList>
      <main>
        <h1>Welcome to Slashstep</h1>
        <section>
          <h2>Your recent work</h2>
          <MenuList>
            <MenuListLinkItem link="/instances/beastslash.com/workspaces/staff/projects/general/items/12342" label="Do something" description="Viewed 1 day ago • Story" />
            <MenuListLinkItem link="/instances/beastslash.com/workspaces/staff/projects/general/items/12342" label="Do something" description="Updated 1 day ago • Task" />
            <MenuListLinkItem link="/instances/beastslash.com/workspaces/staff/projects/general/items/12342" label="Do something" description="Assigned 1 day ago • Task" />
            <MenuListLinkItem link="/instances/beastslash.com/workspaces/staff/projects/general/items/12342" label="Do something" description="Created 1 day ago • Epic" />
            <MenuListLinkItem link="/recent" label="More items" />
          </MenuList>
        </section>
        <section>
          <h2>Saved resources</h2>
          <Tip>You don't have any saved resources yet.</Tip>
        </section>
      </main>
    </section>
  );

}

export default React.memo(HomeOverviewPage);