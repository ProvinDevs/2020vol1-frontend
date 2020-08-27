import React, { FC } from "react";
import { Button, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";

import styles from "../../scss/components/common/header.scss";

export type HeaderProps = {
  buttonText: string;
  href: string;
};

const Header: FC<HeaderProps> = ({ buttonText, href }) => (
  <Toolbar className={styles.header}>
    <h2>
      <Link to="/" style={{ color: "black" }}>
        2.5次元黒板
      </Link>
    </h2>
    <Button variant="outlined" color="primary" component={Link} to={href}>
      {buttonText}
    </Button>
  </Toolbar>
);

export default Header;
