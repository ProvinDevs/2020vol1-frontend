import React, { FC } from "react";
import { TextField, Button } from "@material-ui/core";

import { ClassFormProps } from "../pages/student/JoinClass";

import styles from "../scss/components/joinClassForm.scss";

const JoinClassForm: FC<ClassFormProps> = (props) => {
  const error = !props.passPhraseState;
  const helperText = error ? "授業コードをご確認ください" : "";

  return (
    <>
      <TextField
        required
        autoFocus
        fullWidth
        margin="normal"
        label="授業コード"
        error={error}
        helperText={helperText}
        value={props.passPhrase}
        onChange={props.setEditContents}
      />
      <div className={styles.joinFormButton}>
        <Button
          fullWidth
          size="large"
          color="primary"
          variant="contained"
          disabled={props.passPhrase === ""}
          onClick={props.clickJoinButton}
        >
          参加する
        </Button>
      </div>
    </>
  );
};

export default JoinClassForm;
