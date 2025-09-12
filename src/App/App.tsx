import { useEffect, useState } from "react";
import { Navigate, Route, Routes, matchPath, useLocation } from "react-router-dom";
import "./global.css";
import WorkspaceListPage from "./routes/instances/[instance-id]/workspaces/WorkspaceListPage";
import WorkspacePage from "./routes/instances/[instance-id]/workspaces/[workspace-id]/WorkspacePage";
import Header from "./components/Header/Header";
import WorkspaceSidebar from "./components/WorkspaceSidebar/WorkspaceSidebar";
import InstanceSidebar from "./components/InstanceSidebar/InstanceSidebar";
import InstanceOverviewPage from "./routes/instances/[instance-id]/InstanceOverviewPage";
import ProjectOverviewPage from "./routes/instances/[instance-id]/workspaces/[workspace-id]/projects/[project-id]/ProjectOverviewPage";
import ProjectSidebar from "./components/ProjectSidebar/ProjectSidebar";
import { Client, Instance, Project, User, Workspace } from "@waltzgroup/javascript-sdk"
import InstanceSetupPage from "./routes/instances/[instance-id]/setup/InstanceSetupPage";
import ProjectBoardPage from "./routes/instances/[instance-id]/workspaces/[workspace-id]/projects/[project-id]/board/ProjectBoardPage";
import NotFoundPage from "./routes/[wildcard]/NotFoundPage";
import InstanceSettingsPage from "./routes/instances/[instance-id]/settings/InstanceSettingsPage";
import InstanceAboutPage from "./routes/instances/[instance-id]/settings/about/InstanceAboutPage";
import SettingsNotFoundPage from "./routes/instances/[instance-id]/settings/[wildcard]/SettingsNotFoundPage";
import CreateUserPage from "./routes/instances/[instance-id]/settings/users/create/CreateUserPage";
import ManageUserPage from "./routes/instances/[instance-id]/settings/users/[username]/ManageUserPage";
import ManageUserProfilePage from "./routes/instances/[instance-id]/settings/users/[username]/profile/ManageUserProfilePage";
import UserManagementSettingsNotFoundPage from "./routes/instances/[instance-id]/settings/users/[username]/[wildcard]/UserManagementSettingsNotFoundPage";
import ManageUserGroupsPage from "./routes/instances/[instance-id]/settings/users/[username]/groups/ManageUserGroupsPage";
import UserSettingsNotFoundPage from "./routes/instances/[instance-id]/settings/users/[wildcard]/UserSettingsNotFoundPage";
import ManageUserSessionsPage from "./routes/instances/[instance-id]/settings/users/[username]/sessions/ManageUserSessionsPage";
import HomePage from "./routes/HomePage";
import InstanceAccessPoliciesPage from "./routes/instances/[instance-id]/settings/access-policies/InstanceAccessPoliciesPage";
import HomeSidebar from "#components/HomeSidebar/HomeSidebar";
import HomeOverviewPage from "./routes/overview/HomeOverviewPage";

export default function App() {

  const [instance, setInstance] = useState<Instance | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.screen.width > 1080);
  const [openPopupIDs, setOpenPopupIDs] = useState<string[]>([]);
  const [headerTitle, setHeaderTitle] = useState<string | null>(null);
  const [fallbackBackPathname, setFallbackBackPathname] = useState<string | null>(null);

  const location = useLocation();
  const instanceID = matchPath("/instances/:instanceID/*", location.pathname)?.params.instanceID;
  const workspaceID = matchPath("/instances/:instanceID/workspaces/:workspaceID/*", location.pathname)?.params.workspaceID;
  const projectID = matchPath("/instances/:instanceID/workspaces/:workspaceID/projects/:projectID/*", location.pathname)?.params.projectID;
  const [shouldUpdateResources, setShouldUpdateResources] = useState(true);

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
        }, {} as Client));

      } else {

        setInstance(null);

      }

      setShouldUpdateResources(false);

    })();

  }, [shouldUpdateResources, instanceID, workspaceID, projectID]);

  return (
    <>
      {/* <PopupContainer openPopupIDs={openPopupIDs} setPopupConfig={setOpenPopupIDs} /> */}
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
        <Routes>
          <Route path="/" element={<HomePage setHeaderTitle={setHeaderTitle} setFallbackBackPathname={setFallbackBackPathname} />} />
          <Route path="/overview" element={<HomeOverviewPage setHeaderTitle={setHeaderTitle} setFallbackBackPathname={setFallbackBackPathname} />} />
          <Route path="/instances" element={<NotFoundPage setHeaderTitle={setHeaderTitle} setFallbackBackPathname={setFallbackBackPathname} />} />
          <Route path="/instances/:instanceID" element={<NotFoundPage setHeaderTitle={setHeaderTitle} setFallbackBackPathname={setFallbackBackPathname} />} />
          <Route path="/instances/:instanceID/groups" element={<NotFoundPage setHeaderTitle={setHeaderTitle} setFallbackBackPathname={setFallbackBackPathname} />} />
          <Route path="/instances/:instanceID/overview" element={<InstanceOverviewPage instance={instance} isLoadingResources={shouldUpdateResources} />} />
          <Route path="/instances/:instanceID/settings" element={<InstanceSettingsPage instance={instance} isLoadingResources={shouldUpdateResources} />} />
          <Route path="/instances/:instanceID/settings/about" element={<InstanceAboutPage instance={instance} isLoadingResources={shouldUpdateResources} />} />
          <Route path="/instances/:instanceID/settings/access-policies" element={<InstanceAccessPoliciesPage instance={instance} isLoadingResources={shouldUpdateResources} />} />
          <Route path="/instances/:instanceID/settings/encryption" element={<SettingsNotFoundPage instance={instance} isLoadingResources={shouldUpdateResources} />} />
          {/* <Route path="/instances/:instanceID/settings/users" element={<UserListPage setPopupConfig={setPopupConfig} />} /> */}
          <Route path="/instances/:instanceID/settings/users/create" element={<CreateUserPage />} />
          <Route path="/instances/:instanceID/settings/users/:username" element={<ManageUserPage />} />
          <Route path="/instances/:instanceID/settings/users/:username/profile" element={<ManageUserProfilePage />} />
          <Route path="/instances/:instanceID/settings/users/:username/groups" element={<ManageUserGroupsPage />} />
          <Route path="/instances/:instanceID/settings/users/:username/sessions" element={<ManageUserSessionsPage />} />
          <Route path="/instances/:instanceID/settings/users/:username/*" element={<UserManagementSettingsNotFoundPage />} />
          <Route path="/instances/:instanceID/settings/users/*" element={<UserSettingsNotFoundPage />} />
          <Route path="/instances/:instanceID/settings/groups" element={<SettingsNotFoundPage instance={instance} isLoadingResources={shouldUpdateResources} />} />
          <Route path="/instances/:instanceID/settings/*" element={<SettingsNotFoundPage instance={instance} isLoadingResources={shouldUpdateResources} />} />
          <Route path="/instances/:instanceID/workspaces" element={<WorkspaceListPage instance={instance} isLoadingResources={shouldUpdateResources} />} />
          <Route path="/instances/:instanceID/workspaces/:workspaceID" element={<WorkspacePage />} />
          <Route path="/instances/:instanceID/workspaces/:workspaceID/projects/:projectID" element={<ProjectOverviewPage />} />
          <Route path="/instances/:instanceID/workspaces/:workspaceID/projects/:projectID/board" element={<ProjectBoardPage />} />
          <Route path="/instances/:instanceID/setup" element={<InstanceSetupPage />} />
          <Route path="*" element={<NotFoundPage setHeaderTitle={setHeaderTitle} setFallbackBackPathname={setFallbackBackPathname} />} />
        </Routes>
      </section>
    </>
  );

}