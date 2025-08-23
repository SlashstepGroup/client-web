import React from "react";
import { useNavigate } from "react-router-dom";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import KeyIcon from "#icons/KeyIcon";
import AboutIcon from "#icons/AboutIcon";
import packageInfo from "../../../../../package.json";
import SettingsIcon from "#icons/SettingsIcon";

function AboutPage() {

  const navigate = useNavigate();

  return (
    <>
      <section id="main-container">
        <BreadcrumbList>
          <Breadcrumb icon={<SettingsIcon />} link="/settings">
            Settings
          </Breadcrumb>
          <Breadcrumb icon={<AboutIcon />} link="/settings/about">
            About
          </Breadcrumb>
        </BreadcrumbList>
        <main>
          <h1>About Waltz</h1>
          <ul>
            <li>Client version: {packageInfo.version}</li>
            <li>Server version: Unknown</li>
          </ul>
        </main>
      </section>
    </>
  );

}

export default React.memo(AboutPage);