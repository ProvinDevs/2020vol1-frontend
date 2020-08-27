export type FileNameProps = {
  maxLength: number;
  name: string;
};

export const FileName = (props: FileNameProps): string => {
  let name = props.name;
  if (name.length > props.maxLength + 6) {
    name = name.substr(0, props.maxLength - 1) + "..." + name.substr(-6);
  }
  return name;
};
