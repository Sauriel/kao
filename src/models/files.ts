declare type File = {
  name: string;
  path: string;
}

declare type Folder = File & {
  cover?: File
};

export type {
  File,
  Folder
}