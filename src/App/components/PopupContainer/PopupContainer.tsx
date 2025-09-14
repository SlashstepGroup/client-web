import React, { ReactElement, useCallback, useEffect } from "react";
import { popupContainer as popupContainerStyle, open as openStyle } from "./PopupContainer.module.css";
import { OpenPopupIDListSetter, PopupID } from "../../App";
import Popup from "#components/Popup/Popup";
import AddInstancePopup from "#components/popups/AddInstancePopup/AddInstancePopup";
import { Client } from "@slashstepgroup/javascript-sdk";

function PopupContainer({openPopupIDs, setOpenPopupIDs, client}: {openPopupIDs: PopupID[], setOpenPopupIDs: OpenPopupIDListSetter, client: Client}) {

  const closePopup = useCallback((closedPopupID: PopupID) => {

    setOpenPopupIDs(openPopupIDs.filter((possibleMatchedPopupID) => possibleMatchedPopupID !== closedPopupID));
    setShouldShowContainer(false);

  }, [openPopupIDs, setOpenPopupIDs]);

  const [shouldShowContainer, setShouldShowContainer] = React.useState(false);
  const [shownPopupID, setShownPopupID] = React.useState<PopupID | null>(null);
  const popups: Record<PopupID, ReactElement | null> = {
    AddInstancePopup: <AddInstancePopup client={client} shouldOpen={shouldShowContainer} requestClose={() => closePopup("AddInstancePopup")} onClose={() => setShownPopupID(null)} />,
  }

  useEffect(() => {

    const selectedPopupID = openPopupIDs[openPopupIDs.length - 1]
    const popup = selectedPopupID ? popups[selectedPopupID] !== undefined : null;
    if (popup) {
      
      if (!shownPopupID) {

        setShownPopupID(selectedPopupID);
      
      } else if (!shouldShowContainer) {

        setTimeout(() => setShouldShowContainer(true), 10);

      }

    } else if (shouldShowContainer) {

      setShouldShowContainer(false);

    }

  }, [openPopupIDs, shownPopupID, shouldShowContainer]);

  return shownPopupID ? (
    <section className={`${popupContainerStyle} ${shouldShowContainer ? openStyle : ""}`}>
      {popups[shownPopupID]}
    </section>
  ) : null;

}

export default React.memo(PopupContainer);