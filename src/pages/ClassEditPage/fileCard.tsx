import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { File } from "../../api";

interface Props {
  mode: "Processing" | "Disabled" | "Clickable";
  file: File;
  onDeleteButtonClick: () => void;
}

const FileCard = (props: Props): JSX.Element => {
  const date = props.file.resourceInfo.createdAt.format("YYYY年MM月DD日 HH:mm:ss");

  const buttonElm = (() => {
    switch (props.mode) {
      case "Processing":
        return <CircularProgress />;

      default: {
        const disabled = props.mode === "Disabled";

        return (
          <CardActions>
            <Button
              variant="outlined"
              size="small"
              disabled={disabled}
              onClick={() => props.onDeleteButtonClick()}
            >
              削除
            </Button>
          </CardActions>
        );
      }
    }
  })();

  return (
    <Card style={{ margin: "1%" }}>
      <CardContent>
        <Typography variant="h5" component="h3">
          {props.file.resourceInfo.fileName}
        </Typography>
        <Typography variant="body2" component="p">
          作成日時: {date}
        </Typography>
        {buttonElm}
      </CardContent>
    </Card>
  );
};

export default FileCard;
