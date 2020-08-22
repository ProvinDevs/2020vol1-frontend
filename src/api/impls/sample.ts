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

  async deleteClass(id: ClassID): Promise<Class> {
    const _class = this.inner.find((x) => x.id === id);

    if (_class == null) {
      throw Error("target class not found");
    }

    this.inner = this.inner.filter((x) => x.id !== id);
    return _class;
  }

  async renameClass(id: ClassID, newName: string): Promise<void> {
    const _class = this.inner.find((x) => x.id == id);

    if (_class == null) {
      throw Error("target class not found");
    }

    // ゆるして
    (_class as any)._name = newName;
  }

  async addNewFile(
    classId: ClassID,
    arMarkerId: string,
    fileName: string,
    createdAt: Moment,
  ): Promise<File> {
    const elm = this.inner.find((x) => x.id === classId);

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

  async deleteFile(fileId: FileID): Promise<File> {
    const elm = this.inner.find((x) => x.files.find((y) => y.id === fileId) != null);

    if (elm == null) {
      throw Error("target file not found");
    }

    // ゆるしてほしい
    // eslint-disable-next-line
    const file = elm.files.find((x) => x.id == fileId)!;
    // eslint-disable-next-line
    (elm as any)._files = elm.files.filter((x) => x.id !== fileId);

    return file;
  }
}
