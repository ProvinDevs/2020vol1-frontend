import { Storage, Bucket } from "@google-cloud/storage";
import { File } from "../api";
import token from "./token.json";

// ***†卍 ハードコーディング 卍†***
const BUCKET_NAME = "provindevs-2020-files";

class GCS {
  private bucket: Bucket;

  constructor(bucketName: string = BUCKET_NAME) {
    this.bucket = new Storage({ credentials: token }).bucket(bucketName);
  }

  public async addNewFile(file: File, fileSrc: string): Promise<void> {
    await this.bucket.upload(fileSrc, {
      destination: file.id,
      gzip: true,
    });
  }

  public async deleteFile(file: File): Promise<File> {
    await this.bucket.file(file.id).delete();
    return file;
  }
}

export default GCS;
