import React from "react";

function DropdownItemList({children}: {children: React.ReactNode}) {

  return (
    <ul className="dropdown-items">
      {children}
    </ul>
  )

}

export default React.memo(DropdownItemList);