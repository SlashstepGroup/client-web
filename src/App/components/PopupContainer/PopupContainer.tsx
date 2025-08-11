import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { popupContainer as popupContainerStyle } from "./PopupContainer.module.css";
import { useSearchParams } from "react-router";
import CreateWorkspacePopup from "../CreateWorkspacePopup/CreateWorkspacePopup";

function PopupContainer() {

  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  const [currentAction, setCurrentAction] = useState(action);
  const [shouldShowPopup, setShouldShowPopup] = useState(true);

  const popups: Record<string, ReactElement> = {
    "workspaces.create": <CreateWorkspacePopup isOpen={shouldShowPopup} onClose={() => setIsLocked(false)} />
  };
  const popup = useMemo(() => currentAction ? popups[currentAction] : null, [currentAction, popups]);

  const [isLocked, setIsLocked] = useState(!!popup);

  useEffect(function() {

    if (isLocked && (action !== currentAction)) {

      setShouldShowPopup(false);

    } else {

      setCurrentAction(action);
      setShouldShowPopup(true);
      setIsLocked(!!popup)

    }

  }, [action, currentAction, popup, isLocked]);

  return popup ? (
    <section id={popupContainerStyle}>
      {popup}
    </section>
  ) : null;
  
}

export default React.memo(PopupContainer);