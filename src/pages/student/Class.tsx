import React, { FC, useState, useEffect } from "react";
import { File } from "../../api";
import { useParams } from "react-router-dom";
import { ApiClient } from "../../api";

import AR from "../../components/AR";

type Props = {
  apiClient: ApiClient;
};

const Class: FC<Props> = ({ apiClient }) => {
  const { passphrase } = useParams<{ passphrase: string }>();
  const [files, setFiles] = useState<Array<File>>();
  useEffect(() => {
    if (files != null) return;
    apiClient.getClassByPassphrase(passphrase).then((class_) => {
      if (class_ == null) return;
      setFiles(class_.files);
    });
  }, [files]);

  if (files != null) {
    return <AR files={files} />;
  }
  // TODO: 読み込み中的なの出したい
  return <div />;
};

export default Class;