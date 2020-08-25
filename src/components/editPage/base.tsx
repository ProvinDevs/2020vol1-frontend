import React from "react";
import { GridList, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { ApiClient, Class, ClassID, FileID } from "../../api";
import FileCard from "./fileCard";

interface Props {
  client: ApiClient;
  id: string;
}

export interface classEditState {
  // hasData switch to true, when api completed and successed job.
  hasData: boolean;
  hasError: boolean;
  deletingFile?: FileID;
  data: Class | undefined;
}

const ClassEditBase = (props: Props): JSX.Element => {
  const [state, setState] = React.useState<classEditState>({
    hasData: false,
    hasError: false,
    deletingFile: undefined,
    data: undefined,
  });
  if (state.hasError) {
    return <h1>Error occured...</h1>;
  }
  if (!state.hasData) {
    props.client.getClassById(props.id as ClassID).then((foundClass) => {
      const hasError = foundClass == null;
      setState({
        ...state,
        hasError: hasError,
        hasData: !hasError,
        data: foundClass,
      });
    });
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>{state.data?.name}</h1>
      <Button href="./newfile" startIcon={<Add />} color="primary">
        新規ファイル
      </Button>
      <GridList spacing={4}>
        {state.data?.files.map((file, index) => (
          <FileCard file={file} key={index} setState={setState} state={state} />
        ))}
      </GridList>
    </>
  );
};

export default ClassEditBase;
