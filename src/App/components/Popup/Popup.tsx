import React, { useCallback, useEffect } from "react";
import { popup as popupStyle, open as openStyle, visible as visibleStyle } from "./Popup.module.css";

function Popup({isOpen, children, onClose}: {isOpen: boolean, children: React.ReactNode, onClose: () => void}) {

  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {

    if (isOpen) {

      setIsVisible(true);
      setTimeout(() => {

        setIsExpanded(true);

      }, 100);

    } else if (isExpanded) {

      setIsExpanded(false);

    }

  }, [isVisible, isExpanded, isOpen]);

  const handleTransitionEnd = useCallback(() => {

    if (!isExpanded) {

      setIsVisible(false);
      onClose();

    }

  }, [isExpanded]);

  return (
    <section id={popupStyle} className={`${isExpanded ? openStyle : ""} ${isVisible ? visibleStyle : ""}`} onTransitionEnd={handleTransitionEnd}>
      {children}
    </section>
  );
}

export default React.memo(Popup);