import PencilIcon from "#icons/PencilIcon";
import { AccessPolicy, Group, User } from "@waltzgroup/javascript-sdk";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { permissionCell as permissionCellStyle } from "./UserTableBodyRow.module.css";

export type UserTableBodyRowProperties = {
  user: User;
  isSelected: boolean;
  onSelectionBoxClick: () => void;
}

function UserTableBodyRow({user, isSelected, onSelectionBoxClick}: UserTableBodyRowProperties) {

  const { id, username, displayName } = user;
  const navigate = useNavigate();

  return (
    <tr>
      <td className="checkbox-cell">
        <section>
          <input type="checkbox" checked={isSelected} onClick={onSelectionBoxClick} />
        </section>
      </td>
      <td>
        <Link to={`/settings/users/manage/${username}`}>{displayName ?? ""}</Link>
      </td>
      <td>{username}</td>
      <td className={permissionCellStyle}>
        <span>
          <span>None</span>
        </span>
      </td>
    </tr>
  );

}

export default React.memo(UserTableBodyRow);