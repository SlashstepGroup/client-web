import { useMemo, useState } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./global.css";
import InstanceOverviewPage from "./routes/instances/[instance-id]/overview/InstanceOverviewPage";
import { Client, Instance, Project, Workspace } from "@slashstepgroup/javascript-sdk"
import NotFoundPage from "./routes/[wildcard]/NotFoundPage";
import InstanceSettingsPage from "./routes/instances/[instance-id]/settings/InstanceSettingsPage";
import InstanceAboutPage from "./routes/instances/[instance-id]/settings/about/InstanceAboutPage";
import SettingsNotFoundPage from "./routes/instances/[instance-id]/settings/[wildcard]/SettingsNotFoundPage";
import HomePage from "./routes/HomePage";
import InstanceAccessPoliciesPage from "./routes/instances/[instance-id]/settings/access-policies/InstanceAccessPoliciesPage";
import HomeOverviewPage from "./routes/overview/HomeOverviewPage";
import InstanceListPage from "./routes/instances/InstanceListPage";
import App from "./App";
import InstanceHomePage from "./routes/instances/[instance-id]/InstanceHomePage";
import ItemListPage from "./routes/items/ItemListPage";

export type PopupID = "AddInstancePopup" | "RemoveLocalInstancePopup";
export type OpenPopupIDListSetter = (newOpenPopupIDs: PopupID[]) => void;

export default function Router() {

  const client = useMemo(() => {

    return new Client();

  }, []);
  const [instance, setInstance] = useState<Instance | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [headerTitle, setHeaderTitle] = useState<string | null>(null);
  const [fallbackBackPathname, setFallbackBackPathname] = useState<string | null>(null);
  const [shouldUpdateResources, setShouldUpdateResources] = useState(true);

  const router = useMemo(() => {

    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<App client={client} setShouldUpdateResources={setShouldUpdateResources} setInstance={setInstance} fallbackBackPathname={fallbackBackPathname} shouldUpdateResources={shouldUpdateResources} headerTitle={headerTitle} project={project} instance={instance} workspace={workspace} />}>
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
          <Route path="items" element={<ItemListPage />} />
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