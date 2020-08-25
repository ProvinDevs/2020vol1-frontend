import { File } from "../api";

// TODO: マーカーの画像が決まったらきちんとした実装を書きます。それまではAR.js標準のマーカー画像を返します。
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMarker = (file: File): string | undefined => {
  return THREEx.ArToolkitContext.baseURL + "../data/data/patt.hiro";
};
