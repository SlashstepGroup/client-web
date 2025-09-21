import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tip from "#components/Tip/Tip";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import WorldIcon from "#components/icons/WorldIcon";
import MenuList from "#components/MenuList/MenuList";
import MenuListLinkItem from "#components/menu-list-items/MenuListLinkItem/MenuListLinkItem";
import { Client, Instance, Workspace } from "@slashstepgroup/javascript-sdk";
import InstanceBreadcrumb from "#components/InstanceBreadcrumb/InstanceBreadcrumb";

function WorkspaceListPage({instance, isLoadingResources}: {instance: Instance | null, isLoadingResources: boolean}) {

  const navigate = useNavigate();
  const { instanceID } = useParams();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    new Workspace({
      id: "everyone-destroys-the-world",
      name: "everyone-destroys-the-world",
      displayName: "Everyone Destroys the World Group",
      description: "Workspace for anything related to Everyone Destroys the World."
    }, {} as Client)
  ]);

  useEffect(() => {

    document.title = "Workspaces • Slashstep";

    // TODO: Get workspaces from API

  }, []);

  return (
    <>
      <section id="main-container">
        <BreadcrumbList>
          <InstanceBreadcrumb instance={instance} instanceID={instanceID!} isLoadingResources={isLoadingResources} />
          <Breadcrumb icon={<WorldIcon />} link={`/instances/${instanceID}/workspaces`}>
            Workspaces
          </Breadcrumb>
        </BreadcrumbList>
        <main>
          <h1>Workspaces</h1>
          <p>Workspaces are groups that you can use to organize your projects and teams.</p>
          <ul className="button-list">
            <li>
              <button className="primary-button" onClick={() => navigate("?action=slashstep.workspaces.create")}>Create workspace</button>
            </li>
          </ul>
          {
            workspaces.length > 0 ? (
              <MenuList>
                {workspaces.map(workspace => (
                  <MenuListLinkItem key={workspace.name} link={`/instances/${instanceID}/workspaces/${workspace.name}`} label={workspace.displayName} description={workspace.description} />
                ))}
              </MenuList>
            ) : (
              <Tip>
                <p>This instance doesn't have any workspaces yet. You can create one by clicking the button above.</p>
              </Tip>
            )
          }
        </main>
      </section>
    </>
  );

}

export default React.memo(WorkspaceListPage);