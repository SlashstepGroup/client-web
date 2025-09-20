import React from "react";
import { Link } from "react-router-dom";
import { featuredUserItem as featuredUserItemStyle, profilePicture as profilePictureStyle, name as nameStyle } from "./ProfileFeaturedUserItem.module.css";

function ProfileFeaturedUserItem({name, link, avatarLink = "https://www.gravatar.com/avatar?d=mp"}: {name: string, link: string, avatarLink?: string}) {

  return (
    <li className={featuredUserItemStyle}>
      <figure>
        <Link to={link}>
          <img className={profilePictureStyle} src={avatarLink} alt="User avatar" />
        </Link>
        <figcaption className={nameStyle}>
          <Link to={link}>{name}</Link>
        </figcaption>
      </figure>
    </li>
  );

}

export default React.memo(ProfileFeaturedUserItem);