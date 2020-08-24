import React, { FC, useState, ChangeEvent } from "react";
import { Container } from "@material-ui/core";

import Header, { HeaderProps } from "../../components/common/Header";
import PageContainer from "../../components/common/Container";
import JoinClassForm from "../../components/JoinClassForm";
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
  const [passPhraseState, setMatchState] = useState(true);

  const setEditContents = (element: TextAreaElement) => {
    const value = element.target.value;
    const passPhraseValue = checkBlankSpace(value) ? value : "";
    setPassPhrase(passPhraseValue);
  };

  const clickJoinButton = async () => {
    const getClass = await api.getClassByPassphrase(passPhrase);
    if (getClass === undefined) {
      setPassPhrase("");
      setMatchState(false);
      return;
    }
    console.log(getClass);
  };

  const classFormPropsValue: ClassFormProps = {
    passPhrase: passPhrase,
    passPhraseState: passPhraseState,
    setEditContents: setEditContents,
    clickJoinButton: clickJoinButton,
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
    </>
  );
};

export default JoinClass;
