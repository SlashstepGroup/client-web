import React from "react";
import { list as listStyle } from "./ProfileFeaturedUserList.module.css";

function ProfileFeaturedUserList({children, label = "Featured users"}: {children: React.ReactNode, label?: string}) {

  return (
    <section>
      <h2>{label}</h2>
      <ul className={listStyle}>
        {children}
      </ul>
    </section>
  );

}

export default React.memo(ProfileFeaturedUserList);