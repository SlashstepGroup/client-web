import React, { useEffect } from "react";
import PopupHeader from "../Popup/components/PopupHeader/PopupHeader";
import PopupContent from "../Popup/components/PopupContent/PopupContent";
import Popup from "../Popup/Popup";
import PopupFooter from "../Popup/components/PopupFooter/PopupFooter";
import { useLocation, useNavigate } from "react-router-dom";

function CreateWorkspacePopup({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) {

  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(isOpen);

  useEffect(() => {

    setIsVisible(isOpen);

  }, [isOpen]);

  return (
    <Popup isOpen={isVisible} onClose={onClose}>
      <PopupHeader onClose={() => navigate(location.pathname)}>
        Create workspace
      </PopupHeader>
      <PopupContent>
        <form>
          <section>
            <label htmlFor="workspaceName">Workspace name</label>
            <input type="text" id="workspaceName" name="workspaceName" placeholder="Workspace name" required />
          </section>
          <section>
            <label htmlFor="workspaceDescription">Workspace description</label>
            <input type="text" id="workspaceDescription" name="workspaceDescription" placeholder="Workspace description" />
          </section>
        </form>
      </PopupContent>
      <PopupFooter>
        <button type="submit" className="primary-button">Create</button>
      </PopupFooter>
    </Popup>
  );
}

export default React.memo(CreateWorkspacePopup);