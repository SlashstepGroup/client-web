import React, { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import DomainCustomizationDetailsSection from "./components/DomainCustomizationDetailsSection/DomainCustomizationDetailsSection";
import TabList from "../TabList/TabList";
import Tab from "../Tab/Tab";

export type WorkspaceProperties = {
  name: string;
  displayName: string;
  description?: string;
}

function DomainCustomizationSection({domain}: {domain: {type: string, name: string, description: string}}) {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [shouldSave, setShouldSave] = React.useState(false);
  const [newDomainName, setNewDomainName] = React.useState(domain.name);
  const [newDescription, setNewDescription] = React.useState(domain.description);

  const currentTab = searchParams.get("tab");

  const didChange = (newDomainName && newDomainName !== domain.name) || (newDescription && newDescription !== domain.description);

  const shownSection = useMemo(() => {
    
    if (currentTab === "layout") {
      // return <DomainCustomizationLayoutSection />;
    }

    return <DomainCustomizationDetailsSection domain={domain} />;
  
  }, [currentTab, domain]);

  return (
    <main>
      <form>
        <h1>Domain customization</h1>
        <TabList>
          <Tab isSelected={currentTab === null} link="/?mode=edit">Details</Tab>
          <Tab isSelected={currentTab === "layout"} link="/?mode=edit&tab=layout">Layout</Tab>
        </TabList>
        {shownSection}
        {/* <section>
          <section className="heading-with-button">
            <h2>Layout</h2>
            <button type="button" disabled>Add Section</button>
          </section>
          <p>These sections will be shown on the domain's profile page.</p>
          <Tip>
            There are no sections yet. Click "Add Section" to add one.
          </Tip>
        </section> */}
      </form>
    </main>
  );

}

export default React.memo(DomainCustomizationSection);