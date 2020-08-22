import * as model from "./model";
export * from "./model";

import { Moment } from "moment";

export interface ApiClient {
  getAllClassInfo(): Promise<Array<model.SimpleClassInfo>>;
  getClassById(id: model.ClassID): Promise<model.Class | undefined>;
  getClassByPassphrase(pass: string): Promise<model.Class | undefined>;

  newClass(name: string): Promise<model.Class>;

  /**
   * @deprecated Class.delete を使おう！
   */
  deleteClass(id: model.ClassID): Promise<model.Class>;

  /**
   * @deprecated Class.rename を使おう！
   */
  renameClass(id: model.ClassID, newName: string): Promise<void>;

  /**
   * @deprecated Class.addNewFile を使おう！
   */
  addNewFile(
    classId: model.ClassID,
    arMarkerId: string,
    fileName: string,
    createdAt: Moment,
  ): Promise<model.File>;

  /**
   * @deprecated Class.deleteFile を使おう!
   */
  deleteFile(fileId: model.FileID): Promise<model.File>;
}
