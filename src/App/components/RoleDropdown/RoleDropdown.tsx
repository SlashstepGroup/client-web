import Dropdown from "#components/Dropdown/Dropdown";
import DropdownItem from "#components/DropdownItem/DropdownItem";
import DropdownItemList from "#components/DropdownItemList/DropdownItemList";
import Spinner from "#components/Spinner/Spinner";
import { Client, Role } from "@waltzgroup/javascript-sdk";
import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

function RoleDropdown({isOpen, onClick, onChange, isDisabled = false, selectedItem}: { isOpen: boolean, onClick: () => void, onChange: (role: Role) => void, isDisabled?: boolean, selectedItem?: ReactNode }) {

  const [query, setQuery] = React.useState("");
  const [roles, setRoles] = React.useState<Role[] | null>(null);

  useEffect(() => {

    // TODO: Get roles from API
    setRoles([
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
        roles ? (
          roles.length > 0 ? (
            <DropdownItemList>
              {
                roles.map((role) => (
                  <DropdownItem key={role.id} label={role.name} description={role.description} onClick={() => onChange(role)} />
                ))
              }
            </DropdownItemList>
          ) : (
            <p>No roles found. Go to your <Link to="/settings/roles">role settings</Link> to create one.</p>
          )
        ) : <Spinner />
      }
    </Dropdown>
  )

}

export default React.memo(RoleDropdown);