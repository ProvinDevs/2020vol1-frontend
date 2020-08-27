import React, { ChangeEvent, FC, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Typography, Container } from "@material-ui/core";

import Header, { HeaderProps } from "../components/common/Header";
import PageContainer from "../components/common/Container";
import { ApiClient, ClassID } from "../api";
import { FileName, FileNameProps } from "../components/common/FileName";
import moment from "moment";

import styles from "../scss/pages/fileCreatePage.scss";

const headerProps: HeaderProps = {
  buttonText: "生徒",
  href: "/about",
};

interface State {
  file?: File;
  name: string;
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

const onFormSubmit = async (
  classID: string,
  file: File | undefined,
  client: ApiClient,
  createdHandler: () => void,
) => {
  if (file == null) return;
  const currentClass = await client.getClassById(classID as ClassID);
  const markerTmp = markers.concat();
  currentClass?.files.forEach((file) => {
    markerTmp.splice(
      markerTmp.findIndex((element) => element === file.markerID),
      1,
    );
  });
  const markerID = markerTmp[0];
  await currentClass?.addNewFile(markerID, file.name, moment());
  createdHandler();
};

const FileCreateBase: FC<BaseProps> = (props) => {
  const [state, setState] = useState<State>({ file: undefined, name: "選択されていません" });

  const setFileState = (event: ChangeEvent) => {
    const file = fileSelecteHandler(event);
    let name = "選択されていません";
    if (file !== undefined) {
      const props: FileNameProps = { maxLength: 8, name: file.name };
      name = FileName(props);
    }
    setState({ file: file, name: name });
  };

  return (
    <>
      <form>
        <div className={styles.inputContainer}>
          <input
            type="file"
            accept=".png,.jpg,jpeg"
            id="contained-button-file"
            className={styles.input}
            onChange={setFileState}
          />
          <label htmlFor="contained-button-file" className={styles.inputLabel}>
            <Button variant="outlined" color="primary" component="span">
              ファイルを選択
            </Button>
            <Typography variant="body2" color="textSecondary" component="p">
              {state.name}
            </Typography>
          </label>
          <Typography color="textSecondary" variant="body2" component="p">
            ※ PNG・JPG・JPEG形式
          </Typography>
        </div>
        <Button
          fullWidth
          variant="contained"
          color="primary"
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
        <Container maxWidth="xs">
          <h1 className={styles.title}>新規ファイル</h1>
          <FileCreateBase client={props.client} id={id} createdHandler={onCreatedEvent} />
        </Container>
      </PageContainer>
    </>
  );
};

export default FileCreatePage;
