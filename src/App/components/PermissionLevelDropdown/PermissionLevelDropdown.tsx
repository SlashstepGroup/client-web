import Dropdown from "#components/Dropdown/Dropdown";
import React, { useCallback } from "react";
import { AccessPolicyPermissionLevel } from "@waltzgroup/javascript-sdk";
import DropdownItem from "#components/DropdownItem/DropdownItem";

function PermissionLevelDropdown({selectedPermissionLevel, onChange, isDisabled = false}: { selectedPermissionLevel: AccessPolicyPermissionLevel, onChange: (permissionLevel: AccessPolicyPermissionLevel) => void, isDisabled: boolean }) {

  const [isOpen, setIsOpen] = React.useState(false);

  const handleChange = useCallback((newPermissionLevel: AccessPolicyPermissionLevel) => {

    onChange(newPermissionLevel);
    setIsOpen(false);

  }, [onChange]);

  const permissionLevelMap = {
    [AccessPolicyPermissionLevel.None]: "None",
    [AccessPolicyPermissionLevel.User]: "User",
    [AccessPolicyPermissionLevel.Admin]: "Admin"
  };

  return (
    <Dropdown isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} selectedItem={permissionLevelMap[selectedPermissionLevel]} isDisabled={isDisabled}>
      <DropdownItem isSelected={selectedPermissionLevel === AccessPolicyPermissionLevel.None} onClick={() => handleChange(AccessPolicyPermissionLevel.None)} label="None" description="The principal cannot perform this action." />
      <DropdownItem isSelected={selectedPermissionLevel === AccessPolicyPermissionLevel.User} onClick={() => handleChange(AccessPolicyPermissionLevel.User)} label="User" description="The principal can perform this action." />
      <DropdownItem isSelected={selectedPermissionLevel === AccessPolicyPermissionLevel.Admin} onClick={() => handleChange(AccessPolicyPermissionLevel.Admin)} label="Admin" description="The principal can perform this action, along with managing the permission level of other principals." />
    </Dropdown>
  )

}

export default React.memo(PermissionLevelDropdown);