import * as firebase from "firebase/app";
import "firebase/storage";
import token from "./token.json";

const FILE_REF_NAME = "provindevs-2020-files";

class GCS {
  private fileRef: firebase.storage.Reference;

  constructor(fileRefName: string = FILE_REF_NAME) {
    firebase.initializeApp(token);
    this.fileRef = firebase.storage().ref(fileRefName);
  }
}

export default GCS;
