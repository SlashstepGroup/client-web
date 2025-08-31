import MenuList from "#components/MenuList/MenuList";
import MenuListDisplayItem from "#components/MenuListDisplayItem/MenuListDisplayItem";
import MenuListDropdownItem from "#components/MenuListDropdownItem/MenuListDropdownItem";
import PersonIcon from "#icons/PersonIcon";
import { User } from "@waltzgroup/javascript-sdk";
import React from "react";

function MenuListUserAccessPoliciesDropdownItem({user}: { user: User }) {

  return (
    <MenuListDropdownItem icon={<PersonIcon />} label={"Access policies"} description={"Directly manage access policies for this user. These policies take priority over roles."}>
      <MenuList>
        <MenuListDisplayItem>
          <section className="table-container">
            <table cellSpacing={0}>
              <colgroup className="checkbox-colgroup" />
              <colgroup />
              <colgroup />
              <colgroup />
              <thead>
                <tr>
                  <th scope="col" className="checkbox-cell">
                    <section>
                      <input type="checkbox" />
                    </section>
                  </th>
                  <th scope="col">Action</th>
                  <th scope="col">Permission level</th>
                  <th scope="col">Inheritance level</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </section>
        </MenuListDisplayItem>
      </MenuList>
    </MenuListDropdownItem>
  )
  
}

export default React.memo(MenuListUserAccessPoliciesDropdownItem);