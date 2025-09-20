import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Dropdown from "#components/Dropdown/Dropdown";
import DropdownItem from "#components/DropdownItem/DropdownItem";
import WorkIcon from "#components/icons/WorkIcon";
import MenuListLinkItem from "#components/menu-list-items/MenuListLinkItem/MenuListLinkItem";
import MenuList from "#components/MenuList/MenuList";
import Spinner from "#components/Spinner/Spinner";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

function ItemListPage() {

  const [searchParams] = useSearchParams();
  const requestedQuery = searchParams.get("query");
  const [query, setQuery] = useState(requestedQuery);
  const [shownQuery, setShownQuery] = useState(query ?? "");
  const [maximumItemCount, setMaximumItemCount] = useState<number | null>(null);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <Breadcrumb icon={<WorkIcon />} link="/items">Items</Breadcrumb>
      </BreadcrumbList>
      <main>
        <section>
          <input type="text" disabled className="query-input" value={shownQuery} placeholder="Enter a query. Any item that matches this condition will be returned." />
          <p className="item-description">
            <Spinner />
            <span>Searching...</span>
          </p>
        </section>
        <section>
          <MenuList>
            <MenuListLinkItem label="Do something" description="localhost:3001 • SOME-1" link="#" />
            <MenuListLinkItem label="Do something else" description="localhost:3001 • SOME-2" link="#" />
            <MenuListLinkItem label="Do another thing" description="localhost:3001 • SOME-3" link="#" />
            <MenuListLinkItem label="Do something" description="localhost:3001 • SOME-4" link="#" />
          </MenuList>
          <p className="pagination-dropdown-container">
            <span>Showing</span>
            <Dropdown name="Maximum shown items" isOpen={false} onClick={() => null} selectedItem={"4"} isDisabled>
              <DropdownItem onClick={() => null}>4</DropdownItem>
              <DropdownItem onClick={() => setMaximumItemCount(25)}>25</DropdownItem>
              <DropdownItem onClick={() => setMaximumItemCount(50)}>50</DropdownItem>
              <DropdownItem onClick={() => setMaximumItemCount(100)}>100</DropdownItem>
              <DropdownItem onClick={() => setMaximumItemCount(250)}>250</DropdownItem>
              <DropdownItem onClick={() => setMaximumItemCount(500)}>500</DropdownItem>
            </Dropdown>
            <span>items of 4</span>
          </p>
        </section>
      </main>
    </section>
  );

}

export default React.memo(ItemListPage);