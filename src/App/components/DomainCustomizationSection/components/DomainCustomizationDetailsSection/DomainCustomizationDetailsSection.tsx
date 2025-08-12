import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Tip from "../../../Tip/Tip";

export type WorkspaceProperties = {
  name: string;
  displayName: string;
  description?: string;
}

function DomainCustomizationDetailsSection({domain}: {domain: {type: string, name: string, description: string}}) {

  const [shouldSave, setShouldSave] = React.useState(false);
  const [newDomainName, setNewDomainName] = React.useState(domain.name);
  const [newDescription, setNewDescription] = React.useState(domain.description);

  const didChange = (newDomainName && newDomainName !== domain.name) || (newDescription && newDescription !== domain.description);

  return (
    <section>
      <section className="input-section">
        <label>Banner image</label>
        <Tip>You can't change this right now.</Tip>
      </section>
      <section className="input-section">
        <label>Domain name</label>
        <input type="text" value={newDomainName} onChange={(event) => setNewDomainName(event.target.value)} placeholder={domain.name} disabled={shouldSave} />
      </section>
      <section className="input-section">
        <label>Description</label>
        <textarea disabled={shouldSave} value={newDescription} onChange={(event) => setNewDescription(event.target.value)} placeholder={domain.description} />
      </section>
    </section>
  );

}

export default React.memo(DomainCustomizationDetailsSection);