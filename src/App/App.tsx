import Header from "#components/Header/Header";
import HomeSidebar from "#components/HomeSidebar/HomeSidebar";
import InstanceSidebar from "#components/InstanceSidebar/InstanceSidebar";
import ProjectSidebar from "#components/ProjectSidebar/ProjectSidebar";
import WorkspaceSidebar from "#components/WorkspaceSidebar/WorkspaceSidebar";
import { Client, Instance, Project, Workspace } from "@slashstepgroup/javascript-sdk";
import React, { useEffect } from "react";
import { matchPath, Outlet, useLocation } from "react-router-dom";

function App({project, workspace, headerTitle, instance, isSidebarOpen, setIsSidebarOpen, shouldUpdateResources, fallbackBackPathname, setShouldUpdateResources, setInstance, client}: {fallbackBackPathname: string | null, shouldUpdateResources: boolean, headerTitle: string | null, project: Project | null, instance: Instance | null, workspace: Workspace | null, isSidebarOpen: boolean, setIsSidebarOpen: (isSidebarOpen: boolean) => void, setShouldUpdateResources: (shouldUpdateResources: boolean) => void, setInstance: (instance: Instance | null) => void, client: Client}) {

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

      if (instanceID) {

        setInstance(new Instance({
          name: "beastslash.com",
          displayName: "Beastslash",
          description: "A Slashstep instance for Beastslash.",
          creationTime: new Date(),
          updateTime: new Date(),
        }, client));

      } else {

        setInstance(null);

      }

      setShouldUpdateResources(false);

    })();

  }, [shouldUpdateResources, instanceID, workspaceID, projectID]);

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