import React, { Component } from "react";
import { ApiClient, Class, ClassID, File, FileID } from "../../api";
import FileCard from "./fileCard";

interface Props {
  apiClient: ApiClient;
  classId: string;
}

type ClassEditState =
  | {
      status: "FetchingClass" | "FetchingClassFailed";
    }
  | ({ class: Class } & (
      | {
          status: "No-op" | "DeletingFileFailed"; // no operation (読み込み完了してなにもしていない)
        }
      | {
          status: "DeletingFile";
          deletingFile: FileID;
        }
    ));

export default class ClassEditBase extends Component<Props, ClassEditState> {
  constructor(props: Props) {
    super(props);
    this.state = { status: "FetchingClass" };
  }

  componentDidMount(): void {
    const classId = this.props.classId as ClassID;

    this.props.apiClient
      .getClassById(classId)
      .then((foundClass) => {
        this.setState({ status: "No-op", class: foundClass });
      })
      .catch((e: unknown) => {
        console.error(`Fetching Class(${classId}) failed: ${e}`);
        this.setState({ status: "FetchingClassFailed" });
      });
  }

  onDeleteButtonClick(fileId: FileID): void {
    // スマートキャストのために必要
    // Buttonが押せるのはStateが"No-op"のときのみ
    if (this.state.status != "No-op") {
      throw new Error(
        `called onDeleteButtonClick function on unexpected status: ${this.state.status}`,
      );
    }

    this.state.class
      .deleteFile(fileId)
      .then(() => this.setState({ status: "No-op" }))
      .catch((e: unknown) => {
        console.error(`Deleting File(${fileId}) failed: ${e}`);
        this.setState({ status: "DeletingFileFailed" });
      });

    this.setState({ status: "DeletingFile", deletingFile: fileId });
  }

  renderFile(file: File, index: number): JSX.Element {
    const fileCardMode = (() => {
      switch (this.state.status) {
        case "No-op":
          return "Clickable";

        // 削除リクエスト中のところだけ処理中マーク、それ以外は押せないようにする
        case "DeletingFile":
          if (file.id == this.state.deletingFile) {
            return "Processing";
          } else {
            return "Disabled";
          }

        // 削除に失敗した場合、すべての操作を禁止する
        case "DeletingFileFailed":
          return "Disabled";

        default:
          throw new Error(`called renderFile function on unexpected status: ${this.state.status}`);
      }
    })();

    return (
      <FileCard
        mode={fileCardMode}
        file={file}
        key={index}
        onDeleteButtonClick={() => this.onDeleteButtonClick(file.id)}
      />
    );
  }

  render(): JSX.Element {
    switch (this.state.status) {
      case "FetchingClass":
        return <h1>読み込み中です...</h1>;

      case "FetchingClassFailed":
        return <h1>読み込みに失敗しました</h1>;

      // 上記2つ以外の状態のときはページの（まともな）レンダリングが可能
      default: {
        return (
          <>
            <h1>{this.state.class.name}</h1>
            <a href="./newfile">新規ファイル</a>
            {this.state.class.files.map((f, i) => this.renderFile(f, i))}
          </>
        );
      }
    }
  }
}
