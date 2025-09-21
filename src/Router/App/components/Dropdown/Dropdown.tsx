import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { dropdownContainer as dropdownContainerStyle, dropdown as dropdownStyle, dropdownBackground as dropdownBackgroundStyle, dropdownTitle as dropdownTitleStyle, toggleButton as toggleButtonStyle } from "./Dropdown.module.css";
import DropdownArrowIcon from "#components/icons/DropdownArrowIcon";
import Spinner from "#components/Spinner/Spinner";

function Dropdown({name, isOpen, onClick, selectedItem, children, isDisabled = false}: { name: string, isOpen: boolean, onClick: () => void, selectedItem?: ReactNode, children?: React.ReactNode, isDisabled?: boolean }) {

  const buttonContainerRef = React.useRef<HTMLElement>(null);
  const [buttonBoundingClientRect, setButtonBoundingClientRect] = useState<DOMRect | null>(null);
  const dropdownBackgroundRef = React.useRef<HTMLElement>(null);
  const [shouldDropdownBeOnTop, setShouldDropdownBeOnTop] = useState(false);

  useEffect(() => {

    if (isOpen) {

      const buttonContainer = buttonContainerRef.current;

      if (!buttonContainer) {
        return;
      }
      
      const refreshPosition = () => {

        const buttonRect = buttonContainer.getBoundingClientRect();
        setButtonBoundingClientRect(buttonRect);

      }

      refreshPosition();
      window.addEventListener("resize", refreshPosition);

      return () => {
        window.removeEventListener("resize", refreshPosition);
      }
    
    }

  }, [isOpen]);

  return (
    /** 
     * Using a button container because the button element's bounding rect transitions when the dropdown is opened, 
     * making it not reliable for positioning the dropdown. 
     */
    <section ref={buttonContainerRef} className={dropdownContainerStyle}>
      <button type="button" onClick={onClick} disabled={isDisabled || !children} className={toggleButtonStyle}>
        <span>{selectedItem ?? (children ? "Select an item" : "No items available")}</span>
        <DropdownArrowIcon />
      </button>
      {
        isOpen && buttonBoundingClientRect !== null ? createPortal(
          <section className={dropdownBackgroundStyle} ref={dropdownBackgroundRef} style={{ "--dropdown-left-offset": `${buttonBoundingClientRect.x}px`, "--dropdown-top-offset": `${buttonBoundingClientRect.y + buttonBoundingClientRect.height + 15}px` } as React.CSSProperties}>
            <section className={dropdownStyle}>
              <b className={dropdownTitleStyle}>{name}</b>
              {children}
            </section>
          </section>, document.getElementById("root") as HTMLElement
        ) : null
      }
    </section>
  )

}

export default React.memo(Dropdown);