import PopupContent from "#components/Popup/components/PopupContent/PopupContent";
import PopupHeader from "#components/Popup/components/PopupHeader/PopupHeader";
import Popup, { PopupProperties } from "#components/Popup/Popup";
import { Item } from "@slashstepgroup/javascript-sdk";
import React from "react";
import { InstanceItemSearchRequestResult } from "../../ItemListPage";

export type ViewSearchErrorsPopupProperties = {
  isOpen: boolean; 
  requestClose: () => void; 
  onClose: () => void; 
  searchRequestResult: InstanceItemSearchRequestResult[];
}

function ViewSearchErrorsPopup({searchRequestResult, requestClose, onClose, isOpen}: ViewSearchErrorsPopupProperties) {

  return (
    <Popup shouldOpen={isOpen} onClose={onClose}>
      <PopupHeader canClose onClose={requestClose}>
        Search errors
      </PopupHeader>
      <PopupContent>
        <ul>
          {
            searchRequestResult.filter((result) => result.status === "rejected").map((result) => (
              <li key={result.reason.hostname}>
                <p><b>{result.reason.hostname}: </b>{result.reason.message}</p>
              </li>
            ))
          }
        </ul>
      </PopupContent>
    </Popup>
  )

}

export default React.memo(ViewSearchErrorsPopup);