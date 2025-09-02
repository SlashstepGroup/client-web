import { Role } from "@waltzgroup/javascript-sdk";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { permissionCell as permissionCellStyle } from "./UserRoleTableBodyRow.module.css";

export type UserTableBodyRowProperties = {
  role: Role;
  isSelected: boolean;
  onSelectionBoxClick: () => void;
  isSelectionDisabled: boolean;
}

function UserRoleTableBodyRow({role, isSelected, onSelectionBoxClick, isSelectionDisabled}: UserTableBodyRowProperties) {

  const { instanceID } = useParams();
  const { id, name, description } = role;

  return (
    <tr>
      <td className="checkbox-cell">
        <section>
          <input type="checkbox" checked={isSelected} onClick={onSelectionBoxClick} disabled={isSelectionDisabled} />
        </section>
      </td>
      <td>
        <Link to={`/instances/${instanceID}/settings/roles/manage/${id}`}>{name}</Link>
      </td>
      <td className={permissionCellStyle}>{description}</td>
    </tr>
  );

}

export default React.memo(UserRoleTableBodyRow);