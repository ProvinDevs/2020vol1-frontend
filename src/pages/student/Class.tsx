import React, { FC, useState, useEffect } from "react";
import { File } from "../../api";
import { useParams } from "react-router-dom";
import { ApiClient } from "../../api";
import GCS from "../../gcs";

import AR from "../../components/AR";

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
        if (sourceUrl == null) return;
        return {
          ...file,
          sourceUrl,
        };
      });
      const filesWithResource = (await Promise.all(promiseArray)).flatMap((file) =>
        file != null ? [file] : [],
      );
      setFiles(filesWithResource);
    };
    getFiles().catch(console.error);
  }, [files]);

  if (files != null) {
    return <AR files={files} />;
  }
  // TODO: 読み込み中的なの出したい
  return <div />;
};

export default Class;
