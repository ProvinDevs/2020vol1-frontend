import React, { ChangeEvent } from "react";
import { useParams, useHistory } from "react-router-dom";
import Header, { HeaderProps } from "../components/common/Header";
import PageContainer from "../components/common/Container";
import { ApiClient, ClassID } from "../api";
import { Button } from "@material-ui/core";
import moment from "moment";

const headerProps: HeaderProps = {
  role: "生徒",
  href: "/about",
};

interface State {
  file?: File;
}

interface BaseProps {
  client: ApiClient;
  id: string;
  createdHandler: () => void;
}

interface PageProps {
  client: ApiClient;
}

const markers = [
  "marker01",
  "marker02",
  "marker03",
  "marker04",
  "marker05",
  "marker06",
  "marker07",
  "marker08",
  "marker09",
  "marker10",
];

const fileSelecteHandler = (event: ChangeEvent): File | undefined => {
  const target = event.target as HTMLInputElement;
  if (target.files == null) return undefined;

  return target.files[0];
};

const onFormSubmit = (
  classID: string,
  file: File | undefined,
  client: ApiClient,
  createdHandler: () => void,
) => {
  if (file == null) return;
  client.getClassById(classID as ClassID).then((currentClass) => {
    const markerTmp = markers.concat();
    currentClass?.files.forEach((file) => {
      markerTmp.splice(
        markerTmp.findIndex((element) => element === file.markerID),
        1,
      );
    });
    const markerID = markerTmp[0];
    client.addNewFile(classID as ClassID, markerID, file.name, moment()).then(() => {
      client.getClassById(classID as ClassID).then((classes) => {
        console.log(classes);
      });
      createdHandler();
    });
  });
};

const FileCreateBase = (props: BaseProps): JSX.Element => {
  const [state, setState] = React.useState<State>({ file: undefined });
  return (
    <>
      <form>
        <div>
          <h4>ファイルを選択</h4>
          <input
            type="file"
            accept=".png,.jpg,jpeg"
            onChange={(event) => setState({ file: fileSelecteHandler(event) })}
          />
        </div>
        <Button
          disabled={state.file == null}
          onClick={() => onFormSubmit(props.id, state.file, props.client, props.createdHandler)}
        >
          作成
        </Button>
      </form>
    </>
  );
};

const FileCreatePage = (props: PageProps): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const onCreatedEvent = () => {
    history.push(`/teacher/class/${id}`);
  };
  return (
    <>
      <Header {...headerProps} />
      <PageContainer>
        <h1>新規ファイル</h1>
        <FileCreateBase client={props.client} id={id} createdHandler={onCreatedEvent} />
      </PageContainer>
    </>
  );
};

export default FileCreatePage;
