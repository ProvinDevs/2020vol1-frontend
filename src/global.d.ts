/// <reference types="three" />

declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.gif" {
  const src: string;
  export default src;
}

declare var THREE;
declare var THREEx: any;
