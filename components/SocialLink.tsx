import React from "react";
import styles from "../styles/Home.module.css";
import SVGIcon from "@mui/material/SvgIcon";

type SocialLinkProps = {
  Icon: typeof SVGIcon;
  link: string;
  title: string;
};

export const SocialLink = ({ link, title, Icon }: SocialLinkProps) => {
  return (
    <a
      className={styles.link}
      rel="noopener noreferrer"
      target="_blank"
      data-title={title}
      href={link}
    >
      <Icon className={styles.icon} />
    </a>
  );
};
