import * as firebase from "firebase/app";
import "firebase/storage";
import token from "./token.json";
import { File as ApiFile } from "../api";

const FILE_REF_NAME = "provindevs-2020-files";

class GCS {
  private fileRef: firebase.storage.Reference;

  constructor(fileRefName: string = FILE_REF_NAME) {
    firebase.initializeApp(token);
    this.fileRef = firebase.storage().ref(fileRefName);
  }

  async addNewFile(apiFile: ApiFile, file: File): Promise<void> {
    await this.fileRef.child(apiFile.id).put(file);
  }

  async deleteFile(apiFile: ApiFile): Promise<void> {
    await this.fileRef.child(apiFile.id).delete();
  }

  async getFileUrl(apiFile: ApiFile): Promise<string> {
    return await this.fileRef.child(apiFile.id).getDownloadURL();
  }
}

export default GCS;
