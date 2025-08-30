import { useState } from "react";
import { Navigate, Route, Routes, matchPath, useLocation } from "react-router-dom";
import "./global.css";
import WorkspaceListPage from "./routes/workspaces/WorkspaceListPage";
import WorkspacePage from "./routes/workspaces/[workspace-id]/WorkspacePage";
import Header from "./components/Header/Header";
import WorkspaceSidebar from "./components/WorkspaceSidebar/WorkspaceSidebar";
import InstanceSidebar from "./components/InstanceSidebar/InstanceSidebar";
import InstanceOverviewPage from "./routes/InstanceOverviewPage";
import ProjectOverviewPage from "./routes/workspaces/[workspace-id]/projects/[project-id]/ProjectOverviewPage";
import ProjectSidebar from "./components/ProjectSidebar/ProjectSidebar";
import { Client, Instance, Project, User, Workspace } from "@waltzgroup/javascript-sdk"
import InstanceSetupPage from "./routes/setup/InstanceSetupPage";
import ProjectBoardPage from "./routes/workspaces/[workspace-id]/projects/[project-id]/board/ProjectBoardPage";
import PopupContainer from "./components/PopupContainer/PopupContainer";
import NotFoundPage from "./routes/[wildcard]/NotFoundPage";
import InstanceSettingsPage from "./routes/settings/InstanceSettingsPage";
import AboutPage from "./routes/settings/about/AboutPage";
import UserListPage from "./routes/settings/users/UserListPage";
import SettingsNotFoundPage from "./routes/settings/[wildcard]/SettingsNotFoundPage";
import CreateUserPage from "./routes/settings/users/create/CreateUserPage";
import ManageUserPage from "./routes/settings/users/manage/[username]/ManageUserPage";
import ManageUserProfilePage from "./routes/settings/users/manage/[username]/profile/ManageUserProfilePage";
import UserSettingsNotFoundPage from "./routes/settings/users/manage/[username]/[wildcard]/UserSettingsNotFoundPage";

export type DeleteUsersPopupConfig = {
  action: "delete-users";
  users: User[];
}

export type PopupConfig = DeleteUsersPopupConfig;

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
  const [popupConfig, setPopupConfig] = useState<DeleteUsersPopupConfig | null>(null);

  const location = useLocation();
  const isWorkspacePage = matchPath("/workspaces/:workspaceID/*", location.pathname) !== null;
  const isProjectPage = matchPath("/workspaces/:workspaceID/projects/:projectID/*", location.pathname) !== null;

  return (
    <>
      <PopupContainer popupConfig={popupConfig} setPopupConfig={setPopupConfig} />
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
          <Route path="/settings" element={<InstanceSettingsPage />} />
          <Route path="/settings/about" element={<AboutPage />} />
          <Route path="/settings/users" element={<UserListPage setPopupConfig={setPopupConfig} />} />
          <Route path="/settings/users/create" element={<CreateUserPage />} />
          <Route path="/settings/users/manage" element={<Navigate to="/settings/users" />} />
          <Route path="/settings/users/manage/:username" element={<ManageUserPage />} />
          <Route path="/settings/users/manage/:username/profile" element={<ManageUserProfilePage />} />
          <Route path="/settings/users/manage/:username/*" element={<UserSettingsNotFoundPage />} />
          <Route path="/settings/*" element={<SettingsNotFoundPage />} />
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