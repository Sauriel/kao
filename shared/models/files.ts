declare type FileType = 'directory' | 'image' | 'unknown';

declare type File = {
  type: FileType;
  name: string;
  path: string;
}

declare type Directory = File & {
  cover?: File
};

declare type DirOrFile = Directory | File;

export default DirOrFile;

export type {
  File,
  Directory
}