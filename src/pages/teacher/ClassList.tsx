import React, { Component, ReactNode } from "react";
import { ApiClient, SimpleClassInfo } from "../../api";

export type ClassListProps = {
  api: ApiClient;
};

import PageContainer from "../../components/common/Container";

type State =
  | {
      apiState: "Loading" | "Error";
    }
  | {
      apiState: "Loaded";
      data: Array<SimpleClassInfo>;
    };

export default class ClassList extends Component<ClassListProps, State> {
  constructor(props: ClassListProps) {
    super(props);

    this.state = {
      apiState: "Loading",
    };
  }

  componentDidMount(): void {
    this.props.api
      .getAllClassInfo()
      .then((info) => this.setState({ apiState: "Loaded", data: info }))
      .catch((error: unknown) => {
        console.error(`Api(getAllClassInfo) request failed: ${error}`);
        this.setState({ apiState: "Error" });
      });
  }

  render(): ReactNode {
    const body = (() => {
      switch (this.state.apiState) {
        case "Loading":
          return <>読み込み中です...</>;

        case "Error":
          return <>読み込みに失敗しました</>;

        case "Loaded":
          return (
            <>
              {this.state.data.map((info, index) => (
                <ClassCard info={info} key={index} />
              ))}
            </>
          );
      }
    })();

    return (
      <>
        <PageContainer>{body}</PageContainer>
      </>
    );
  }
}

type ClassCardProp = {
  info: SimpleClassInfo;
};

function ClassCard(prop: ClassCardProp): JSX.Element {
  return (
    <>
      <table>
        <tr>
          <td>name: {prop.info.name}</td>
        </tr>
        <tr>
          <td>id: {prop.info.id}</td>
        </tr>
        <tr>
          <td>pass: {prop.info.passPhrase}</td>
        </tr>
      </table>
    </>
  );
}
