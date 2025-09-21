import Header from "#components/Header/Header";
import HomeSidebar from "#routes/[index]/components/HomeSidebar/HomeSidebar";
import InstanceSidebar from "#components/sidebars/InstanceSidebar/InstanceSidebar";
import ProjectSidebar from "#components/ProjectSidebar/ProjectSidebar";
import WorkspaceSidebar from "#components/WorkspaceSidebar/WorkspaceSidebar";
import { Client, Instance, Project, Workspace } from "@slashstepgroup/javascript-sdk";
import React, { useEffect, useState } from "react";
import { matchPath, Outlet, useLocation } from "react-router-dom";
import "./global.css";

type AppProperties = {
  fallbackBackPathname: string | null;
  shouldUpdateResources: boolean;
  headerTitle: string | null;
  project: Project | null;
  instance: Instance | null;
  workspace: Workspace | null;
  setShouldUpdateResources: (shouldUpdateResources: boolean) => void;
  setInstance: (instance: Instance | null) => void;
  client: Client;
}

function App({ project, workspace, headerTitle, instance, shouldUpdateResources, fallbackBackPathname, setShouldUpdateResources, setInstance, client }: AppProperties) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.screen.width > 1080);

  const location = useLocation();
  const instanceID = matchPath("/instances/:instanceID/*", location.pathname)?.params.instanceID;
  const workspaceID = matchPath("/instances/:instanceID/workspaces/:workspaceID/*", location.pathname)?.params.workspaceID;
  const projectID = matchPath("/instances/:instanceID/workspaces/:workspaceID/projects/:projectID/*", location.pathname)?.params.projectID;

  useEffect(() => {

    setShouldUpdateResources(true);

  }, [instanceID, workspaceID, projectID]);

  useEffect(() => {

    if (!shouldUpdateResources) return;

    (async () => {

      setShouldUpdateResources(false);

    })();

  }, [shouldUpdateResources, instanceID, workspaceID, projectID]);

  console.log(shouldUpdateResources);

  return (
    <>
      <Header onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} scope={project ?? workspace ?? instance} isUpdatingResources={shouldUpdateResources} title={headerTitle} fallbackBackPathname={fallbackBackPathname} />
      <section id="content" className={isSidebarOpen ? "sidebar-open" : ""}>
        {
          projectID ? (
            <ProjectSidebar />
          ) : (
            workspaceID ? (
              <WorkspaceSidebar />
            ) : (
              instanceID ? <InstanceSidebar /> : <HomeSidebar />
            )
          )
        }
        <Outlet />
      </section>
    </>
  )

}

export default React.memo(App);