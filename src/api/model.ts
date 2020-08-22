import { Moment } from "moment";
import { ApiClient } from ".";

declare const __ClassID: unique symbol;
export type ClassID = string & { [__ClassID]: never };

declare const __FileID: unique symbol;
export type FileID = string & { [__FileID]: never };

declare const __ArMarkerID: unique symbol;
export type ArMarkerID = string & { [__ArMarkerID]: never };

export type ResourceInfo = {
  readonly fileName: string;
  readonly createdAt: Moment;
};

export type File = {
  readonly id: FileID;
  readonly markerID: ArMarkerID;
  readonly resourceInfo: ResourceInfo;
};

export class Class {
  // 本当はpackage privateにしてApiClientにしかnewできないようにしたかったけど
  // できなかった。本来ApiClientによって構築されるべきクラスなので使わないように。
  constructor(
    private _name: string,
    public readonly id: ClassID,
    public readonly passPhrase: string,
    public readonly files: Array<File>,
    private api: ApiClient,
  ) {}

  public get name(): string {
    return this._name;
  }

  public async rename(name: string): Promise<void> {
    await this.api.renameClass(this.id, name);
    this._name = name;
  }

  public async addNewFile(arMarkerId: string, fileName: string, createdAt: Moment): Promise<void> {
    const file = await this.api.addNewFile(this.id, arMarkerId, fileName, createdAt);
    this.files.push(file);
  }
}

export type SimpleClassInfo = {
  readonly name: string;
  readonly id: ClassID;
  readonly passPhrase: string;
};
