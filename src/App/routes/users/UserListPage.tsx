import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tip from "../../components/Tip/Tip";
import BreadcrumbList from "../../components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import WorldIcon from "../../icons/WorldIcon";
import BadgeIcon from "../../icons/BadgeIcon";

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
  
    document.title = "Workspaces • Gaze";

  }, []);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <Breadcrumb icon={<BadgeIcon />} link="/users">
          Users
        </Breadcrumb>
      </BreadcrumbList>
      <main>
        <h1>Users</h1>
        <p>Users can interact with workspaces, projects, and other resources in your domain. They all have a set of permissions and roles, and some other information so you can know who they are.</p>
        <ul className="button-list">
          <li>
            <button className="primary-button" onClick={() => navigate("?action=workspaces.create")}>Create user</button>
          </li>
        </ul>
        {
          workspaces.length > 0 ? (
            <section>
              <ul className="menu-list">
                {workspaces.map(workspace => (
                  <li key={workspace.name}>
                    <Link to={`/workspaces/${workspace.name}`}>
                      <b>{workspace.displayName}</b>
                      {
                        workspace.description ? <p>{workspace.description}</p> : null
                      }
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <Tip>
              <p>This domain doesn't have any workspaces yet. You can create one by clicking the button above.</p>
            </Tip>
          )
        }
      </main>
    </section>
  );

}

export default React.memo(WorkspaceListPage);