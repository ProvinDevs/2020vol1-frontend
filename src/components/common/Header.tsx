import React, { FC } from "react";
import { Button, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";

import styles from "../../scss/components/common/header.scss";

export type HeaderProps = {
  role: string;
  href: string;
};

const Header: FC<HeaderProps> = ({ role, href }: HeaderProps) => (
  <Toolbar className={styles.header}>
    <h2>2.5次元黒板</h2>
    <Button variant="outlined" color="primary" component={Link} to={href}>
      {role}の方
    </Button>
  </Toolbar>
);

export default Header;
