import React from "react";
import { main as mainStyle } from "./WorkspaceListPage.module.css";
import { useNavigate } from "react-router-dom";
import Tip from "../../components/Tip/Tip";

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

  return (
    <main id={mainStyle}>
      <h1>Workspaces</h1>
      <p>Workspaces are groups that you can use to organize your projects.</p>
      <ul className="button-list">
        <li>
          <button className="primary-button" onClick={() => navigate("?action=workspaces.create")}>Create workspace</button>
        </li>
      </ul>
      {
        workspaces.length > 0 ? (
          <section>
            <ul className="menu-list">
              {workspaces.map(workspace => (
                <li key={workspace.name}>
                  <a href={`/workspaces/${workspace.name}`}>
                    <b>{workspace.displayName}</b>
                    {
                      workspace.description ? <p>{workspace.description}</p> : null
                    }
                  </a>
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
  );

}

export default React.memo(WorkspaceListPage);