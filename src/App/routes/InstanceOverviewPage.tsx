import React, { useEffect } from "react";
import BreadcrumbList from "../components/BreadcrumbList/BreadcrumbList";
import { options as optionsStyle, profileToolbar as profileToolbarStyle } from "./InstanceOverviewPage.module.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import InstanceCustomizationSection from "../components/InstanceCustomizationSection/InstanceCustomizationSection";
import InstanceProfile from "../components/InstanceProfile/InstanceProfile";
import { Instance } from "@waltzgroup/javascript-sdk";

export type WorkspaceProperties = {
  name: string;
  displayName: string;
  description?: string;
}

function InstanceOverviewPage({instance}: {instance: Instance | null}) {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [shouldSave, setShouldSave] = React.useState(false);
  const [newInstanceName, setNewInstanceName] = React.useState(instance?.displayName || "");
  const [newDescription, setNewDescription] = React.useState(instance?.description || "");

  const isEditing = searchParams.get("mode") === "edit";

  useEffect(() => {

    document.title = "Instance overview • Waltz";

  }, []);

  const didChange = (newInstanceName && newInstanceName !== instance?.displayName) || (newDescription && newDescription !== instance?.description);

  return (
    <section id="main-container">
      <BreadcrumbList />
      {/* <section id={profileToolbarStyle}>
        <ul id={optionsStyle}>
          {
            isEditing ? (
              <>
                <li>
                  <button type="button" className="primary-button" disabled={shouldSave || !didChange} onClick={() => setShouldSave(true)}>
                    <span>Save changes</span>
                    {
                      shouldSave ? <Spinner /> : null
                    }
                  </button>
                </li>
                <li>
                  <button type="button" className="secondary-button" onClick={() => navigate(location.pathname)} disabled={shouldSave}>Cancel</button>
                </li>
              </>
            ) : (
              <li>
                <button type="button" className="primary-button" onClick={() => navigate("?mode=edit")}>Customize profile</button>
              </li>
            )
          }
        </ul>
      </section> */}
      <section id="scroll-container">
        {
          instance ? (
            isEditing ? <InstanceCustomizationSection instance={instance} /> : <InstanceProfile instance={instance} />
          ) : null
        }
      </section>
    </section>
  );

}

export default React.memo(InstanceOverviewPage);