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
      const nameMatches = doc.name?.toLowerCase().includes(searchTerm.toLowerCase());
      let infoMatches = false;
      if (doc.info) {
        for (const value of Object.values(doc.info)) {
          if (value.toLowerCase().includes(searchTerm.toLowerCase())) {
            infoMatches = true;
            break;
          }
        }
      }
      return nameMatches || infoMatches;
    }
  })
  .then(convertDbEntries);
}

export default filterDirectory;