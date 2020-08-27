import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

import styles from "../../scss/components/common/backButton.scss";

type BackButtonProps = {
  href: string;
};

const BackButton: FC<BackButtonProps> = ({ href }) => (
  <div className={styles.button}>
    <Button color="primary" component={Link} to={href} startIcon={<ArrowBack />}>
      戻る
    </Button>
  </div>
);

export default BackButton;
