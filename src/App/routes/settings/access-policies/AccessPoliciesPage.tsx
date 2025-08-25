import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import KeyIcon from "#icons/KeyIcon";
import SettingsIcon from "#icons/SettingsIcon";
import Tip from "#components/Tip/Tip";
import { AccessPolicy, Client, User } from "@waltzgroup/javascript-sdk";
import Spinner from "#components/Spinner/Spinner";
import { principalTypeCell as prinicipalTypeCellStyle } from "./AccessPoliciesPage.module.css";
import AccessPolicyTableBodyRow from "#components/AccessPolicyTableBodyRow/AccessPolicyTableBodyRow";
import { AccessPolicyPermissionLevel } from "../../../../../../javascript-sdk/dist/resources/AccessPolicy/AccessPolicy";

function AccessPoliciesPage() {

  const navigate = useNavigate();

  useEffect(() => {

    document.title = "Access policies • Waltz";

  }, []);

  const [accessPolicies, setAccessPolicies] = React.useState<AccessPolicy[] | null>(null);

  useEffect(() => {

    // TODO: Get access policies from API
    setAccessPolicies([
      new AccessPolicy({
        id: "accessPolicy1",
        principalID: "user1",
        principalType: "User",
        scopeID: "workspace1",
        scopeType: "Workspace",
        actionID: "action1",
        permissionLevel: AccessPolicyPermissionLevel.User,
        principal: new User({
          id: "user1",
          username: "user1",
          displayName: "User 1"
        }, {} as Client)
      }, {} as Client),
    ]);

  }, []);

  return (
    <>
      <section id="main-container">
        <BreadcrumbList>
          <Breadcrumb icon={<SettingsIcon />} link="/settings">
            Settings
          </Breadcrumb>
          <Breadcrumb icon={<KeyIcon />} link="/settings/access">
            Access policies
          </Breadcrumb>
        </BreadcrumbList>
        <main>
          <h1>Access policies</h1>
          <p>Access policies control who can access your instance's resources.</p>
          <Tip>You are currently managing access on an instance-level. To manage workspace-level or project-level access, <Link to="?client-action=scopes.change">change your current scope.</Link></Tip>
          <section className="button-list">
            <button className="primary-button" onClick={() => navigate("?action=accessPolicies.create")} disabled>Add principal</button>
          </section>
          {
            accessPolicies ? (
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
                      <th className={prinicipalTypeCellStyle} scope="col">Type</th>
                      <th scope="col">Principal</th>
                      <th scope="col">Permissions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      accessPolicies.map((accessPolicy) => (
                        <AccessPolicyTableBodyRow key={accessPolicy.id} principal={accessPolicy.principal} />
                      ))
                    }
                  </tbody>
                </table>
              </section>
            ) : <Spinner />
          }
        </main>
      </section>
    </>
  );

}

export default React.memo(AccessPoliciesPage);