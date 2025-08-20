import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Tip from "../../../Tip/Tip";
import { Instance } from "@waltzgroup/javascript-sdk";

export type WorkspaceProperties = {
  name: string;
  displayName: string;
  description?: string;
}

function InstanceCustomizationLayoutSection({instance}: {instance: Instance}) {

  const [shouldSave, setShouldSave] = React.useState(false);
  const [newInstanceName, setNewInstanceName] = React.useState(instance.displayName);
  const [newDescription, setNewDescription] = React.useState(instance.description);

  const didChange = (newInstanceName && newInstanceName !== instance.displayName) || (newDescription && newDescription !== instance.description);

  return (
    <section>
      <section className="heading-with-button">
        <h2>Layout</h2>
        <button type="button" disabled>Add Section</button>
      </section>
      <p>These sections will be shown on the instance's profile page.</p>
      <Tip>
        You can't change this right now.
      </Tip>
    </section>
  );

}

export default React.memo(InstanceCustomizationLayoutSection);