import React from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button, Container } from "@material-ui/core";

import { ApiClient } from "../api";
import Header, { HeaderProps } from "../components/common/Header";
import PageContainer from "../components/common/Container";

import * as H from "history";

const headerProps: HeaderProps = {
  buttonText: "生徒",
  href: "/about",
};

interface Props {
  client: ApiClient;
}

interface FormProps {
  client: ApiClient;
  history: H.History;
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

const onFormSubmit = async (name: string, client: ApiClient, history: H.History) => {
  await client.newClass(name);
  history.goBack();
};

const ClassCreateForm = (props: FormProps): JSX.Element => {
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
        disabled={state.name.trim() == ""}
        onClick={() => onFormSubmit(state.name, props.client, props.history)}
      >
        作成
      </Button>
    </form>
  );
};

const ClassCreatePage = (props: Props): JSX.Element => {
  console.log(props.client);
  const history = useHistory();
  return (
    <>
      <Header {...headerProps} />
      <PageContainer>
        <Container maxWidth="xs">
          <h1>授業作成</h1>
          <ClassCreateForm client={props.client} history={history} />
        </Container>
      </PageContainer>
    </>
  );
};

export default ClassCreatePage;
