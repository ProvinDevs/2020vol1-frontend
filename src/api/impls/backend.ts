import { ApiClient, SimpleClassInfo, ClassID, Class, ArMarkerID, FileID, File } from "..";
import moment, { Moment } from "moment";
import axios, { AxiosResponse } from "axios";
import urljoin from "url-join";
import joi from "joi";
import { ResourceInfo } from "../model";

const simpleClassInfoSchema = joi.array().items(
  joi.object({
    name: joi.string(),
    id: joi.string(),
    passPhrase: joi.string(),
  }),
);

const fileSchema = joi.object({
  id: joi.string(),
  markerID: joi.string(),
  resourceInfo: joi.object({
    fileName: joi.string(),
    createdAt: joi.number(),
  }),
});

const classSchema = joi.object({
  name: joi.string(),
  id: joi.string(),
  passPhrase: joi.string(),
  files: joi.array().items(fileSchema),
});

type ResourceInfoRes = {
  fileName: string;
  createdAt: number;
};

type FileRes = {
  id: FileID;
  markerID: ArMarkerID;
  resourceInfo: ResourceInfoRes;
};

type ClassRes = {
  name: string;
  id: ClassID;
  passPhrase: string;
  files: Array<FileRes>;
};

async function parseAxiosResponse<T = unknown>(
  call: () => Promise<AxiosResponse>,
  schema: joi.Schema,
): Promise<T | undefined> {
  let response;

  try {
    response = await call();
  } catch (e) {
    console.error(`api request failed: ${e}`);
    return undefined;
  }

  joi.assert(response.data, schema);
  return response.data;
}

function shouldNotUndefined<T>(value: T | undefined): T {
  if (value == null) {
    throw new Error("unexpected undefined, might backend error");
  }

  return value;
}

function resToResourceInfo(res: ResourceInfoRes): ResourceInfo {
  const time = moment.utc().unix(res.createdAt);
  return new ResourceInfo(res.fileName, time);
}

function resToFile(res: FileRes): File {
  return new File(res.id, res.markerID, resToResourceInfo(res.resourceInfo));
}

export default class BackendApiClient implements ApiClient {
  constructor(private apiUrl: string) {}

  private resToClass(res: ClassRes): Class {
    const files = res.files.map(resToFile);
    return new Class(res.name, res.id, res.passPhrase, files, this);
  }

  public async getAllClassInfo(): Promise<Array<SimpleClassInfo>> {
    const url = urljoin(this.apiUrl, "classes");
    const response = await parseAxiosResponse<Array<SimpleClassInfo>>(
      () => axios.get(url),
      simpleClassInfoSchema,
    );

    return shouldNotUndefined(response);
  }

  public async getClassById(id: ClassID): Promise<Class | undefined> {
    const url = urljoin(this.apiUrl, "classes", id);
    const response = await parseAxiosResponse<ClassRes>(() => axios.get(url), classSchema);

    if (response == null) {
      return undefined;
    }

    return this.resToClass(response);
  }

  public async getClassByPassphrase(pass: string): Promise<Class | undefined> {
    const url = urljoin(this.apiUrl, "classes/by-pass/", pass);
    const response = await parseAxiosResponse<ClassRes>(() => axios.get(url), classSchema);

    if (response == null) {
      return undefined;
    }

    return this.resToClass(response);
  }

  public async newClass(name: string): Promise<Class> {
    const url = urljoin(this.apiUrl, "classes");
    const axiosCall = () => axios.post(url, { name });
    const response = await parseAxiosResponse<ClassRes>(axiosCall, classSchema);

    const data: ClassRes = shouldNotUndefined(response);

    return this.resToClass(data);
  }

  public async deleteClass(id: ClassID): Promise<Class> {
    const url = urljoin(this.apiUrl, "classes", id);
    const axiosCall = () => axios.delete(url);
    const response = await parseAxiosResponse<ClassRes>(axiosCall, classSchema);

    const data = shouldNotUndefined(response);

    return this.resToClass(data);
  }

  public async renameClass(id: ClassID, newName: string): Promise<void> {
    const url = urljoin(this.apiUrl, "classes", id);
    const response = await axios.put(url, { name: newName });

    if (response.status != 204) {
      throw new Error(`status code was not ok: ${response.status}`);
    }
  }

  public async addNewFile(
    classId: ClassID,
    arMarkerId: string,
    fileName: string,
    createdAt: Moment,
  ): Promise<File> {
    const url = urljoin(this.apiUrl, "classes", classId, "files");
    const body = {
      markerID: arMarkerId,
      resourceInfo: { fileName: fileName, createdAt: createdAt.utc().unix() },
    };

    const axiosCall = () => axios.post(url, body);
    const response = await parseAxiosResponse<FileRes>(axiosCall, fileSchema);

    const data = shouldNotUndefined(response);

    return resToFile(data);
  }

  public async deleteFile(classId: ClassID, fileId: FileID): Promise<File> {
    const url = urljoin(this.apiUrl, "classes", classId, "files", fileId);
    const axiosCall = () => axios.delete(url);
    const response = await parseAxiosResponse<FileRes>(axiosCall, fileSchema);

    if (response === undefined) {
      throw new Error("target file not found");
    }

    return resToFile(response);
  }
}
