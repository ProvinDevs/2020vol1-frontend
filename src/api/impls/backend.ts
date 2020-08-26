import { ApiClient, SimpleClassInfo, ClassID, Class, ArMarkerID, FileID, File } from "..";
import moment, { Moment } from "moment";
import axios, { AxiosResponse, AxiosError } from "axios";
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

async function parseAxiosResponse<T>(
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
    throw new Error("unexpected undefined");
  } else {
    return value;
  }
}

function resToResourceInfo(res: ResourceInfoRes): ResourceInfo {
  const time = moment.unix(res.createdAt).utc();
  return new ResourceInfo(res.fileName, time);
}

function resToFile(res: FileRes): File {
  return new File(res.id, res.markerID, resToResourceInfo(res.resourceInfo));
}

export default class BackendApiClient implements ApiClient {
  constructor(private apiUrl: string) {}

  resToClass(res: ClassRes): Class {
    const files = res.files.map(resToFile);
    return new Class(res.name, res.id, res.passPhrase, files, this);
  }

  async getAllClassInfo(): Promise<Array<SimpleClassInfo>> {
    const url = urljoin(this.apiUrl, "classes");
    const response = await parseAxiosResponse(() => axios.get(url), simpleClassInfoSchema);

    return response as Array<SimpleClassInfo>;
  }

  async getClassById(id: ClassID): Promise<Class | undefined> {
    const url = urljoin(this.apiUrl, "classes", id);

    return parseAxiosResponse(() => axios.get(url), classSchema);
  }

  async getClassByPassphrase(pass: string): Promise<Class | undefined> {
    const url = urljoin(this.apiUrl, "classes/by-pass/", pass);

    return parseAxiosResponse(() => axios.get(url), classSchema);
  }

  async newClass(name: string): Promise<Class> {
    const url = urljoin(this.apiUrl, "classes");
    const axiosCall = () => axios.post(url, { name });
    const response: ClassRes | undefined = await parseAxiosResponse(axiosCall, classSchema);

    // newClassはundefinedを返さない(404を返さない)
    const data: ClassRes = shouldNotUndefined(response);

    return this.resToClass(data);
  }

  async deleteClass(id: ClassID): Promise<Class> {
    const url = urljoin(this.apiUrl, "classes", id);
    const axiosCall = () => axios.delete(url);
    const response: ClassRes | undefined = await parseAxiosResponse(axiosCall, classSchema);

    if (response === undefined) {
      throw new Error("target class not found");
    }

    return this.resToClass(response);
  }

  async renameClass(id: ClassID, newName: string): Promise<void> {
    const url = urljoin(this.apiUrl, "classes", id);
    const response = await axios.put(url, { name: newName });

    if (response.status != 204) {
      throw new Error(`status code was not ok: ${response.status}`);
    }
  }

  async addNewFile(
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
    const response: FileRes | undefined = await parseAxiosResponse(axiosCall, fileSchema);

    // addNewFileは404を返さない
    const data: FileRes = shouldNotUndefined(response);

    return resToFile(data);
  }

  async deleteFile(classId: ClassID, fileId: FileID): Promise<File> {
    const url = urljoin(this.apiUrl, "classes", classId, "files", fileId);
    const axiosCall = () => axios.delete(url);
    const response: FileRes | undefined = await parseAxiosResponse(axiosCall, fileSchema);

    if (response === undefined) {
      throw new Error("target file not found");
    }

    return resToFile(response);
  }
}
