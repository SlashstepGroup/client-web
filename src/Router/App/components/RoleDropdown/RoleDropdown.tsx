import Dropdown from "#components/Dropdown/Dropdown";
import DropdownItem from "#components/DropdownItem/DropdownItem";
import DropdownItemList from "#components/DropdownItemList/DropdownItemList";
import Spinner from "#components/Spinner/Spinner";
import { Client, Role } from "@slashstepgroup/javascript-sdk";
import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

function RoleDropdown({isOpen, onClick, onChange, isDisabled = false, selectedItem}: { isOpen: boolean, onClick: () => void, onChange: (role: Role) => void, isDisabled?: boolean, selectedItem?: ReactNode }) {

  const [query, setQuery] = React.useState("");
  const [groups, setGroups] = React.useState<Role[] | null>(null);

  useEffect(() => {

    // TODO: Get groups from API
    setGroups([
      new Role({
        id: "123",
        name: "Instance admins",
        description: "People who can manage most instance resources and bypass most permission checks."
      }, {} as Client)
    ]);

  }, []);

  return (
    <Dropdown name="Add role" isOpen={isOpen} selectedItem={selectedItem} onClick={onClick} isDisabled={isDisabled}>
      <section style={{width: "100%"}}>
        <input style={{width: "100%"}} type="text" placeholder="Search for a role" value={query} onChange={(event) => setQuery(event.target.value)} />
      </section>
      {
        groups ? (
          groups.length > 0 ? (
            <DropdownItemList>
              {
                groups.map((role) => (
                  <DropdownItem key={role.id} description={role.description} onClick={() => onChange(role)}>{role.name}</DropdownItem>
                ))
              }
            </DropdownItemList>
          ) : (
            <p>No groups found. Go to your <Link to="/settings/groups">role settings</Link> to create one.</p>
          )
        ) : <Spinner />
      }
    </Dropdown>
  )

}

export default React.memo(RoleDropdown);