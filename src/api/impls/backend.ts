import { ApiClient, SimpleClassInfo, ClassID, Class, ArMarkerID, FileID, File } from "..";
import moment, { Moment } from "moment";
import axios from "axios";
import urljoin from "url-join";
import joi from "joi";
import { create } from "lodash";

const simpleClassInfoSchema = joi.array().items(
  joi.object({
    name: joi.string(),
    id: joi.string(),
    passPhrase: joi.string(),
  }),
);

const classSchema = joi.object({
  name: joi.string(),
  id: joi.string(),
  passPhrase: joi.string(),
  files: joi.array(),
});

const fileSchema = joi.object({
  id: joi.string(),
  markerID: joi.string(),
  resourceInfo: joi.object({
    fileName: joi.string(),
    createdAt: joi.number(),
  }),
});

export default class BackendApiClient implements ApiClient {
  constructor(private apiUrl: string) {}

  async getAllClassInfo(): Promise<Array<SimpleClassInfo>> {
    const url = urljoin(this.apiUrl, "classes");
    const response = await axios.get(url);

    if (response.status != 200) {
      throw new Error(`status code was not ok: ${response.status}`);
    }

    joi.assert(response.data, simpleClassInfoSchema);

    return response.data;
  }

  async getClassById(id: ClassID): Promise<Class | undefined> {
    const url = urljoin(this.apiUrl, "classes", id);
    const response = await axios.get(url);

    if (response.status != 200) {
      throw new Error(`status code was not ok: ${response.status}`);
    }

    joi.assert(response.data, classSchema);

    return response.data;
  }

  async getClassByPassphrase(pass: string): Promise<Class | undefined> {
    const url = urljoin(this.apiUrl, "classes/by-pass/", pass);
    const response = await axios.get(url);

    if (response.status != 200) {
      throw new Error(`status code was not ok: ${response.status}`);
    }

    joi.assert(response.data, classSchema);

    return response.data;
  }

  async newClass(name: string): Promise<Class> {
    const url = urljoin(this.apiUrl, "classes");
    const response = await axios.post(url, { name: name });

    if (response.status != 200) {
      throw new Error(`status code was not ok: ${response.status}`);
    }

    joi.assert(response, classSchema);

    return new Class(
      response.data.name,
      response.data.id as ClassID,
      response.data.passPhrase,
      response.data.files,
      this,
    );
  }

  async deleteClass(id: ClassID): Promise<Class> {
    const url = urljoin(this.apiUrl, "classes", id);
    const response = await axios.delete(url);

    if (response.status != 200) {
      throw new Error(`status code was not ok: ${response.status}`);
    }

    joi.assert(response.data, classSchema);

    return response.data;
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
    const data = {
      markerID: arMarkerId,
      resourceInfo: { fileName: fileName, createdAt: createdAt.unix() },
    };
    const response = await axios.post(url, data);

    if (response.status != 200) {
      throw new Error(`status code was not ok: ${response.status}`);
    }

    joi.assert(response.data, fileSchema);

    return response.data;
  }

  async deleteFile(classId: ClassID, fileId: FileID): Promise<File> {
    const url = urljoin(this.apiUrl, "classes", classId, "files", fileId);
    const response = await axios.delete(url);

    if (response.status != 200) {
      throw new Error(`status code was not ok: ${response.status}`);
    }

    joi.assert(response.data, fileSchema);

    return response.data;
  }
}
