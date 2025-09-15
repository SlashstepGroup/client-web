import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements, matchPath, useLocation } from "react-router-dom";
import "./global.css";
import WorkspaceListPage from "./routes/instances/[instance-id]/workspaces/WorkspaceListPage";
import WorkspacePage from "./routes/instances/[instance-id]/workspaces/[workspace-id]/WorkspacePage";
import Header from "./components/Header/Header";
import WorkspaceSidebar from "./components/WorkspaceSidebar/WorkspaceSidebar";
import InstanceSidebar from "./components/InstanceSidebar/InstanceSidebar";
import InstanceOverviewPage from "./routes/instances/[instance-id]/overview/InstanceOverviewPage";
import ProjectOverviewPage from "./routes/instances/[instance-id]/workspaces/[workspace-id]/projects/[project-id]/ProjectOverviewPage";
import ProjectSidebar from "./components/ProjectSidebar/ProjectSidebar";
import { Client, Instance, Project, Workspace } from "@slashstepgroup/javascript-sdk"
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
import InstanceListPage from "./routes/instances/InstanceListPage";
import App from "./App";
import InstanceHomePage from "./routes/instances/[instance-id]/InstanceHomePage";

export type PopupID = "AddInstancePopup" | "RemoveLocalInstancePopup";
export type OpenPopupIDListSetter = (newOpenPopupIDs: PopupID[]) => void;

export default function Router() {

  const client = useMemo(() => {

    return new Client();

  }, []);
  const [instance, setInstance] = useState<Instance | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.screen.width > 1080);
  const [headerTitle, setHeaderTitle] = useState<string | null>(null);
  const [fallbackBackPathname, setFallbackBackPathname] = useState<string | null>(null);
  const [shouldUpdateResources, setShouldUpdateResources] = useState(true);

  const router = useMemo(() => {

    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<App client={client} setShouldUpdateResources={setShouldUpdateResources} setInstance={setInstance} fallbackBackPathname={fallbackBackPathname} shouldUpdateResources={shouldUpdateResources} headerTitle={headerTitle} project={project} instance={instance} workspace={workspace} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}>
          <Route index element={<HomePage setHeaderTitle={setHeaderTitle} setFallbackBackPathname={setFallbackBackPathname} />} />
          <Route path="instances">
            <Route index element={<InstanceListPage client={client} setHeaderTitle={setHeaderTitle} setFallbackBackPathname={setFallbackBackPathname} />} />
            <Route path=":instanceHostname">
              <Route index element={<InstanceHomePage setHeaderTitle={setHeaderTitle} setFallbackBackPathname={setFallbackBackPathname} />} />
              <Route path="overview" element={<InstanceOverviewPage instance={instance} isLoadingResources={shouldUpdateResources} />} />
              <Route path="settings">
                <Route index element={<InstanceSettingsPage instance={instance} isLoadingResources={shouldUpdateResources} />} />
                <Route path="about" element={<InstanceAboutPage instance={instance} isLoadingResources={shouldUpdateResources} />} />
                <Route path="access-policies" element={<InstanceAccessPoliciesPage instance={instance} isLoadingResources={shouldUpdateResources} />} />
                <Route path="*" element={<SettingsNotFoundPage instance={instance} isLoadingResources={shouldUpdateResources} />} />
              </Route>
            </Route>
          </Route>
          <Route path="overview" element={<HomeOverviewPage setHeaderTitle={setHeaderTitle} setFallbackBackPathname={setFallbackBackPathname} />} />
          <Route path="*" element={<NotFoundPage setHeaderTitle={setHeaderTitle} setFallbackBackPathname={setFallbackBackPathname} />} />
        </Route>
      )
    );

    return router;

  }, []);

  return (
    <RouterProvider router={router} />
  );

}