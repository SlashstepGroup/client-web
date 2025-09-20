import React, { FormEvent, useCallback, useEffect, useState } from "react";
import PopupHeader from "#components/Popup/components/PopupHeader/PopupHeader";
import PopupContent from "#components/Popup/components/PopupContent/PopupContent";
import Popup from "#components/Popup/Popup";
import PopupFooter from "#components/Popup/components/PopupFooter/PopupFooter";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "#components/Spinner/Spinner";
import { Client } from "@slashstepgroup/javascript-sdk";

function RemoveLocalInstancePopup({client, shouldOpen, requestClose, onClose, instanceHostnames, onRemove}: {client: Client, shouldOpen: boolean, requestClose: () => void, onClose: () => void, instanceHostnames: string[], onRemove: () => void}) {

  const location = useLocation();
  const navigate = useNavigate();
  const [shouldRemoveInstances, setshouldRemoveInstances] = React.useState(false);
  const [didUserRequestClose, setDidUserRequestClose] = useState(false);

  useEffect(() => {

    (async () => {

      if (shouldRemoveInstances) {

        // Add the instance metadata to the local database.
        const database = await client.getIndexedDBDatabase();
        const transaction = database.transaction("instances", "readwrite");
        const instances = transaction.objectStore("instances");
        for (const instanceHostname of instanceHostnames) instances.delete(instanceHostname);
        setDidUserRequestClose(true);
        onRemove();

      }

    })();

  }, [client, shouldRemoveInstances, instanceHostnames, onRemove]);

  const [searchParams] = useSearchParams();
  const localAction = searchParams.get("local-action");

  useEffect(() => {

    if (didUserRequestClose) {
      
      if (localAction === "remove-instance") {

        navigate(location.pathname);

      } else {

        requestClose();

      }

    }

  }, [localAction, requestClose, didUserRequestClose]);

  const handleSubmit = useCallback((event: FormEvent) => {

    event.preventDefault();

  }, [])

  return (
    <Popup shouldOpen={shouldOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <PopupHeader onClose={() => setDidUserRequestClose(true)} canClose={!shouldRemoveInstances}>Remove instance</PopupHeader>
        <PopupContent>
          <p>This will remove instances from your personal list. You can add them back whenever you want.</p>
          <section>
            <h2>Removed instances</h2>
            <ul>
              {instanceHostnames.map((instanceHostname) => <li key={instanceHostname}>{instanceHostname}</li>)}
            </ul>
          </section>
        </PopupContent>
        <PopupFooter>
          <button type="submit" className="destructive-button-filled" disabled={shouldRemoveInstances} onClick={() => setshouldRemoveInstances(true)}>
            <span>Remove instances</span>
            {
              shouldRemoveInstances ? <Spinner /> : null
            }
          </button>
          <button type="button" disabled={shouldRemoveInstances} onClick={() => setDidUserRequestClose(true)}>Cancel</button>
        </PopupFooter>
      </form>
    </Popup>
  );
}

export default React.memo(RemoveLocalInstancePopup);