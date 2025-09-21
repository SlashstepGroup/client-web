import { useMemo, useState } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import InstanceOverviewPage from "#routes/[index]/routes/instances/routes/[instance-id]/routes/overview/InstanceOverviewPage";
import { Client, Instance, Project, Workspace } from "@slashstepgroup/javascript-sdk"
import NotFoundPage from "#routes/[index]/routes/[wildcard]/NotFoundPage";
import InstanceSettingsPage from "#routes/[index]/routes/instances/routes/[instance-id]/routes/settings/InstanceSettingsPage";
import InstanceAboutPage from "#routes/[index]/routes/instances/routes/[instance-id]/routes/settings/routes/about/InstanceAboutPage";
import SettingsNotFoundPage from "#routes/[index]/routes/instances/routes/[instance-id]/routes/settings/routes/[wildcard]/SettingsNotFoundPage";
import HomePage from "#routes/[index]/HomePage";
import InstanceAccessPoliciesPage from "#routes/[index]/routes/instances/routes/[instance-id]/routes/settings/routes/access-policies/InstanceAccessPoliciesPage";
import InstanceListPage from "#routes/[index]/routes/instances/InstanceListPage";
import App from "./App/App";
import InstanceHomePage from "#routes/[index]/routes/instances/routes/[instance-id]/InstanceHomePage";
import ItemListPage from "#routes/[index]/routes/items/ItemListPage";

export default function Router() {

  const client = useMemo(() => new Client(), []);
  const [instance, setInstance] = useState<Instance | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [headerTitle, setHeaderTitle] = useState<string | null>(null);
  const [fallbackBackPathname, setFallbackBackPathname] = useState<string | null>(null);
  const [shouldUpdateResources, setShouldUpdateResources] = useState<boolean>(true);

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
          <Route path="*" element={<NotFoundPage setHeaderTitle={setHeaderTitle} setFallbackBackPathname={setFallbackBackPathname} />} />
        </Route>
      )
    );

    return router;

  }, [shouldUpdateResources, headerTitle, fallbackBackPathname, client, instance, workspace, project]);

  return (
    <RouterProvider router={router} />
  );

}