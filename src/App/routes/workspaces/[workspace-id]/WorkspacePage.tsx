import React, { useEffect } from "react";
import BreadcrumbList from "../../../components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import WorldIcon from "../../../icons/WorldIcon";
import { banner as bannerStyle } from "./WorkspacePage.module.css";

export type WorkspaceProperties = {
  name: string;
  displayName: string;
  description?: string;
}

function WorkspacePage() {

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
      <section id={bannerStyle}>
        
      </section>
      <h1>Everyone Destroys the World Group</h1>
      <p>Workspace for anything related to Everyone Destroys the World.</p>
    </main>
  );

}

export default React.memo(WorkspacePage);