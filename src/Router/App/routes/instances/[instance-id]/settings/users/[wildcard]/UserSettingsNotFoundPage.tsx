import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import CloudIcon from "#components/icons/CloudIcon";
import PersonIcon from "#components/icons/PersonIcon";
import QuestionMarkIcon from "#components/icons/QuestionMarkIcon";
import SettingsIcon from "#components/icons/SettingsIcon";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function UserSettingsNotFoundPage() {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    document.title = "Not found • Slashstep";

  }, []);

  const { instanceID } = useParams();

  // const didChange = (newInstanceName && newInstanceName !== instance?.displayName) || (newDescription && newDescription !== instance?.description);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <Breadcrumb icon={<CloudIcon />} link={`/instances/${instanceID}`}>Beastslash</Breadcrumb>
        <Breadcrumb icon={<SettingsIcon />} link={`/instances/${instanceID}/settings`}>Settings</Breadcrumb>
        <Breadcrumb icon={<PersonIcon />} link={`/instances/${instanceID}/settings/users`}>Users</Breadcrumb>
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

export default React.memo(UserSettingsNotFoundPage);