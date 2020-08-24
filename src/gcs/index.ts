import { Storage, Bucket } from "@google-cloud/storage";
import token from "./token.json";

// ***†卍 ハードコーディング 卍†***
const BUCKET_NAME = "provindevs-2020-files";

class GCS {
  private bucket: Bucket;

  constructor(bucketName: string = BUCKET_NAME) {
    this.bucket = new Storage({ credentials: token }).bucket(bucketName);
  }
}

export default GCS;
