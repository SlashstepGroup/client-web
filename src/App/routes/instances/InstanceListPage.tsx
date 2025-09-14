import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import CloudIcon from "#icons/CloudIcon";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PopupID } from "../../App";
import { Client } from "@slashstepgroup/javascript-sdk";
import MenuList from "#components/MenuList/MenuList";
import MenuListLinkItem from "#components/MenuListLinkItem/MenuListLinkItem";
import Spinner from "#components/Spinner/Spinner";
import Skeleton from "#components/Skeleton/Skeleton";

function InstanceListPage({client, setHeaderTitle, setFallbackBackPathname, openPopupIDs, setOpenPopupIDs}: {setHeaderTitle: (newHeaderTitle: string | null) => void, setFallbackBackPathname: (newPathname: string | null) => void, openPopupIDs: PopupID[], setOpenPopupIDs: (newOpenPopupIDs: PopupID[]) => void, client: Client}) {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const localAction = searchParams.get("local-action");
  const [instances, setInstances] = useState<any[]>([]);

  useEffect(() => {

    (async () => {
      
      const database = await client.getIndexedDBDatabase();
      const transaction = database.transaction(["instances"], "readonly");
      const instances = transaction.objectStore("instances");
      const request = instances.getAll();

      request.onsuccess = function(event) {

        setInstances(request.result);

      }

    })();

  }, []);

  useEffect(() => {

    if (localAction === "add-instance" && !openPopupIDs.includes("AddInstancePopup")) {

      const newOpenPopupIDs: PopupID[] = [...openPopupIDs, "AddInstancePopup"];
      setOpenPopupIDs(newOpenPopupIDs);
      console.log(newOpenPopupIDs);

    }

  }, [localAction, openPopupIDs, setOpenPopupIDs]);

  useEffect(() => {

    document.title = "Instances • Slashstep"

    setHeaderTitle("Instances");
    setFallbackBackPathname("/");

  }, [setHeaderTitle, setFallbackBackPathname]);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <Breadcrumb icon={<CloudIcon />} link={"/instances"}>Instances</Breadcrumb>
      </BreadcrumbList>
      <main>
        <h1>Instances</h1>
        <p>Instances contain all Slashstep data, including users, workspaces, projects, and other resources. They are managed independently and have their own policies and rules.</p>
        <ul className="button-list">
          <li>
            <button className="primary-button" onClick={() => navigate("?local-action=add-instance")}>Add instance</button>
          </li>
          <li>
            <button onClick={() => navigate("/instances/personal")}>Use offline instance</button>
          </li>
          <li>
            <button onClick={() => navigate("?local-action=remove-instance")} className="destructive-button">Remove selected instances</button>
          </li>
        </ul>
        <MenuList>
          {
            instances.map((instance) => (
              <MenuListLinkItem icon={<Spinner />} label={instance.hostname} key={instance.hostname} description={"Connecting..."} link={`/instances/${instance.hostname}`} />
            ))
          }
        </MenuList>
      </main>
    </section>
  );

}

export default React.memo(InstanceListPage);