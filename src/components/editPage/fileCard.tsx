import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { File } from "../../api";

interface Props {
  file: File;
}

const FileCard = (props: Props): JSX.Element => {
  return (
    <Card style={{ margin: "1%" }}>
      <CardContent>
        <Typography variant="h5" component="h3">
          {props.file.resourceInfo.fileName}
        </Typography>
        <Typography variant="body2" component="p">
          作成日時: {props.file.resourceInfo.createdAt.toString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FileCard;
