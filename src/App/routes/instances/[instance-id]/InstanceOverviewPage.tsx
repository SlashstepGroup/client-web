import React, { useEffect } from "react";
import BreadcrumbList from "../../../components/BreadcrumbList/BreadcrumbList";
import { useParams, useSearchParams } from "react-router-dom";
import InstanceProfile from "../../../components/InstanceProfile/InstanceProfile";
import { Instance } from "@waltzgroup/javascript-sdk";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import CloudIcon from "#icons/CloudIcon";
import Skeleton from "#components/Skeleton/Skeleton";
import Tip from "#components/Tip/Tip";
import QuestionMarkIcon from "#icons/QuestionMarkIcon";
import InstanceBreadcrumb from "#components/InstanceBreadcrumb/InstanceBreadcrumb";

function InstanceOverviewPage({instance, isLoadingResources}: {instance: Instance | null, isLoadingResources: boolean}) {

  const [searchParams] = useSearchParams();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const [shouldSave, setShouldSave] = React.useState(false);
  // const [newInstanceName, setNewInstanceName] = React.useState(instance?.displayName || "");
  // const [newDescription, setNewDescription] = React.useState(instance?.description || "");
  const { instanceID } = useParams();

  const isEditing = searchParams.get("mode") === "edit";

  useEffect(() => {

    document.title = `${instance?.displayName ?? "Instance overview"} • Slashstep`;

  }, [instance]);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <InstanceBreadcrumb instance={instance} instanceID={instanceID!} isLoadingResources={isLoadingResources} />
      </BreadcrumbList>
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
          instance || isLoadingResources ? (
            // instance ? (
            //   isEditing ? <InstanceCustomizationSection instance={instance} /> : <InstanceProfile instance={instance} />
            // ) : (
            //   isLoadingResources ? <Spinner /> : null
            // )
            <InstanceProfile instance={instance} />
          ) : (
            <main>
              <Tip>Couldn't find that instance.</Tip>
            </main>
          )
        }
      </section>
    </section>
  );

}

export default React.memo(InstanceOverviewPage);