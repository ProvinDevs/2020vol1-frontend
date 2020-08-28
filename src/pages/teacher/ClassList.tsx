import React, { FC, Component, ReactNode } from "react";
import { Link, useHistory, RouteComponentProps } from "react-router-dom";
import { TableBody, TableCell, TableRow, Paper, Typography } from "@material-ui/core";

import { ApiClient, SimpleClassInfo } from "../../api";
import Header, { HeaderProps } from "../../components/common/Header";
import { TableWrapper, TableHead } from "../../components/common/Table";
import PageContainer from "../../components/common/Container";
import BackButton from "../../components/common/BackButton";
import * as H from "history";

export type ClassListProps = {
  api: ApiClient;
};

type State =
  | {
      apiState: "Loading" | "Error";
    }
  | {
      apiState: "Loaded";
      data: Array<SimpleClassInfo>;
    };

const headerProps: HeaderProps = {
  buttonText: "生徒の方",
  href: "/about",
};

const columns = ["Name", "ID", "Pass"];

export default class ClassList extends Component<ClassListProps & RouteComponentProps, State> {
  constructor(props: ClassListProps & RouteComponentProps) {
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
            <TableBody>
              {this.state.data.map((info, index) => (
                <ClassCard info={info} key={index} />
              ))}
            </TableBody>
          );
      }
    })();

    return (
      <>
        <Header {...headerProps} />
        <PageContainer>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            授業一覧
          </Typography>
          <BackButton history={this.props.history} />
          <Paper>
            <TableWrapper>
              <TableHead columns={columns} />
              {body}
            </TableWrapper>
          </Paper>
        </PageContainer>
      </>
    );
  }
}

type ClassCardProp = {
  info: SimpleClassInfo;
};

const ClassCard: FC<ClassCardProp> = (prop) => (
  <TableRow hover component={Link} to={`/teacher/class/${prop.info.id}`}>
    <TableCell>{prop.info.name}</TableCell>
    <TableCell>{prop.info.id}</TableCell>
    <TableCell>{prop.info.passPhrase}</TableCell>
  </TableRow>
);
