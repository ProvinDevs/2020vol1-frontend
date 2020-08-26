import React from "react";
import { ApiClient } from "../api";
import Header, { HeaderProps } from "../components/common/Header";
import PageContainer from "../components/common/Container";
import { TextField, Button } from "@material-ui/core";

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
  client.newClass(name);
};

const ClassCreateForm = (props: Props): JSX.Element => {
  const [state, setState] = React.useState<FormState>({ name: "" });

  return (
    <>
      <form>
        <div>
          <h4>授業名</h4>
          <TextField
            required
            onChange={(e) => formInputHandler(e.target.value, setState)}
            value={state.name}
          />
        </div>
        <Button
          disabled={state.name.trim() == ""}
          onClick={() => onFormSubmit(state.name, props.client)}
          href="/teacher/classlist"
        />
      </form>
    </>
  );
};

const ClassCreatePage = (props: Props): JSX.Element => {
  return (
    <>
      <Header {...headerProps} />
      <h1>授業作成</h1>
      <PageContainer>
        <ClassCreateForm client={props.client} />
      </PageContainer>
    </>
  );
};

export default ClassCreatePage;
