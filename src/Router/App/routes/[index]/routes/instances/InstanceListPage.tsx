import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import CloudIcon from "#components/icons/CloudIcon";
import React, { useCallback, useEffect, useState } from "react";
import { useBlocker, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Client } from "@slashstepgroup/javascript-sdk";
import MenuList from "#components/MenuList/MenuList";
import MenuListInstanceItem from "#components/menu-list-items/MenuListInstanceItem/MenuListInstanceItem";
import AddInstancePopup from "#routes/[index]/routes/instances/components/AddInstancePopup/AddInstancePopup";
import RemoveLocalInstancePopup from "#routes/[index]/routes/instances/components/RemoveLocalInstancePopup/RemoveLocalInstancePopup";

function InstanceListPage({client, setHeaderTitle, setFallbackBackPathname}: {setHeaderTitle: (newHeaderTitle: string | null) => void, setFallbackBackPathname: (newPathname: string | null) => void, client: Client}) {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const localAction = searchParams.get("local-action");
  const [instances, setInstances] = useState<any[]>([]);
  const [shouldOpenAddLocalInstancePopup, setShouldOpenAddLocalInstancePopup] = useState(false);
  const [shouldOpenRemoveLocalInstancePopup, setShouldOpenRemoveLocalInstancePopup] = useState(false);
  const [shouldMountAddLocalInstancePopup, setShouldMountAddLocalInstancePopup] = useState(false);
  const [shouldMountRemoveLocalInstancePopup, setShouldMountRemoveLocalInstancePopup] = useState(false);
  const [selectedInstanceHostnames, setSelectedInstanceHostnames] = useState<string[]>([]);
  const location = useLocation();
  const blocker = useBlocker(({nextLocation}) => {

    return (shouldMountAddLocalInstancePopup || shouldMountRemoveLocalInstancePopup) && nextLocation.pathname !== location.pathname;

  });

  const refreshInstances = useCallback(async () => {
      
    const database = await client.getIndexedDBDatabase();
    const transaction = database.transaction(["instances"], "readonly");
    const instances = transaction.objectStore("instances");
    const request = instances.getAll();

    request.onsuccess = function() {

      setSelectedInstanceHostnames([]);
      setInstances(request.result);

    }

  }, [client]);

  useEffect(() => {

    refreshInstances();

  }, []);

  useEffect(() => {

    if (localAction === "add-instance") {

      setShouldMountAddLocalInstancePopup(true);
      setShouldOpenAddLocalInstancePopup(true);

    } else if (localAction === "remove-instance") {

      if (selectedInstanceHostnames.length === 0) {

        navigate(location.pathname, {replace: true});
        setShouldMountRemoveLocalInstancePopup(false);

      } else {

        setShouldMountRemoveLocalInstancePopup(true);
        setShouldOpenRemoveLocalInstancePopup(true);

      }

    }

  }, [localAction, selectedInstanceHostnames]);

  useEffect(() => {

    document.title = "Instances • Slashstep"

    setHeaderTitle("Instances");
    setFallbackBackPathname("/");

  }, [setHeaderTitle, setFallbackBackPathname]);

  return (
    <>
      {
        shouldMountAddLocalInstancePopup ? <AddInstancePopup shouldOpen={shouldOpenAddLocalInstancePopup} client={client} requestClose={() => setShouldOpenAddLocalInstancePopup(false)} onClose={() => setShouldMountAddLocalInstancePopup(false)} onAdd={refreshInstances} /> : null
      }
      {
        shouldMountRemoveLocalInstancePopup ? <RemoveLocalInstancePopup shouldOpen={shouldOpenRemoveLocalInstancePopup} client={client} requestClose={() => setShouldOpenRemoveLocalInstancePopup(false)} onClose={() => setShouldMountRemoveLocalInstancePopup(false)} instanceHostnames={selectedInstanceHostnames} onRemove={refreshInstances}/> : null
      }
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
              <button className="destructive-button" disabled={selectedInstanceHostnames.length === 0} onClick={() => navigate("?local-action=remove-instance")}>Remove selected instances</button>
            </li>
          </ul>
          <MenuList>
            {
              instances.map((instance) => (
                <MenuListInstanceItem isSelected={selectedInstanceHostnames.includes(instance.hostname)} key={instance.hostname} client={client} hostname={instance.hostname} onSelectionChange={(isSelected) => {

                  if (isSelected) {

                    setSelectedInstanceHostnames([...selectedInstanceHostnames, instance.hostname]);

                  } else {

                    setSelectedInstanceHostnames(selectedInstanceHostnames.filter((possibleMatchedHostname) => possibleMatchedHostname !== instance.hostname))

                  }
                  
                }} />
              ))
            }
          </MenuList>
        </main>
      </section>
    </>
  );

}

export default React.memo(InstanceListPage);