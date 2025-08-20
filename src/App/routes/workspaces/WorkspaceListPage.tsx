import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tip from "../../components/Tip/Tip";
import BreadcrumbList from "../../components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import WorldIcon from "../../icons/WorldIcon";
import MenuList from "../../components/MenuList/MenuList";
import MenuListLinkItem from "../../components/MenuListLinkItem/MenuListLinkItem";

export type WorkspaceProperties = {
  name: string;
  displayName: string;
  description?: string;
}

function WorkspaceListPage() {

  const navigate = useNavigate();
  const workspaces: WorkspaceProperties[] = [
    {
      name: "everyone-destroys-the-world",
      displayName: "Everyone Destroys the World Group",
      description: "Workspace for anything related to Everyone Destroys the World."
    },
    {
      name: "Beastslash",
      displayName: "Beastslash",
      description: "Workspace for general Beastslash projects."
    }
  ];

  useEffect(() => {
  
    document.title = "Workspaces • Waltz";

  }, []);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <Breadcrumb icon={<WorldIcon />} link="/workspaces">
          Workspaces
        </Breadcrumb>
      </BreadcrumbList>
      <main>
        <h1>Workspaces</h1>
        <p>Workspaces are groups that you can use to organize your projects.</p>
        <ul className="button-list">
          <li>
            <button className="primary-button" onClick={() => navigate("?action=workspaces.create")}>Create workspace</button>
          </li>
        </ul>
        {
          workspaces.length > 0 ? (
            <MenuList>
              {workspaces.map(workspace => (
                <MenuListLinkItem key={workspace.name} link={`/workspaces/${workspace.name}`} label={workspace.displayName} description={workspace.description} />
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
  );

}

export default React.memo(WorkspaceListPage);