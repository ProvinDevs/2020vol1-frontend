import React, { FC, useState, ChangeEvent } from "react";
import { Container } from "@material-ui/core";

import Header, { HeaderProps } from "../../components/common/Header";
import PageContainer from "../../components/common/Container";
import JoinClassForm from "../../components/JoinClassForm";
import Dialog, { DialogProps } from "../../components/common/Dialog";
import { ApiClient } from "../../api";

import styles from "../../scss/pages/student/joinClass.scss";

const headerProps: HeaderProps = {
  role: "教師",
  href: "/about",
};

type TextAreaElement = ChangeEvent<HTMLTextAreaElement>;

type JoinClassProps = {
  api: ApiClient;
};

export type ClassFormProps = {
  passPhrase: string;
  passPhraseState: boolean;
  setEditContents: (element: TextAreaElement) => void;
  clickJoinButton: () => void;
};

const checkBlankSpace = (value: string) => /\S/g.test(value);

const JoinClass: FC<JoinClassProps> = ({ api }) => {
  const [passPhrase, setPassPhrase] = useState("");
  const [passPhraseState, setMatchState] = useState({ noError: false, first: true });
  const [className, setClassName] = useState("");

  const resetState = (isFirst = false) => {
    setPassPhrase("");
    setMatchState({ noError: false, first: isFirst });
    setClassName("");
  };

  const setEditContents = (element: TextAreaElement) => {
    const value = element.target.value;
    const passPhraseValue = checkBlankSpace(value) ? value : "";
    setPassPhrase(passPhraseValue);
  };

  const clickJoinButton = async () => {
    const getClass = await api.getClassByPassphrase(passPhrase);
    if (getClass === undefined) {
      resetState();
      return;
    }
    setClassName(getClass.name);
    setMatchState({ noError: true, first: false });
  };

  const handleClose = (disagree: boolean) => {
    if (disagree) {
      resetState(true);
      return;
    }
    window.location.href = "/";
  };

  const classFormPropsValue: ClassFormProps = {
    passPhrase: passPhrase,
    passPhraseState: passPhraseState.first ? passPhraseState.first : passPhraseState.noError,
    setEditContents: setEditContents,
    clickJoinButton: clickJoinButton,
  };

  const DialogPropsValue: DialogProps = {
    title: `${className}に参加しますか`,
    agree: "参加",
    isOpen: passPhraseState.noError,
    handleClose: handleClose,
  };

  return (
    <>
      <Header {...headerProps} />
      <PageContainer>
        <Container maxWidth="xs" className={styles.joinForm}>
          <h1>授業に参加する</h1>
          <JoinClassForm {...classFormPropsValue} />
        </Container>
      </PageContainer>
      <Dialog {...DialogPropsValue}></Dialog>
    </>
  );
};

export default JoinClass;
