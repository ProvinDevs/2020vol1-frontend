import { SimpleClassInfo, Class, ClassID, File, FileID } from "./model";
export * from "./model";

import { Moment } from "moment";

export interface ApiClient {
  getAllClassInfo(): Promise<Array<SimpleClassInfo>>;
  getClassById(id: ClassID): Promise<Class | undefined>;
  getClassByPassphrase(pass: string): Promise<Class | undefined>;

  newClass(name: string): Promise<Class>;

  /**
   * @deprecated Class.delete を使おう！
   */
  deleteClass(id: ClassID): Promise<Class>;

  /**
   * @deprecated Class.rename を使おう！
   */
  renameClass(id: ClassID, newName: string): Promise<void>;

  /**
   * @deprecated Class.addNewFile を使おう！
   */
  addNewFile(
    classId: ClassID,
    arMarkerId: string,
    fileName: string,
    createdAt: Moment,
  ): Promise<File>;

  /**
   * @deprecated Class.deleteFile を使おう!
   */
  deleteFile(fileId: FileID): Promise<File>;
}
