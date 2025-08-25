import PencilIcon from "#icons/PencilIcon";
import { Group, User } from "@waltzgroup/javascript-sdk";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { permissionCell as permissionCellStyle } from "./AccessPolicyTableBodyRow.module.css";

export type AccessPolicyTableBodyRowProperties = {
  principal: User | Group;
}

function AccessPolicyTableBodyRow({principal}: AccessPolicyTableBodyRowProperties) {

  const uniqueName = principal instanceof User ? principal.username : principal.name;
  const displayName = principal.displayName ?? uniqueName;
  const navigate = useNavigate();

  return (
    <tr>
      <td className="checkbox-cell">
        <section>
          <input type="checkbox" />
        </section>
      </td>
      <td>User</td>
      <td>
        <Link to={`/users/${uniqueName}`}>{displayName}</Link>
      </td>
      <td className={permissionCellStyle}>
        <span>
          <span>None</span>
          <button className="icon-button" onClick={() => navigate(`?action=accessPolicies.edit&principal-id=${principal.id}&scope-type=instance`)}>
            <PencilIcon />
          </button>
        </span>
      </td>
    </tr>
  );

}

export default React.memo(AccessPolicyTableBodyRow);