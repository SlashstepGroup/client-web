import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Dropdown from "#components/Dropdown/Dropdown";
import DropdownItem from "#components/DropdownItem/DropdownItem";
import DropdownItemList from "#components/DropdownItemList/DropdownItemList";
import CheckIcon from "#components/icons/CheckIcon";
import StopSignIcon from "#components/icons/StopSignIcon";
import WorkIcon from "#components/icons/WorkIcon";
import Spinner from "#components/Spinner/Spinner";
import { Client, Instance, Item } from "@slashstepgroup/javascript-sdk";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ItemSearchError from "./ItemSearchError";
import ViewSearchErrorsPopup from "./components/ViewSearchErrorsPopup/ViewSearchErrorsPopup";

type ItemListPageProperties = {
  setHeaderTitle: (newHeaderTitle: string | null) => void; 
  setFallbackBackPathname: (newPathname: string | null) => void;
  client: Client;
}

export type InstanceItemSearchRequestResult = PromiseSettledResult<{hostname: string; items: Item[]}>;

function ItemListPage({client, setHeaderTitle, setFallbackBackPathname}: ItemListPageProperties) {

  const [searchParams] = useSearchParams();
  const requestedQuery = decodeURIComponent(searchParams.get("query") ?? "");
  const navigate = useNavigate();
  const [shownQuery, setShownQuery] = useState(requestedQuery ?? "");
  const [maximumItemCount, setMaximumItemCount] = useState<number | null>(null);
  const [totalItemCount, setTotalItemCount] = useState<number>(0);
  const [isEasyModeEnabled, setIsEasyModeEnabled] = useState<boolean>(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string | null>(requestedQuery ?? null);
  const [searchRequestResult, setSearchRequestResult] = useState<InstanceItemSearchRequestResult[] | null>(null);
  const [areAllInstancesUnavailable, setAreAllInstancesUnavailable] = useState<boolean>(false);

  useEffect(() => {

    document.title = "Items • Slashstep"

    setHeaderTitle("Items");
    setFallbackBackPathname("/");

  }, []);

  useEffect(() => {

    if (!currentSearchQuery || currentSearchQuery && currentSearchQuery !== requestedQuery) return;

    const abortController = new AbortController();

    (async () => {

      const indexedDBSavedInstances = await client.getIndexedDBSavedInstances();
      if (indexedDBSavedInstances.length === 0) {

        setAreAllInstancesUnavailable(true);
        setSearchRequestResult(null);

      } else {

        setAreAllInstancesUnavailable(false);

        const searchRequestResult = await Promise.allSettled(indexedDBSavedInstances.map((savedInstance) => {

          return new Promise<{hostname: string; items: Item[]}>(async (resolve, reject) => {
            
            try {

              const apiURI = await Instance.getHostnameFromAlias(savedInstance.hostname, abortController.signal) ?? savedInstance.hostname;
              const items = await Item.list(currentSearchQuery, `https://${apiURI}`, client);
              resolve({
                hostname: savedInstance.hostname,
                items
              });

            } catch (originalError) {

              if (!abortController.signal.aborted) {

                console.error(originalError);

              }

              const error = new ItemSearchError({
                hostname: savedInstance.hostname,
                message: originalError instanceof Error ? originalError.message : "Unknown error"
              });

              reject(error);

            }

          });

        }));

        if (abortController.signal.aborted) return;

        setSearchRequestResult(searchRequestResult);

      }

      setCurrentSearchQuery(null);

    })();

    return () => {

      abortController.abort();

    }

  }, [requestedQuery, currentSearchQuery, client]);

  const handleSearchKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {

    if (event.key === "Enter") {

      navigate(`${location.pathname}?query=${encodeURIComponent(shownQuery)}`, {replace: true});
      setCurrentSearchQuery(shownQuery);

    }

  }, [shownQuery, location]);

  const didAllRequestsFail = searchRequestResult && searchRequestResult.filter((result) => result.status === "rejected").length === searchRequestResult.length; 
  const [isViewSearchErrorsPopupOpen, setIsViewSearchErrorsPopupOpen] = useState<boolean>(false);
  const [isViewSearchErrorsPopupMounted, setIsViewSearchErrorsPopupMounted] = useState<boolean>(false);

  useEffect(() => {

    if (isViewSearchErrorsPopupMounted) {

      setIsViewSearchErrorsPopupOpen(true);

    }

  }, [isViewSearchErrorsPopupMounted]);

  return (
    <>
      {
        searchRequestResult && isViewSearchErrorsPopupMounted ? (
          <ViewSearchErrorsPopup searchRequestResult={searchRequestResult} isOpen={isViewSearchErrorsPopupOpen} requestClose={() => setIsViewSearchErrorsPopupOpen(false)} onClose={() => setIsViewSearchErrorsPopupMounted(false)} />
        ) : null
      }
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
                  <input type="text" placeholder="Type to search" value={shownQuery} onChange={(event) => setShownQuery(event.target.value)} onKeyDown={handleSearchKeyDown} />
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
              ) : <input type="text" className="query-input" value={shownQuery} placeholder="Whatcha lookin' for?" onChange={(event) => setShownQuery(event.target.value)} onKeyDown={handleSearchKeyDown} />
            }
            {
              currentSearchQuery ? (
                <section style={{display: "flex", alignItems: "center", gap: "15px"}}>
                  <Spinner />
                  <p>Searching...</p>
                </section>
              ) : (
                requestedQuery ? (
                  <section style={{display: "flex", flexDirection: "column", justifyContent: "center", gap: "15px"}}>
                    <section style={{display: "flex", alignItems: "center", gap: "15px"}}>
                      <span style={{width: "20px", height: "20px", flexShrink: 0}}>
                        {areAllInstancesUnavailable || didAllRequestsFail ? <StopSignIcon /> : <CheckIcon />}
                      </span>
                      {
                        areAllInstancesUnavailable ? (
                          <p>You need to <Link to="/instances">add an instance</Link> before searching for items.</p>
                        ) : (
                          didAllRequestsFail ? <p>Couldn't find anything from any instances.</p> : <p>Found {totalItemCount} items.</p>
                        )
                      }
                    </section>
                    {
                      didAllRequestsFail ? (
                        <span>
                          <button type="button" onClick={() => setIsViewSearchErrorsPopupMounted(true)}>View errors</button>
                        </span>
                      ) : null
                    }
                  </section>
                ) : <p>Type a query to get started.</p>
              )
            }
          </section>
          {/* <section>
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
            </section>
          </section> */}
        </main>
      </section>
    </>
  );

}

export default React.memo(ItemListPage);