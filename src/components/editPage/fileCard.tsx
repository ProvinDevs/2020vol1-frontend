import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { File } from "../../api";

interface Props {
  file: File;
}

const FileCard = (props: Props): JSX.Element => {
  return (
    <Card>
      <CardContent>
        <h3>{props.file.resourceInfo.fileName}</h3>
        <p>作成日時: {props.file.resourceInfo.createdAt}</p>
      </CardContent>
    </Card>
  );
};

export default FileCard;
