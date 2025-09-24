import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Dropdown from "#components/Dropdown/Dropdown";
import DropdownItem from "#components/DropdownItem/DropdownItem";
import DropdownItemList from "#components/DropdownItemList/DropdownItemList";
import CheckIcon from "#components/icons/CheckIcon";
import StopSignIcon from "#components/icons/StopSignIcon";
import WorkIcon from "#components/icons/WorkIcon";
import Spinner from "#components/Spinner/Spinner";
import { Client, Instance, Item, Project, Workspace } from "@slashstepgroup/javascript-sdk";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ItemSearchError from "./ItemSearchError";
import ViewSearchErrorsPopup from "./components/ViewSearchErrorsPopup/ViewSearchErrorsPopup";
import { ItemListResponse } from "node_modules/@slashstepgroup/javascript-sdk/dist/resources/Item/Item";
import MenuList from "#components/MenuList/MenuList";
import MenuListLinkItem from "#components/menu-list-items/MenuListLinkItem/MenuListLinkItem";
import ExclamationMarkCircleIcon from "#components/icons/ExclamationMarkCircleIcon";

export type ItemListPageProperties = {
  setHeaderTitle: (newHeaderTitle: string | null) => void;
  setFallbackBackPathname: (newPathname: string | null) => void;
  client: Client;
}

export type SearchResult = { hostname: string; response: ItemListResponse };

export type InstanceItemSearchRequestResult = PromiseSettledResult<SearchResult>;

function ItemListPage({ client, setHeaderTitle, setFallbackBackPathname }: ItemListPageProperties) {

  const [searchParams] = useSearchParams();
  const requestedQuery = decodeURIComponent(searchParams.get("query") ?? "");
  const navigate = useNavigate();
  const [shownQuery, setShownQuery] = useState(requestedQuery ?? "");
  const [maximumItemCount, setMaximumItemCount] = useState<number>(15);
  const [totalItemCount, setTotalItemCount] = useState<number>(0);
  const [isEasyModeEnabled, setIsEasyModeEnabled] = useState<boolean>(true);
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

          return new Promise<SearchResult>(async (resolve, reject) => {

            try {

              const apiURI = await Instance.getHostnameFromAlias(savedInstance.hostname, abortController.signal) ?? savedInstance.hostname;
              const response = await Item.list(currentSearchQuery, `https://${apiURI}`, client, {Project, Workspace});
              resolve({
                hostname: savedInstance.hostname,
                response
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

        const totalItemCount = searchRequestResult.filter((result) => result.status === "fulfilled").map((result) => result.value.response.totalItemCount).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        setTotalItemCount(totalItemCount);
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

      navigate(`${location.pathname}?query=${encodeURIComponent(shownQuery)}`, { replace: true });
      setCurrentSearchQuery(shownQuery);

    }

  }, [shownQuery, location]);

  const failedRequestCount = searchRequestResult?.filter((result) => result.status === "rejected").length ?? 0;
  const didAllRequestsFail = searchRequestResult && failedRequestCount === searchRequestResult.length;
  const [isViewSearchErrorsPopupOpen, setIsViewSearchErrorsPopupOpen] = useState<boolean>(false);
  const [isViewSearchErrorsPopupMounted, setIsViewSearchErrorsPopupMounted] = useState<boolean>(false);

  useEffect(() => {

    if (isViewSearchErrorsPopupMounted) {

      setIsViewSearchErrorsPopupOpen(true);

    }

  }, [isViewSearchErrorsPopupMounted]);

  const sortedResults: Item[] = useMemo(() => {

    if (!searchRequestResult) return [];

    const mergedItems = searchRequestResult.filter((result) => result.status === "fulfilled").map((result) => result.value.response.items).flat();
    const sortedItems = mergedItems;

    return sortedItems.slice(0, maximumItemCount);

  }, [searchRequestResult, maximumItemCount]);

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
              <button type="button" className={isEasyModeEnabled ? "primary-button" : undefined} onClick={() => setIsEasyModeEnabled(true)}>
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
                </section>
              ) : <input type="text" className="query-input" value={shownQuery} placeholder="Whatcha lookin' for?" onChange={(event) => setShownQuery(event.target.value)} onKeyDown={handleSearchKeyDown} />
            }
            {
              currentSearchQuery ? (
                <section style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <Spinner />
                  <p>Searching...</p>
                </section>
              ) : (
                requestedQuery && searchRequestResult ? (
                  <section style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "15px" }}>
                    <section style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <span style={{ width: "20px", height: "20px", flexShrink: 0, fill: "var(--text)" }}>
                        {
                          areAllInstancesUnavailable || didAllRequestsFail ? (
                            <StopSignIcon />
                          ) : (
                            failedRequestCount > 0 ? <ExclamationMarkCircleIcon /> : <CheckIcon />
                          )
                        }
                      </span>
                      {
                        areAllInstancesUnavailable ? (
                          <p>You need to <Link to="/instances">add an instance</Link> before searching for items.</p>
                        ) : (
                          didAllRequestsFail ? (
                            <p>Your instances had problems returning results.</p>
                          ) : (
                            <p>Found {totalItemCount} items{searchRequestResult.length - failedRequestCount > 1 ? ` across ${searchRequestResult.length - failedRequestCount} instances` : ""}.{failedRequestCount > 0 ? ` ${failedRequestCount} instance${failedRequestCount > 1 ? "s had problems" : "had a problem"} returning results.` : ""}</p>
                          )
                        )
                      }
                    </section>
                    {
                      failedRequestCount > 0 ? (
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
          <section>
            {
              sortedResults.length > 0 ? (
                <>
                  <MenuList>
                    {
                      sortedResults.map((item) => (
                        <MenuListLinkItem key={`${item.apiURI}/${item.id}`} label={
                          <section style={{display: "flex", alignItems: "center", gap: "10px"}}>
                            <b style={{backgroundColor: "var(--body-background)", padding: "5px 10px", borderRadius: "5px"}}>{item.project?.key}-{item.number}</b>
                            <b>{item.summary}</b>
                          </section>
                        } description={`${item.apiURI.replace("https://", "")} ⦁ ${item.project?.workspace?.displayName} ⦁ ${item.project?.displayName}`} link={`/instances/${item.apiURI.replace("https://", "")}/workspaces/${item.project?.workspace?.name}/projects/${item.project?.name}/items/${item.number}`} />
                      ))
                    }
                  </MenuList>
                  <section className="pagination-dropdown-container">
                    <p>Showing</p>
                    <Dropdown name="Maximum shown items" isOpen={false} onClick={() => null} selectedItem={maximumItemCount} isDisabled>
                      <DropdownItem onClick={() => null}>15</DropdownItem>
                      <DropdownItem onClick={() => setMaximumItemCount(25)}>25</DropdownItem>
                      <DropdownItem onClick={() => setMaximumItemCount(50)}>50</DropdownItem>
                      <DropdownItem onClick={() => setMaximumItemCount(100)}>100</DropdownItem>
                      <DropdownItem onClick={() => setMaximumItemCount(250)}>250</DropdownItem>
                      <DropdownItem onClick={() => setMaximumItemCount(500)}>500</DropdownItem>
                    </Dropdown>
                    <p>items of {totalItemCount}</p>
                  </section>
                </>
              ) : null
            }
          </section>
        </main>
      </section>
    </>
  );

}

export default React.memo(ItemListPage);