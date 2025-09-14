import React, { FormEvent, useCallback, useEffect, useState } from "react";
import PopupHeader from "../Popup/components/PopupHeader/PopupHeader";
import PopupContent from "../Popup/components/PopupContent/PopupContent";
import Popup from "../Popup/Popup";
import PopupFooter from "../Popup/components/PopupFooter/PopupFooter";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { Client } from "@slashstepgroup/javascript-sdk";

function AddInstancePopup({client, shouldOpen, requestClose, onClose}: {client: Client, shouldOpen: boolean, requestClose: () => void, onClose: () => void}) {

  const location = useLocation();
  const navigate = useNavigate();
  const [instanceHostname, setInstanceHostname] = React.useState("");
  const [shouldAddInstance, setShouldAddInstance] = React.useState(false);
  const [didUserRequestClose, setDidUserRequestClose] = useState(false);

  useEffect(() => {

    (async () => {

      if (shouldAddInstance) {

        // Add the instance metadata to the local database.
        const database = await client.getIndexedDBDatabase();
        const transaction = database.transaction("instances", "readwrite");
        const instances = transaction.objectStore("instances");
        instances.put({hostname: instanceHostname});

        transaction.oncomplete = function() {

          setDidUserRequestClose(true);

        }

      }

    })();

  }, [client, shouldAddInstance, instanceHostname]);

  const [searchParams] = useSearchParams();
  const localAction = searchParams.get("local-action");

  useEffect(() => {

    if (didUserRequestClose) {
      
      if (localAction === "add-instance") {

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
        <PopupHeader onClose={() => setDidUserRequestClose(true)} canClose={!shouldAddInstance}>Add instance</PopupHeader>
        <PopupContent>
          <section>
            <label htmlFor="workspaceName">Instance hostname</label>
            <input type="text" id="workspaceName" name="workspaceName" placeholder="public.slashstep.com" required disabled={shouldAddInstance} onChange={(event) => setInstanceHostname(event.target.value)} />
          </section>
        </PopupContent>
        <PopupFooter>
          <button type="submit" className="primary-button" disabled={!instanceHostname.trim() || shouldAddInstance} onClick={() => setShouldAddInstance(true)}>
            <span>Add instance</span>
            {
              shouldAddInstance ? <Spinner /> : null
            }
          </button>
          <button type="button" disabled={shouldAddInstance} onClick={() => setDidUserRequestClose(true)}>Cancel</button>
        </PopupFooter>
      </form>
    </Popup>
  );
}

export default React.memo(AddInstancePopup);