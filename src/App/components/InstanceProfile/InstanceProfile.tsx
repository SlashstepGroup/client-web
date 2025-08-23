import React, { useEffect } from "react";
import { banner as bannerStyle, options as optionsStyle, profileToolbar as profileToolbarStyle } from "./InstanceProfile.module.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ProfileFeaturedUserList from "../ProfileFeaturedUserList/ProfileFeaturedUserList";
import ProfileFeaturedUserItem from "../ProfileFeaturedUserItem/ProfileFeaturedUserItem";
import ProfileLinkList from "../MenuList/MenuList";
import ProfileLinkItem from "../MenuListLinkItem/MenuListLinkItem";
import { Instance } from "@waltzgroup/javascript-sdk";

export type WorkspaceProperties = {
  name: string;
  displayName: string;
  description?: string;
}

function InstanceOverviewPage({instance}: {instance: Instance}) {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [shouldSave, setShouldSave] = React.useState(false);
  const [newInstanceName, setNewInstanceName] = React.useState(instance.displayName);
  const [newDescription, setNewDescription] = React.useState(instance.description);

  const isEditing = searchParams.get("mode") === "edit";
  const currentTab = searchParams.get("tab");

  useEffect(() => {

    document.title = "Instance overview • Waltz";

  }, []);

  const didChange = (newInstanceName && newInstanceName !== instance.displayName) || (newDescription && newDescription !== instance.description);

  return (
    <main>
      <section id={bannerStyle}>
  
      </section>
      <section>
        <h1>{instance.displayName}</h1>
        <section>
          <p>{instance.description}</p>
        </section>
      </section>
      {/* <ProfileFeaturedUserList label="Instance admins">
        <ProfileFeaturedUserItem link="/users/1" name="Christian Toney" />
        <ProfileFeaturedUserItem link="/users/2" name="Jane Doe" />
        <ProfileFeaturedUserItem link="/users/3" name="Jane Doe" />
      </ProfileFeaturedUserList>
      <ProfileLinkList>
        <ProfileLinkItem link="https://discord.gg/xgTSXab5jz" label="Community Discord server" />
      </ProfileLinkList> */}
    </main>
  );

}

export default React.memo(InstanceOverviewPage);