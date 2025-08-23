import React, { useEffect } from "react";
import PopupHeader from "../Popup/components/PopupHeader/PopupHeader";
import PopupContent from "../Popup/components/PopupContent/PopupContent";
import Popup from "../Popup/Popup";
import PopupFooter from "../Popup/components/PopupFooter/PopupFooter";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

function CreateWorkspacePopup({shouldOpen, onClose}: {shouldOpen: boolean, onClose: () => void}) {

  const location = useLocation();
  const navigate = useNavigate();
  const [workspaceName, setWorkspaceName] = React.useState("");
  const [workspaceDescription, setWorkspaceDescription] = React.useState("");
  const [shouldCreateWorkspace, setShouldCreateWorkspace] = React.useState(false);

  return (
    <Popup shouldOpen={shouldOpen} onClose={onClose}>
      <PopupHeader onClose={() => navigate(location.pathname)}>
        Create workspace
      </PopupHeader>
      <PopupContent>
        <form>
          <section>
            <label htmlFor="workspaceName">Workspace name</label>
            <input type="text" id="workspaceName" name="workspaceName" required disabled={shouldCreateWorkspace} onChange={(event) => setWorkspaceName(event.target.value)} />
          </section>
          <section>
            <label htmlFor="workspaceDescription">Workspace description</label>
            <input type="text" id="workspaceDescription" name="workspaceDescription" disabled={shouldCreateWorkspace} onChange={(event) => setWorkspaceDescription(event.target.value)} />
          </section>
        </form>
      </PopupContent>
      <PopupFooter>
        <button type="submit" className="primary-button" disabled={!workspaceName.trim() || shouldCreateWorkspace} onClick={() => setShouldCreateWorkspace(true)}>
          <span>Create</span>
          {
            shouldCreateWorkspace ? (
              <Spinner />
            ) : null
          }
        </button>
        <button type="button" disabled={shouldCreateWorkspace} onClick={() => navigate(location.pathname)}>Cancel</button>
      </PopupFooter>
    </Popup>
  );
}

export default React.memo(CreateWorkspacePopup);