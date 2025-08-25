import React, { ReactElement, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CreateWorkspacePopup from "../CreateWorkspacePopup/CreateWorkspacePopup";
import { popupContainer as popupContainerStyle, open as openStyle } from "./PopupContainer.module.css";
import EditAccessPolicyPopup from "#components/EditAccessPolicyPopup/EditAccessPolicyPopup";

function PopupContainer() {
  
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");
  const [shouldShowContainer, setShouldShowContainer] = React.useState(false);
  const popups: { [key: string]: ReactElement } = {
    "workspaces.create": <CreateWorkspacePopup shouldOpen={shouldShowContainer} onClose={() => setSelectedAction(null)} />,
    "accessPolicies.edit": <EditAccessPolicyPopup shouldOpen={shouldShowContainer} onClose={() => setSelectedAction(null)} />,
  }

  const [shouldMount, setShouldMount] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState<string | null>(null);

  useEffect(() => {

    const newPopup = action ? popups[action] ?? null : null;
    const isUnmounted = newPopup && !shouldMount;
    const isNewContentMounted = !shouldShowContainer && newPopup && selectedAction === action;
    const isNewContentWaiting = shouldShowContainer && selectedAction !== action;

    if (isUnmounted) {
      
      setShouldMount(true);
      setSelectedAction(action);

    } else if (isNewContentMounted) {

      setTimeout(() => setShouldShowContainer(true), 50);

    } else if (isNewContentWaiting) {

      setShouldShowContainer(false);

    } else if (!newPopup && !selectedAction) {

      setShouldMount(false);

    }

  }, [popups, action, selectedAction, shouldShowContainer, shouldMount]);

  return shouldMount ? (
    <section className={`${popupContainerStyle} ${shouldShowContainer ? openStyle : ""}`}>
      {selectedAction ? popups[selectedAction] : null}
    </section>
  ) : null;

}

export default React.memo(PopupContainer);