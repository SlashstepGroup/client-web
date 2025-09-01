import Dropdown from "#components/Dropdown/Dropdown";
import React, { useCallback } from "react";
import { AccessPolicyInheritanceLevel } from "@waltzgroup/javascript-sdk";
import DropdownItem from "#components/DropdownItem/DropdownItem";
import DropdownItemList from "#components/DropdownItemList/DropdownItemList";

function PermissionLevelDropdown({selectedInheritanceLevel, onChange, isDisabled = false}: { selectedInheritanceLevel: AccessPolicyInheritanceLevel, onChange: (newInheritanceLevel: AccessPolicyInheritanceLevel) => void, isDisabled: boolean }) {

  const [isOpen, setIsOpen] = React.useState(false);

  const handleChange = useCallback((newPermissionLevel: AccessPolicyInheritanceLevel) => {

    onChange(newPermissionLevel);
    setIsOpen(false);

  }, [onChange]);

  const inheritanceLevelMap = {
    [AccessPolicyInheritanceLevel.Disabled]: "Disabled",
    [AccessPolicyInheritanceLevel.Recommended]: "Recommended",
    [AccessPolicyInheritanceLevel.Required]: "Required",
    [AccessPolicyInheritanceLevel.Locked]: "Locked"
  };

  return (
    <Dropdown name="Inheritance" isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} selectedItem={inheritanceLevelMap[selectedInheritanceLevel]} isDisabled={isDisabled}>
      <DropdownItemList>
        <DropdownItem isSelected={selectedInheritanceLevel === AccessPolicyInheritanceLevel.Disabled} onClick={() => handleChange(AccessPolicyInheritanceLevel.Disabled)} label="Disabled" description="Child resources will not inherit this access policy." />
        <DropdownItem isSelected={selectedInheritanceLevel === AccessPolicyInheritanceLevel.Recommended} onClick={() => handleChange(AccessPolicyInheritanceLevel.Recommended)} label="Recommended" description="Child resources will inherit this access policy by default." />
        <DropdownItem isSelected={selectedInheritanceLevel === AccessPolicyInheritanceLevel.Required} onClick={() => handleChange(AccessPolicyInheritanceLevel.Required)} label="Required" description="Child resources will inherit this access policy and are required to have the selected permission level at minimum." />
        <DropdownItem isSelected={selectedInheritanceLevel === AccessPolicyInheritanceLevel.Locked} onClick={() => handleChange(AccessPolicyInheritanceLevel.Locked)} label="Locked" description="Child resources will inherit this access policy and cannot change the policy." />
      </DropdownItemList>
    </Dropdown>
  )

}

export default React.memo(PermissionLevelDropdown);