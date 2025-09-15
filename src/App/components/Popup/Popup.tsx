import React, { useCallback, useEffect } from "react";
import { popup as popupStyle, open as openStyle, visible as visibleStyle, popupContainer as popupContainerStyle } from "./Popup.module.css";

function Popup({shouldOpen, children, onClose}: {shouldOpen: boolean, children: React.ReactNode, onClose: () => void}) {

  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {

    if (shouldOpen) {

      setIsVisible(true);
      setTimeout(() => {

        setIsExpanded(true);

      }, 100);

    } else if (isExpanded) {

      setIsExpanded(false);

    }

  }, [isVisible, isExpanded, shouldOpen]);

  const handleTransitionEnd = useCallback(() => {

    if (!isExpanded) {

      setIsVisible(false);
      onClose();

    }

  }, [isExpanded]);

  return (
    <section className={`${popupContainerStyle} ${isExpanded ? openStyle : ""}`}>
      <section className={`${popupStyle} ${isVisible ? visibleStyle : ""}`} onTransitionEnd={handleTransitionEnd}>
        {children}
      </section>
    </section>
  );
}

export default React.memo(Popup);