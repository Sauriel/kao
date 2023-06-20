import * as pathUtil from 'path';
import DB, { LibraryDBEntry } from "./database";
import DirOrFile, { Directory } from "../../shared/models/files";

function convertDbEntry(entry: LibraryDBEntry): DirOrFile {
  const dirOrFile: DirOrFile = {
    type: entry.type,
    name: entry.name,
    path: entry.path
  };
  if (entry.type === 'directory') {
    const cover = entry.files?.find(file => file.startsWith('0.'));
    if (cover) {
      (dirOrFile as Directory).cover = {
        type: 'image',
        name: cover,
        path: pathUtil.join(entry.path, cover)
      };
    }
  }
  return dirOrFile;
}

function convertDbEntries(entries: LibraryDBEntry[]): DirOrFile[] {
  return entries.map(convertDbEntry);
}

async function filterDirectory(searchTerm: string): Promise<DirOrFile[]> {
  return DB.find<LibraryDBEntry>({
    $where: function () {
      const doc = this as LibraryDBEntry;
      return doc.name?.toLowerCase().includes(searchTerm.toLowerCase());
    }
  })
  .then(convertDbEntries);
}

export default filterDirectory;