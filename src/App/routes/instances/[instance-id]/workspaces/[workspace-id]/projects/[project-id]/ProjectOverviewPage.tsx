import React, { useEffect } from "react";
import { banner as bannerStyle } from "./ProjectOverviewPage.module.css";
import ClipboardIcon from "../../../../../../../icons/ClipboardIcon";
import BreadcrumbList from "../../../../../../../components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "../../../../../../../components/Breadcrumb/Breadcrumb";
import WorldIcon from "../../../../../../../icons/WorldIcon";

export type WorkspaceProperties = {
  name: string;
  displayName: string;
  description?: string;
}

function StoryOverviewPage() {

  useEffect(() => {

    document.title = "Project • Slashstep";

  }, []);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <Breadcrumb icon={<WorldIcon />} link="/workspaces/everyone-destroys-the-world">
          Everyone Destroys the World Group
        </Breadcrumb>
        <Breadcrumb icon={<ClipboardIcon />} link="/workspaces/everyone-destroys-the-world/projects/story">
          Story
        </Breadcrumb>
      </BreadcrumbList>
      <main>
        <section id={bannerStyle}>
          
        </section>
        <h1>Story</h1>
        <p>Workspace for anything related to Story.</p>
      </main>
    </section>
  );

}

export default React.memo(StoryOverviewPage);