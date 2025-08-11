import React, { useEffect } from "react";
import BreadcrumbList from "../components/BreadcrumbList/BreadcrumbList";
import { banner as bannerStyle } from "./DomainOverviewPage.module.css";

export type WorkspaceProperties = {
  name: string;
  displayName: string;
  description?: string;
}

function WorkspacePage() {

  useEffect(() => {

    document.title = "Domain overview • Gaze";

  }, []);

  return (
    <section id="main-container">
      <BreadcrumbList />
      <main>
        <section id={bannerStyle}>
          
        </section>
        <h1>Beastslash</h1>
        <p>Project management website for Beastslash.</p>
      </main>
    </section>
  );

}

export default React.memo(WorkspacePage);