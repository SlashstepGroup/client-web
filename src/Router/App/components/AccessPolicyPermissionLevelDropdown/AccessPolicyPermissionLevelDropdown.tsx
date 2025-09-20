import Dropdown from "#components/Dropdown/Dropdown";
import React, { useCallback } from "react";
import { AccessPolicyPermissionLevel } from "@slashstepgroup/javascript-sdk";
import DropdownItem from "#components/DropdownItem/DropdownItem";
import DropdownItemList from "#components/DropdownItemList/DropdownItemList";

function PermissionLevelDropdown({selectedPermissionLevel, onChange, isDisabled = false}: { selectedPermissionLevel: AccessPolicyPermissionLevel, onChange: (permissionLevel: AccessPolicyPermissionLevel) => void, isDisabled: boolean }) {

  const [isOpen, setIsOpen] = React.useState(false);

  const handleChange = useCallback((newPermissionLevel: AccessPolicyPermissionLevel) => {

    onChange(newPermissionLevel);
    setIsOpen(false);

  }, [onChange]);

  return (
    <Dropdown name="Permission level" isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} selectedItem={selectedPermissionLevel} isDisabled={isDisabled}>
      <DropdownItemList>
        <DropdownItem isSelected={selectedPermissionLevel === AccessPolicyPermissionLevel.None} onClick={() => handleChange(AccessPolicyPermissionLevel.None)} description="The principal cannot perform this action.">{AccessPolicyPermissionLevel.None}</DropdownItem>
        <DropdownItem isSelected={selectedPermissionLevel === AccessPolicyPermissionLevel.User} onClick={() => handleChange(AccessPolicyPermissionLevel.User)} description="The principal can perform this action.">{AccessPolicyPermissionLevel.User}</DropdownItem>
        <DropdownItem isSelected={selectedPermissionLevel === AccessPolicyPermissionLevel.Admin} onClick={() => handleChange(AccessPolicyPermissionLevel.Admin)} description="The principal can perform this action, along with managing the permission level of other principals.">{AccessPolicyPermissionLevel.Admin}</DropdownItem>
      </DropdownItemList>
    </Dropdown>
  )

}

export default React.memo(PermissionLevelDropdown);