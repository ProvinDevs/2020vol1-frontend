import { ApiClient, SimpleClassInfo, ClassID, Class, ArMarkerID, FileID, File } from "../";
import moment, { Moment } from "moment";
import cloneDeep from "lodash/cloneDeep";
import { ResourceInfo } from "../model";

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
      new Class(
        "理科",
        "thisIsRika" as ClassID,
        "5J2cG",
        [
          new File("1" as FileID, "marker01" as ArMarkerID, new ResourceInfo("file1", moment())),
          new File("2" as FileID, "marker02" as ArMarkerID, new ResourceInfo("file2", moment())),
        ],
        this,
      ),
      new Class(
        "社会",
        "thisIsSyakai" as ClassID,
        "T4na9",
        [
          new File("3" as FileID, "marker01" as ArMarkerID, new ResourceInfo("file3", moment())),
          new File("4" as FileID, "marker02" as ArMarkerID, new ResourceInfo("file4", moment())),
        ],
        this,
      ),
      new Class(
        "英語",
        "thisIsEigo" as ClassID,
        "P3vF2",
        [
          new File("5" as FileID, "marker01" as ArMarkerID, new ResourceInfo("file5", moment())),
          new File("6" as FileID, "marker02" as ArMarkerID, new ResourceInfo("file6", moment())),
        ],
        this,
      ),
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
    // eslint-disable-next-line
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

    // prettier-ignore
    const file = new File(
      fileId as FileID,
      arMarkerId as ArMarkerID,
      {
        fileName,
        createdAt,
      }
    );

    elm.files.push(file);
    return cloneDeep(file);
  }

  async deleteFile(_: ClassID, fileId: FileID): Promise<File> {
    /*
    const elm = this.inner.find((x) => x.files.find((y) => y.id === fileId) != null);

    if (elm == null) {
      throw Error("target file not found");
    }

    // ゆるしてほしい
    // eslint-disable-next-line
    const file = elm.files.find((x) => x.id == fileId)!;
    // eslint-disable-next-line
    (elm as any)._files = elm.files.filter((x) => x.id !== fileId);
    */

    return (undefined as unknown) as File;
  }
}
