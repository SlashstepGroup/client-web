import React, { ReactElement, useEffect } from "react";
import { popupContainer as popupContainerStyle, open as openStyle } from "./PopupContainer.module.css";
import UserDeletionConfirmationPopup from "#components/UserDeletionConfirmationPopup/UserDeletionConfirmationPopup";
import { DeleteUsersPopupConfig, PopupConfig } from "../../App";

function PopupContainer({popupConfig, setPopupConfig}: {popupConfig: PopupConfig | null, setPopupConfig: (popupConfig: PopupConfig | null) => void}) {
  
  const [shouldShowContainer, setShouldShowContainer] = React.useState(false);
  const [shownPopupConfig, setShownPopupConfig] = React.useState<PopupConfig | null>(null);
  const popups = {
    "delete-users": shownPopupConfig ? <UserDeletionConfirmationPopup popupConfig={shownPopupConfig} shouldOpen={shouldShowContainer} onCloseRequest={() => setPopupConfig(null)} onClose={() => setShownPopupConfig(null)} /> : null,
  }

  const [shouldMount, setShouldMount] = React.useState(false);

  useEffect(() => {

    const popup = popupConfig ? popups[popupConfig.action] !== undefined : null;
    if (popup) {
      
      if (!shownPopupConfig) {

        setShownPopupConfig(popupConfig);
        setShouldMount(true);
      
      } else if (!shouldShowContainer) {

        setTimeout(() => setShouldShowContainer(true), 10);

      }

    } else if (shouldShowContainer) {

      setShouldShowContainer(false);

    } else if (!shownPopupConfig) {

      setShouldMount(false);

    }

  }, [popupConfig, shownPopupConfig, shouldShowContainer]);

  return shouldMount ? (
    <section className={`${popupContainerStyle} ${shouldShowContainer ? openStyle : ""}`}>
      {shownPopupConfig ? popups[shownPopupConfig.action] : null}
    </section>
  ) : null;

}

export default React.memo(PopupContainer);