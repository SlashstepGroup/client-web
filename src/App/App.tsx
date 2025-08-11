import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Navigate, Route, Routes, matchPath, useLocation } from "react-router-dom";
import "./global.css";
import WorkspaceListPage from "./routes/workspaces/WorkspaceListPage";
import PopupContainer from "./components/PopupContainer/PopupContainer";
import WorkspacePage from "./routes/workspaces/[workspace-id]/WorkspacePage";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import WorkspaceSidebar from "./components/WorkspaceSidebar/WorkspaceSidebar";
import DomainSidebar from "./components/DomainSidebar/DomainSidebar";
import DomainOverviewPage from "./routes/DomainOverviewPage";
import ProjectOverviewPage from "./routes/workspaces/[workspace-id]/projects/[project-id]/ProjectOverviewPage";
import ProjectSidebar from "./components/ProjectSidebar/ProjectSidebar";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export default function App() {

  const [domain, setDomain] = useState({
    name: "Beastslash"
  });
  
  const [workspace, setWorkspace] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.screen.width > 1080);

  const location = useLocation();
  const isWorkspacePage = matchPath("/workspaces/:workspaceID/*", location.pathname) !== null;
  const isProjectPage = matchPath("/workspaces/:workspaceID/projects/:projectID/*", location.pathname) !== null;

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
              <DomainSidebar />
            )
          )
        }
        <Routes>
          <Route path="/" element={<DomainOverviewPage />} />
          <Route path="/workspaces" element={<WorkspaceListPage />} />
          <Route path="/workspaces/:workspaceID" element={<WorkspacePage />} />
          <Route path="/workspaces/:workspaceID/projects/:projectID" element={<ProjectOverviewPage />} />
        </Routes>
      </section>
    </>
  );

}