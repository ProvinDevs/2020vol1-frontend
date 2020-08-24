import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import { File } from "../../api";
import { classEditState } from "./base";

interface Props {
  file: File;
  state: classEditState;
  setState: React.Dispatch<React.SetStateAction<classEditState>>;
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
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              props.state.data?.deleteFile(props.file.id).then((_) => {
                props.setState({ ...props.state });
              });
            }}
          >
            削除
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default FileCard;
