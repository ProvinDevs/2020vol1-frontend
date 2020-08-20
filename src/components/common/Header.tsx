import React, { FC } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import styles from "../../scss/components/common/header.scss";

export type HeaderProps = {
  role: string;
  href: string;
};

const Header: FC<HeaderProps> = ({ role, href }: HeaderProps) => (
  <div className={styles.headerWrapper}>
    <Button color="primary" component={Link} to={href}>
      {role}の方
    </Button>
  </div>
);

export default Header;
