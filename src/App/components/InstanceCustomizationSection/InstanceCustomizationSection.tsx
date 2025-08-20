import React, { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import InstanceCustomizationDetailsSection from "./components/InstanceCustomizationDetailsSection/InstanceCustomizationDetailsSection";
import InstanceCustomizationLayoutSection from "./components/InstanceCustomizationLayoutSection/InstanceCustomizationLayoutSection";
import { Instance } from "@waltzgroup/javascript-sdk";

export type InstanceCustomizationSectionProperties = {
  instance: Instance;
}

function InstanceCustomizationSection({instance}: InstanceCustomizationSectionProperties) {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [shouldSave, setShouldSave] = React.useState(false);
  const [newInstanceName, setNewInstanceName] = React.useState(instance.displayName);
  const [newDescription, setNewDescription] = React.useState(instance.description);

  const currentTab = searchParams.get("tab");

  const didChange = (newInstanceName && newInstanceName !== instance.displayName) || (newDescription && newDescription !== instance.description);

  const shownSection = useMemo(() => {
    
    if (currentTab === "layout") {
      return <InstanceCustomizationLayoutSection instance={instance} />;
    }

    return <InstanceCustomizationDetailsSection instance={instance} />;
  
  }, [currentTab, instance]);

  return (
    <main>
      <form>
        <h1>Instance customization</h1>
        <InstanceCustomizationDetailsSection instance={instance} />
        <InstanceCustomizationLayoutSection instance={instance} />
      </form>
    </main>
  );

}

export default React.memo(InstanceCustomizationSection);