import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import QuestionMarkIcon from "#icons/QuestionMarkIcon";
import SettingsIcon from "#icons/SettingsIcon";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SettingsNotFoundPage() {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    document.title = "Not found • Waltz";

  }, []);

  // const didChange = (newInstanceName && newInstanceName !== instance?.displayName) || (newDescription && newDescription !== instance?.description);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <Breadcrumb icon={<SettingsIcon />} link="/settings">
          Settings
        </Breadcrumb>
        <Breadcrumb icon={<QuestionMarkIcon />} link={location.pathname}>
          Not found
        </Breadcrumb>
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