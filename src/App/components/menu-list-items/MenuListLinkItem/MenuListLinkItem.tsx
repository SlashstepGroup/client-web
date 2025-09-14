import React from "react";
import { Link } from "react-router-dom";
import { item as itemStyle, information as informationStyle } from "./MenuListLinkItem.module.css";
import RightChevronIcon from "../../icons/RightChevronIcon";
import ArrowOutwardIcon from "../../icons/ArrowOutwardIcon";

function MenuListLinkItem({label, link, icon, description}: {label: React.ReactNode, link: string, icon?: React.ReactNode, description?: React.ReactNode}) {

  return (
    <li className={itemStyle}>
      <Link to={link}>
        <section>
          {icon}
          <section className={informationStyle}>
            <span>{label}</span>
            {description ? <p>{description}</p> : null}
          </section>
        </section>
        {
          link.startsWith("/") || link.startsWith("?") || link.startsWith("#") ? <RightChevronIcon /> : <ArrowOutwardIcon />
        }
      </Link>
    </li>
  );

}

export default React.memo(MenuListLinkItem);