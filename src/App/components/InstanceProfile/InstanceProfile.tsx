import React, { useEffect } from "react";
import { banner as bannerStyle, options as optionsStyle, profileToolbar as profileToolbarStyle } from "./InstanceProfile.module.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ProfileFeaturedUserList from "../ProfileFeaturedUserList/ProfileFeaturedUserList";
import ProfileFeaturedUserItem from "../ProfileFeaturedUserItem/ProfileFeaturedUserItem";
import ProfileLinkList from "../MenuList/MenuList";
import ProfileLinkItem from "../MenuListLinkItem/MenuListLinkItem";
import { Instance } from "@waltzgroup/javascript-sdk";
import Skeleton from "#components/Skeleton/Skeleton";

export type WorkspaceProperties = {
  name: string;
  displayName: string;
  description?: string;
}

function InstanceOverviewPage({instance}: {instance: Instance | null}) {

  return (
    <main>
      <section id={bannerStyle}>
  
      </section>
      <section>
        {
          instance ? <h1>{instance.displayName}</h1> : <Skeleton width={300} height={30} />
        }
        <section>
          {instance ? <p>{instance.description}</p> : <Skeleton width={500} height={20} />}
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