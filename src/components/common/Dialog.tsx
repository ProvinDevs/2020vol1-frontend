import React, { FC } from "react";
import {
  Button,
  Dialog as DialogWrapper,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core/";

export type DialogProps = {
  title: string;
  agreeText: string;
  isOpen: boolean;
  handleClose: (isAgreed: boolean) => void;
};

const Dialog: FC<DialogProps> = (props) => {
  let Content = <></>;
  if (props.children !== undefined) {
    Content = (
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{props.children}</DialogContentText>
      </DialogContent>
    );
  }

  return (
    <DialogWrapper
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      open={props.isOpen}
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      {Content}
      <DialogActions>
        <Button onClick={() => props.handleClose(false)} color="primary" autoFocus>
          キャンセル
        </Button>
        <Button onClick={() => props.handleClose(true)} color="primary">
          {props.agreeText}
        </Button>
      </DialogActions>
    </DialogWrapper>
  );
};

export default Dialog;
