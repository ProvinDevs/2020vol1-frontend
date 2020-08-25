import React from "react";
import {
  GridListTile,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import { File } from "../../api";
import { classEditState } from "./base";

interface Props {
  file: File;
  state: classEditState;
  setState: React.Dispatch<React.SetStateAction<classEditState>>;
}

const FileCard = (props: Props): JSX.Element => {
  const setState = () => {
    props.state.data?.deleteFile(props.file.id).then((_) => {
      props.setState({ ...props.state });
    });
  };

  return (
    <GridListTile>
      <Card style={{ margin: "2%" }}>
        <CardContent>
          <Typography variant="h5" component="h3">
            {props.file.resourceInfo.fileName}
          </Typography>
          <Typography variant="body2" component="p">
            作成日時: {props.file.resourceInfo.createdAt.toString()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            endIcon={<Delete />}
            onClick={setState}
            style={{ marginLeft: "auto" }}
          >
            削除
          </Button>
        </CardActions>
      </Card>
    </GridListTile>
  );
};

export default FileCard;
