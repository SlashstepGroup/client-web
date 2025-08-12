import React, { useEffect } from "react";
import BreadcrumbList from "../components/BreadcrumbList/BreadcrumbList";
import { banner as bannerStyle, options as optionsStyle, profileToolbar as profileToolbarStyle } from "./DomainOverviewPage.module.css";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import Tip from "../components/Tip/Tip";
import DomainCustomizationSection from "../components/DomainCustomizationSection/DomainCustomizationSection";

export type WorkspaceProperties = {
  name: string;
  displayName: string;
  description?: string;
}

function DomainOverviewPage({domain}: {domain: {type: string, name: string, description: string}}) {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [shouldSave, setShouldSave] = React.useState(false);
  const [newDomainName, setNewDomainName] = React.useState(domain.name);
  const [newDescription, setNewDescription] = React.useState(domain.description);

  const isEditing = searchParams.get("mode") === "edit";
  const currentTab = searchParams.get("tab");

  useEffect(() => {

    document.title = "Domain overview • Gaze";

  }, []);

  const didChange = (newDomainName && newDomainName !== domain.name) || (newDescription && newDescription !== domain.description);

  return (
    <section id="main-container">
      <BreadcrumbList />
      <section id={profileToolbarStyle}>
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
      </section>
      <section id="scroll-container">
        {
          isEditing ? <DomainCustomizationSection domain={domain} /> : (
            <main>
              <section id={bannerStyle}>
          
              </section>
              <h1>{domain.name}</h1>
              <section>
                <p>{domain.description}</p>
              </section>
              <section>
                <h2>Featured users</h2>
                <ul>
                  <li>
                    <figure>
                      <img src="https://www.gravatar.com/avatar?d=mp" alt="User avatar" />
                      <figcaption>Jane Doe</figcaption>
                    </figure>
                  </li>
                  <li>
                    <figure>
                      <img src="https://www.gravatar.com/avatar?d=mp" alt="User avatar" />
                      <figcaption>Jane Doe</figcaption>
                    </figure>
                  </li>
                  <li>
                    <figure>
                      <img src="https://www.gravatar.com/avatar?d=mp" alt="User avatar" />
                      <figcaption>Jane Doe</figcaption>
                    </figure>
                  </li>
                </ul>
              </section>
            </main>
          )
        }
      </section>
    </section>
  );

}

export default React.memo(DomainOverviewPage);