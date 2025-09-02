import React, { useEffect } from "react";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import AboutIcon from "#icons/AboutIcon";
import packageInfo from "../../../../../../../package.json";
import SettingsIcon from "#icons/SettingsIcon";
import CloudIcon from "#icons/CloudIcon";
import { useParams } from "react-router-dom";
import MenuList from "#components/MenuList/MenuList";
import MenuListDropdownItem from "#components/MenuListDropdownItem/MenuListDropdownItem";
import MenuListDisplayItem from "#components/MenuListDisplayItem/MenuListDisplayItem";

function AboutPage() {

  const { instanceID } = useParams();

  useEffect(() => {
  
    document.title = "About this instance • Slashstep";

  }, []);

  return (
    <>
      <section id="main-container">
        <BreadcrumbList>
          <Breadcrumb icon={<CloudIcon />} link={`/instances/${instanceID}`}>Beastslash</Breadcrumb>
          <Breadcrumb icon={<SettingsIcon />} link={`/instances/${instanceID}/settings`}>Settings</Breadcrumb>
          <Breadcrumb icon={<AboutIcon />} link={`/instances/${instanceID}/settings/about`}>About</Breadcrumb>
        </BreadcrumbList>
        <main>
          <h1>About</h1>
          <MenuList>
            <MenuListDropdownItem icon={<AboutIcon />} label="Slashstep Server specifications">
              <MenuList>
                <MenuListDisplayItem>
                  <table>
                    <tr>
                      <td>Version</td>
                      <td>v0.1.0</td>
                    </tr>
                    <tr>
                      <td>Setup date</td>
                      <td>September 1, 2025</td>
                    </tr>
                  </table>
                </MenuListDisplayItem>
              </MenuList>
            </MenuListDropdownItem>
          </MenuList>
        </main>
      </section>
    </>
  );

}

export default React.memo(AboutPage);