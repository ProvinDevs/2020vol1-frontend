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

declare module "*.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare let THREE;
declare let THREEx: any;
