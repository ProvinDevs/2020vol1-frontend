import React, { FC, useState, ChangeEvent } from "react";
import { Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import Header, { HeaderProps } from "../../components/common/Header";
import PageContainer from "../../components/common/Container";
import JoinClassForm from "../../components/JoinClassForm";
import Dialog, { DialogProps } from "../../components/common/Dialog";
import { ApiClient, Class } from "../../api";

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

type State = {
  passPhraseState: { noError: boolean; first: boolean };
  passPhrase: string;
  class?: Class;
};

const checkBlankSpace = (value: string) => /\S/g.test(value);

const JoinClass: FC<JoinClassProps> = ({ api }) => {
  const history = useHistory();

  const [state, setState] = useState<State>({
    passPhraseState: { noError: false, first: true },
    passPhrase: "",
    class: undefined,
  });

  const resetState = (isFirst = false) => {
    setState({
      passPhraseState: { noError: false, first: isFirst },
      passPhrase: "",
      class: undefined,
    });
  };

  const setEditContents = (element: TextAreaElement) => {
    const value = element.target.value;
    const passPhraseValue = checkBlankSpace(value) ? value : "";
    setState({ ...state, passPhrase: passPhraseValue });
  };

  const clickJoinButton = async () => {
    const getClass = await api.getClassByPassphrase(state.passPhrase);
    if (getClass === undefined) {
      resetState();
      return;
    }
    setState({
      ...state,
      passPhraseState: { noError: true, first: false },
      class: getClass,
    });
  };

  const handleClose = (isAgreed: boolean) => {
    if (!isAgreed) {
      resetState(true);
      return;
    }

    history.replace(`/student/class/${state.class?.passPhrase}`);
  };

  const passPhraseState = state.passPhraseState;
  const classFormPropsValue: ClassFormProps = {
    passPhrase: state.passPhrase,
    passPhraseState: passPhraseState.first ? passPhraseState.first : passPhraseState.noError,
    setEditContents: setEditContents,
    clickJoinButton: clickJoinButton,
  };

  const DialogPropsValue: DialogProps = {
    title: `${state.class?.name}に参加しますか`,
    agreeText: "参加",
    isOpen: state.passPhraseState.noError,
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
