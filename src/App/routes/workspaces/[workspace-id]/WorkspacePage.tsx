import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadcrumbList from "../../../components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import WorldIcon from "../../../icons/WorldIcon";

export type WorkspaceProperties = {
  name: string;
  displayName: string;
  description?: string;
}

function WorkspacePage() {

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

    document.title = "Workspace • Gaze";

  }, []);

  return (
    <main>
      <BreadcrumbList>
        <Breadcrumb icon={<WorldIcon />} link="/workspaces">
          Workspaces
        </Breadcrumb>
      </BreadcrumbList>
      <h1>Everyone Destroys the World Group</h1>
      <p>Workspace for anything related to Everyone Destroys the World.</p>
    </main>
  );

}

export default React.memo(WorkspacePage);