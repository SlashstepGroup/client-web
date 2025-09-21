import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Dropdown from "#components/Dropdown/Dropdown";
import DropdownItem from "#components/DropdownItem/DropdownItem";
import DropdownItemList from "#components/DropdownItemList/DropdownItemList";
import CheckIcon from "#components/icons/CheckIcon";
import WorkIcon from "#components/icons/WorkIcon";
import MenuListLinkItem from "#components/menu-list-items/MenuListLinkItem/MenuListLinkItem";
import MenuList from "#components/MenuList/MenuList";
import Spinner from "#components/Spinner/Spinner";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function ItemListPage() {

  const [searchParams] = useSearchParams();
  const requestedQuery = searchParams.get("query");
  const [query, setQuery] = useState(requestedQuery);
  const [shownQuery, setShownQuery] = useState(query ?? "");
  const [maximumItemCount, setMaximumItemCount] = useState<number | null>(null);
  const [totalItemCount, setTotalItemCount] = useState<number>(15);
  const [isEasyModeEnabled, setIsEasyModeEnabled] = useState<boolean>(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);

  useEffect(() => {

  }, []);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <Breadcrumb icon={<WorkIcon />} link="/items">Items</Breadcrumb>
      </BreadcrumbList>
      <main>
        <section>
          <section className="button-list">
            <button type="button" className={isEasyModeEnabled ? "primary-button" : undefined} onClick={() => setIsEasyModeEnabled(true)} disabled>
              <span>Easy mode</span>
              {isEasyModeEnabled ? <CheckIcon /> : null}
            </button>
            <button type="button" className={!isEasyModeEnabled ? "primary-button" : undefined} onClick={() => setIsEasyModeEnabled(false)}>
              <span>Advanced mode</span>
              {isEasyModeEnabled ? null : <CheckIcon />}
            </button>
          </section>
          {
            isEasyModeEnabled ? (
              <section className="button-list">
                <input type="text" placeholder="Type to search" />
                <Dropdown name="Assignee" selectedItem={"Assignee"} isOpen={false} onClick={() => null} />
                <Dropdown name="Filter" isOpen={isFilterDropdownOpen} onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)} selectedItem={"Add filter"}>
                  <DropdownItemList>
                    <DropdownItem onClick={() => null}>
                      Assignee
                    </DropdownItem>
                    <DropdownItem onClick={() => null}>
                      Type
                    </DropdownItem>
                  </DropdownItemList>
                </Dropdown>
              </section>
            ) : <input type="text" className="query-input" value={shownQuery} placeholder="Enter a query. Any item that matches this condition will be returned." onChange={(event) => setShownQuery(event.target.value)} />
          }
          {/* <p>Type a query to get started.</p>
          <section style={{display: "flex", alignItems: "center", gap: "15px"}}>
            <Spinner />
            <p>Searching...</p>
          </section> */}
          <section style={{display: "flex", alignItems: "center", gap: "15px"}}>
            <span style={{width: "20px", height: "20px"}}>
              <CheckIcon />
            </span>
            <p>Found {totalItemCount} items.</p>
          </section>
        </section>
        <section>
          <MenuList>
            <MenuListLinkItem label="Add feature: Stage Maker" description="Beastslash ⦁ Everyone Destroys the World ⦁ Stage Maker" link="/instances/0/workspaces/0/projects/0/items/0" />
            <MenuListLinkItem label="Do something else" description="Beastslash ⦁ Everyone Destroys the World ⦁ STAGEMAKER-1" link="#" />
            <MenuListLinkItem label="Do another thing" description="Beastslash ⦁ Everyone Destroys the World ⦁ STAGEMAKER-1" link="#" />
            <MenuListLinkItem label="Do something" description="Beastslash ⦁ Everyone Destroys the World ⦁ STAGEMAKER-1" link="#" />
            <MenuListLinkItem label="Do something" description="Beastslash ⦁ Everyone Destroys the World ⦁ STAGEMAKER-1" link="#" />
            <MenuListLinkItem label="Do something" description="Beastslash ⦁ Everyone Destroys the World ⦁ STAGEMAKER-1" link="#" />
            <MenuListLinkItem label="Do something" description="Beastslash ⦁ Everyone Destroys the World ⦁ STAGEMAKER-1" link="#" />
            <MenuListLinkItem label="Do something" description="Beastslash ⦁ Everyone Destroys the World ⦁ STAGEMAKER-1" link="#" />
            <MenuListLinkItem label="Do something" description="Beastslash ⦁ Everyone Destroys the World ⦁ STAGEMAKER-1" link="#" />
            <MenuListLinkItem label="Do something" description="Beastslash ⦁ Everyone Destroys the World ⦁ STAGEMAKER-1" link="#" />
            <MenuListLinkItem label="Do something" description="Beastslash ⦁ Everyone Destroys the World ⦁ STAGEMAKER-1" link="#" />
            <MenuListLinkItem label="Do something" description="Beastslash ⦁ Everyone Destroys the World ⦁ STAGEMAKER-1" link="#" />
            <MenuListLinkItem label="Do something" description="Beastslash ⦁ Everyone Destroys the World ⦁ STAGEMAKER-1" link="#" />
            <MenuListLinkItem label="Do something" description="Beastslash ⦁ Everyone Destroys the World ⦁ STAGEMAKER-1" link="#" />
            <MenuListLinkItem label="Do something" description="Beastslash ⦁ Everyone Destroys the World ⦁ STAGEMAKER-1" link="#" />
          </MenuList>
          <section className="pagination-dropdown-container">
            <p>Showing</p>
            <Dropdown name="Maximum shown items" isOpen={false} onClick={() => null} selectedItem={"15"} isDisabled>
              <DropdownItem onClick={() => null}>15</DropdownItem>
              <DropdownItem onClick={() => setMaximumItemCount(25)}>25</DropdownItem>
              <DropdownItem onClick={() => setMaximumItemCount(50)}>50</DropdownItem>
              <DropdownItem onClick={() => setMaximumItemCount(100)}>100</DropdownItem>
              <DropdownItem onClick={() => setMaximumItemCount(250)}>250</DropdownItem>
              <DropdownItem onClick={() => setMaximumItemCount(500)}>500</DropdownItem>
            </Dropdown>
            <p>items of {totalItemCount}</p>
          </section>2
        </section>
      </main>
    </section>
  );

}

export default React.memo(ItemListPage);