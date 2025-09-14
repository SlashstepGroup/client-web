import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import InstanceBreadcrumb from "#components/InstanceBreadcrumb/InstanceBreadcrumb";
import QuestionMarkIcon from "#icons/QuestionMarkIcon";
import SettingsIcon from "#icons/SettingsIcon";
import { Instance } from "@slashstepgroup/javascript-sdk";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function SettingsNotFoundPage({instance, isLoadingResources}: {instance: Instance | null, isLoadingResources: boolean}) {

  const navigate = useNavigate();
  const location = useLocation();
  const { instanceID } = useParams();

  useEffect(() => {

    document.title = "Not found • Slashstep";

  }, []);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <InstanceBreadcrumb instance={instance} instanceID={instanceID!} isLoadingResources={isLoadingResources} />
        <Breadcrumb icon={<SettingsIcon />} link={`/instances/${instanceID}/settings`}>Settings</Breadcrumb>
        <Breadcrumb icon={<QuestionMarkIcon />} link={location.pathname}>Not found</Breadcrumb>
      </BreadcrumbList>
      <main>
        <h1>Not found</h1>
        <p>We couldn't find what you were looking for.</p>
        <section className="button-list">
          <button className="primary-button" onClick={() => navigate("/")}>Go back home</button>
        </section>
      </main>
    </section>
  );

}

export default React.memo(SettingsNotFoundPage);