declare type FileType = 'directory' | 'image' | 'file' | 'unknown';

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
  FileType,
  File,
  Directory
}