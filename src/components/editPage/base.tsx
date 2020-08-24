import React from "react";
import { ApiClient, Class, ClassID, File, FileID } from "../../api";
import FileCard from "./fileCard";

interface Props {
  client: ApiClient;
  id: string;
}

interface State {
  // hasData switch to true, when api completed and successed job.
  hasData: boolean;
  hasError: boolean;
  deletingFile?: FileID;
  data: Class | undefined;
}

type classEditAction = fileDeleteAction | onDeleteButtonPushedAction;

interface onDeleteButtonPushedAction {
  actionType: "onDeleteButtonPushed";
  id: string;
}

interface fileDeleteAction {
  actionType: "fileDelete";
  file: File;
}

const reducer = (prevState: State, action: classEditAction): State => {
  switch (action.actionType) {
    case "onDeleteButtonPushed": {
      if (prevState.deletingFile != null) {
        return prevState;
      }
      const newState = Object.assign({}, prevState);
      newState.deletingFile = action.id as FileID;

      prevState.data
        ?.deleteFile(action.id as FileID)
        .then((file) => reducer(newState, { actionType: "fileDelete", file }));

      return newState;
    }
    case "fileDelete": {
      return {
        ...prevState,
        deletingFile: undefined,
      };
    }
    default:
      return prevState;
  }
};

const ClassEditBase = (props: Props): JSX.Element => {
  const [state, setState] = React.useState<State>({
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
        hasData: !hasError,
        hasError: hasError,
        data: foundClass,
      });
    });
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>{state.data?.name}</h1>
      <a href="./newfile">新規ファイル</a>
      {state.data?.files.map((file, index) => (
        <FileCard file={file} key={index} />
      ))}
    </>
  );
};

export default ClassEditBase;
