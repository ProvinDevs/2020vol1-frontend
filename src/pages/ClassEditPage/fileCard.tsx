import React, { FC } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
  GridListTile,
  CardMedia,
} from "@material-ui/core";
import { File } from "../../api";
import { Delete } from "@material-ui/icons";

import { FileName, FileNameProps } from "../../components/common/FileName";
import styles from "../../scss/pages/classEditPage/classList.scss";
import { getMarkerImageUrl } from "../../markers";

interface Props {
  mode: "Processing" | "Disabled" | "Clickable";
  file: File;
  onDeleteButtonClick: () => void;
}

const FileCard: FC<Props> = (props: Props) => {
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
              color="primary"
              endIcon={<Delete />}
              style={{ marginLeft: "auto" }}
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

  const fileName = props.file.resourceInfo.fileName;
  const fileNameP: FileNameProps = { maxLength: 6, name: fileName };
  const Title = FileName(fileNameP);
  const markerID = props.file.markerID;
  const markerSrc = getMarkerImageUrl(props.file);

  return (
    <GridListTile className={styles.tile}>
      <Card style={{ margin: "2%" }}>
        <CardContent>
          <Typography variant="h5" component="h3">
            {Title}
          </Typography>
          <Typography variant="body2" component="p">
            作成日時: {date}
          </Typography>
          <Typography variant="body2" component="p">
            マーカーID: {markerID}
          </Typography>
        </CardContent>
        <CardMedia image={markerSrc} title={markerID} className={styles.cardMedia} />
        {buttonElm}
      </Card>
    </GridListTile>
  );
};

export default FileCard;
