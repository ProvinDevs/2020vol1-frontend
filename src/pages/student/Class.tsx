import React, { FC, useState, useEffect } from "react";
import { File } from "../../api";
import { LinearProgress } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { ApiClient } from "../../api";
import GCS from "../../gcs";

import AR from "../../components/AR";
import BackButton from "../../components/common/BackButton";

import styles from "../../scss/pages/student/class.scss";

type Props = {
  apiClient: ApiClient;
  gcs: GCS;
};

const Class: FC<Props> = ({ apiClient, gcs }) => {
  const { passphrase } = useParams<{ passphrase: string }>();
  const [files, setFiles] = useState<Array<File & { sourceUrl: string }>>();
  useEffect(() => {
    if (files != null) return;
    const getFiles = async () => {
      const class_ = await apiClient.getClassByPassphrase(passphrase);
      if (class_ == null) return;

      const promiseArray = class_.files.map(async (file) => {
        const sourceUrl = await gcs.getFileUrl(file);
        return {
          ...file,
          sourceUrl,
        };
      });
      const filesWithResource = await Promise.all(promiseArray);
      setFiles(filesWithResource);
    };
    getFiles().catch(console.error);
  }, [files]);

  if (files != null) {
    return (
      <>
        <div className={styles.back}>
          <BackButton href="/student/join" />
        </div>
        <AR files={files} />
      </>
    );
  }
  // TODO: 読み込み中的なの出したい
  return (
    <div>
      <LinearProgress />
    </div>
  );
};

export default Class;
