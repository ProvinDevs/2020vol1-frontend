import React, { FC } from "react";
import { Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

import * as H from "history";

import styles from "../../scss/components/common/backButton.scss";

type BackButtonProps = {
  history: H.History;
};

const BackButton: FC<BackButtonProps> = ({ history }) => (
  <div className={styles.button}>
    <Button color="primary" onClick={history.goBack} startIcon={<ArrowBack />}>
      戻る
    </Button>
  </div>
);

export default BackButton;
