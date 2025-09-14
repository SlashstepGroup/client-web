import React from "react";
import Tip from "../../../Tip/Tip";
import { Instance } from "@slashstepgroup/javascript-sdk";

export type WorkspaceProperties = {
  name: string;
  displayName: string;
  description?: string;
}

function InstanceCustomizationDetailsSection({instance}: {instance: Instance}) {

  const [shouldSave, setShouldSave] = React.useState(false);
  const [newInstanceName, setNewInstanceName] = React.useState(instance.displayName);
  const [newDescription, setNewDescription] = React.useState(instance.description);

  const didChange = (newInstanceName && newInstanceName !== instance.displayName) || (newDescription && newDescription !== instance.description);

  return (
    <section>
      <h2>Details</h2>
      <section className="input-section">
        <label>Banner image</label>
        <Tip>You can't change this right now.</Tip>
      </section>
      <section className="input-section">
        <label>Instance name</label>
        <input type="text" value={newInstanceName} onChange={(event) => setNewInstanceName(event.target.value)} placeholder={instance.displayName} disabled={shouldSave} />
      </section>
      <section className="input-section">
        <label>Description</label>
        <textarea disabled={shouldSave} value={newDescription} onChange={(event) => setNewDescription(event.target.value)} placeholder={instance.description} />
      </section>
    </section>
  );

}

export default React.memo(InstanceCustomizationDetailsSection);