import { ApiClient, SimpleClassInfo, ClassID, Class, ArMarkerID, FileID, File } from "../";
import { Moment } from "moment";
import cloneDeep from "lodash/cloneDeep";

type Exact<Origin, Refer> = Origin extends Refer ? (Refer extends Origin ? Origin : never) : never;

async function toHash(text: string): Promise<string> {
  const encoded = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  const array = Array.from(new Uint8Array(digest));

  return array.map((byte) => byte.toString(16).padStart(2, "0")).join();
}

export class SampleApiClient implements ApiClient {
  private inner: Array<Class>;

  constructor() {
    this.inner = [
      new Class("理科", "this is rika" as ClassID, "5J2cG", [], this),
      new Class("社会", "this is syakai" as ClassID, "T4na9", [], this),
      new Class("英語", "this is eigo" as ClassID, "P3vF2", [], this),
    ];
  }

  async getAllClassInfo(): Promise<Array<SimpleClassInfo>> {
    const data: Array<SimpleClassInfo> = this.inner.map((t) => {
      return {
        name: t.name,
        id: t.id,
        passPhrase: t.passPhrase,
      };
    });

    return data;
  }

  async getClassById(id: ClassID): Promise<Class | undefined> {
    return cloneDeep(this.inner.find((x) => x.id == id));
  }

  async getClassByPassphrase(pass: string): Promise<Class | undefined> {
    return cloneDeep(this.inner.find((x) => x.passPhrase == pass));
  }

  async newClass(name: string): Promise<Class> {
    const hash = await toHash(name);

    const _class = new Class(name, hash as ClassID, hash.substring(0, 6), [], this);

    this.inner.push(_class);

    return _class;
  }

  deleteClass(id: ClassID): Promise<Class> {
    throw new Error("Method not implemented.");
  }

  renameClass(id: ClassID, newName: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async addNewFile(
    classId: ClassID,
    arMarkerId: string,
    fileName: string,
    createdAt: Moment,
  ): Promise<File> {
    const elm = this.inner.find((x) => x.id == classId);

    if (elm == null) {
      throw Error("target class not found");
    }

    const fileId = await toHash(`${arMarkerId}${fileName}${createdAt}`);
    const file: File = {
      id: fileId as FileID,
      markerID: arMarkerId as ArMarkerID,
      resourceInfo: {
        fileName,
        createdAt,
      },
    };

    elm.files.push(file);
    return cloneDeep(file);
  }
}
