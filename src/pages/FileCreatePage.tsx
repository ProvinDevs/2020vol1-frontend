import React, { ChangeEvent, FC, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Typography, Container, CircularProgress } from "@material-ui/core";

import Header, { HeaderProps } from "../components/common/Header";
import PageContainer from "../components/common/Container";
import { ApiClient, ClassID } from "../api";
import GCS from "../gcs";
import { FileName, FileNameProps } from "../components/common/FileName";
import { getUnusedMarkers } from "../markers";
import moment from "moment";

import styles from "../scss/pages/fileCreatePage.scss";
import BackButton from "../components/common/BackButton";

const headerProps: HeaderProps = {
  buttonText: "生徒",
  href: "/about",
};

type UploadState = "working" | "no-op";

interface State {
  file?: File;
  name: string;
}

interface BaseProps {
  client: ApiClient;
  gcs: GCS;
  id: string;
  createdHandler: () => void;
}

interface PageProps {
  client: ApiClient;
  gcs: GCS;
}

const FileCreateBase: FC<BaseProps> = ({ id, client, gcs, createdHandler }) => {
  const [state, setState] = useState<State>({ file: undefined, name: "選択されていません" });
  const [uploadingState, setUploadingState] = useState<UploadState>("no-op");

  const setFileState = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files == null) return;
    const file = event.target.files[0];
    let name = "選択されていません";
    if (file !== undefined) {
      const props: FileNameProps = { maxLength: 8, name: file.name };
      name = FileName(props);
    }
    setState({ file: file, name: name });
  };

  const onFormSubmit = () => {
    setUploadingState("working");
    (async () => {
      if (state.file == null) return;
      const currentClass = await client.getClassById(id as ClassID);
      if (currentClass == null) return;
      const marker = getUnusedMarkers(currentClass)[0];
      const apiFile = await currentClass.addNewFile(marker.id, state.file.name, moment());
      await gcs.addNewFile(apiFile, state.file);
      setUploadingState("no-op");
      createdHandler();
    })();
  };

  const disabled = (): boolean => {
    return uploadingState === "working";
  };

  return (
    <>
      <form>
        <div className={styles.inputContainer}>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            id="contained-button-file"
            className={styles.input}
            onChange={setFileState}
          />
          <label htmlFor="contained-button-file" className={styles.inputLabel}>
            <Button disabled={disabled()} variant="outlined" color="primary" component="span">
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
        <div className={styles.uploadWrapper}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={state.file == null || disabled()}
            onClick={onFormSubmit}
          >
            作成
          </Button>
          {disabled() && (
            <div className={styles.upload}>
              <CircularProgress size={24} />
            </div>
          )}
        </div>
      </form>
    </>
  );
};

const FileCreatePage: FC<PageProps> = ({ client, gcs }) => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const onCreatedEvent = () => {
    history.push(`/teacher/class/${id}`);
  };
  return (
    <>
      <Header {...headerProps} />
      <PageContainer>
        <BackButton history={history} />
        <Container maxWidth="xs">
          <h1 className={styles.title}>新規ファイル</h1>
          <FileCreateBase client={client} gcs={gcs} id={id} createdHandler={onCreatedEvent} />
        </Container>
      </PageContainer>
    </>
  );
};

export default FileCreatePage;
