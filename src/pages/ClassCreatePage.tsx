import React from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Container } from "@material-ui/core";

import { ApiClient } from "../api";
import Header, { HeaderProps } from "../components/common/Header";
import PageContainer from "../components/common/Container";

const headerProps: HeaderProps = {
  role: "生徒",
  href: "/about",
};

interface Props {
  client: ApiClient;
}

interface FormState {
  name: string;
}

const formInputHandler = (
  name: string,
  setState: React.Dispatch<React.SetStateAction<FormState>>,
) => {
  setState({ name });
};

const onFormSubmit = (name: string, client: ApiClient) => {
  client.newClass(name).catch(console.error);
};

const ClassCreateForm = (props: Props): JSX.Element => {
  const [state, setState] = React.useState<FormState>({ name: "" });

  return (
    <form>
      <TextField
        required
        autoFocus
        fullWidth
        margin="normal"
        label="授業名"
        onChange={(e) => formInputHandler(e.target.value, setState)}
        value={state.name}
      />
      <Button
        fullWidth
        size="large"
        color="primary"
        variant="contained"
        component={Link}
        to="/teacher/classlist"
        disabled={state.name.trim() == ""}
        onClick={() => onFormSubmit(state.name, props.client)}
      >
        作成
      </Button>
    </form>
  );
};

const ClassCreatePage = (props: Props): JSX.Element => {
  console.log(props.client);
  return (
    <>
      <Header {...headerProps} />
      <PageContainer>
        <Container maxWidth="xs">
          <h1>授業作成</h1>
          <ClassCreateForm client={props.client} />
        </Container>
      </PageContainer>
    </>
  );
};

export default ClassCreatePage;
