import React, { Dispatch, SetStateAction, useState } from "react";
import { Route, Routes, matchPath, useLocation } from "react-router-dom";
import "./global.css";
import WorkspaceListPage from "./routes/workspaces/WorkspaceListPage";
import WorkspacePage from "./routes/workspaces/[workspace-id]/WorkspacePage";
import Header from "./components/Header/Header";
import WorkspaceSidebar from "./components/WorkspaceSidebar/WorkspaceSidebar";
import InstanceSidebar from "./components/InstanceSidebar/InstanceSidebar";
import InstanceOverviewPage from "./routes/InstanceOverviewPage";
import ProjectOverviewPage from "./routes/workspaces/[workspace-id]/projects/[project-id]/ProjectOverviewPage";
import ProjectSidebar from "./components/ProjectSidebar/ProjectSidebar";
import UserListPage from "./routes/users/UserListPage";
import { Client, Instance, Project, Workspace } from "@waltzgroup/javascript-sdk"
import InstanceSetupPage from "./routes/setup/InstanceSetupPage";
import ProjectBoardPage from "./routes/workspaces/[workspace-id]/projects/[project-id]/board/ProjectBoardPage";
import PopupContainer from "./components/PopupContainer/PopupContainer";
import NotFoundPage from "./routes/[wildcard]/NotFoundPage";

export default function App() {

  const [instance, setInstance] = useState<Instance | null>(new Instance({
    displayName: "Beastslash",
    description: "A Waltz instance for Beastslash.",
    creationTime: new Date(),
    updateTime: new Date(),
  }, {} as Client));
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.screen.width > 1080);

  const location = useLocation();
  const isWorkspacePage = matchPath("/workspaces/:workspaceID/*", location.pathname) !== null;
  const isProjectPage = matchPath("/workspaces/:workspaceID/projects/:projectID/*", location.pathname) !== null;
  const scope = isProjectPage ? project : (isWorkspacePage ? workspace : instance); 

  return (
    <>
      <PopupContainer />
      <Header onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <section id="content" className={isSidebarOpen ? "sidebar-open" : ""}>
        {
          isProjectPage ? (
            <ProjectSidebar />
          ) : (
            isWorkspacePage ? (
              <WorkspaceSidebar />
            ) : (
              <InstanceSidebar />
            )
          )
        }
        <Routes>
          <Route path="/" element={<InstanceOverviewPage instance={instance} />} />
          {/* <Route path="/users" element={<UserListPage />} /> */}
          <Route path="/workspaces" element={<WorkspaceListPage />} />
          <Route path="/workspaces/:workspaceID" element={<WorkspacePage />} />
          <Route path="/workspaces/:workspaceID/projects/:projectID" element={<ProjectOverviewPage />} />
          <Route path="/workspaces/:workspaceID/projects/:projectID/board" element={<ProjectBoardPage />} />
          <Route path="/setup" element={<InstanceSetupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </section>
    </>
  );

}