import React from "react";
import { ApiClient, Class, ClassID } from "../../api";

interface Props {
  client: ApiClient;
  id: string;
}

interface State {
  // hasData switch to true, when api completed and successed job.
  hasData: boolean;
  hasError: boolean;
  data: Class | undefined;
}

const ClassEditBase = (props: Props): JSX.Element => {
  const [state, setState] = React.useState<State>({
    hasData: false,
    hasError: false,
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

  return <h1>{state.data?.name}</h1>;
};

export default ClassEditBase;
