import React, { FC, useState, ChangeEvent } from "react";
import { TextField, Button, Container } from "@material-ui/core";
import Header, { HeaderProps } from "../../components/common/Header";
import PageContainer from "../../components/common/Container";

import styles from "../../scss/pages/student/joinClass.scss";

const headerProps: HeaderProps = {
  role: "教師",
  href: "/about",
};

type TextAreaElement = ChangeEvent<HTMLTextAreaElement>;

type ClassFormProps = {
  passPhrase: boolean;
  setEditContents: (element: TextAreaElement) => void;
};

const checkBlankSpace = (value: string) => /\S/g.test(value);

const JoinClassForm: FC<ClassFormProps> = ({ passPhrase, setEditContents }) => (
  <>
    <TextField
      required
      autoFocus
      fullWidth
      margin="normal"
      id="passPhrase"
      label="授業コード"
      onChange={setEditContents}
    />
    <div className={styles.joinFormButton}>
      <Button
        fullWidth
        size="large"
        color="primary"
        variant="contained"
        id="send"
        disabled={passPhrase}
      >
        参加する
      </Button>
    </div>
  </>
);

const JoinClass: FC = () => {
  const [passPhrase, setPassPhrase] = useState("");

  const setEditContents = (element: TextAreaElement) => {
    const value = element.target.value;
    if (!checkBlankSpace(value)) {
      return;
    }
    setPassPhrase(value);
  };

  return (
    <>
      <Header {...headerProps} />
      <PageContainer>
        <Container maxWidth="xs" className={styles.joinForm}>
          <h1>授業に参加する</h1>
          <JoinClassForm passPhrase={passPhrase == ""} setEditContents={setEditContents} />
        </Container>
      </PageContainer>
    </>
  );
};

export default JoinClass;
