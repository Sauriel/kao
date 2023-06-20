import os from 'os';
import path from 'path';
import Nedb from 'nedb-promises';

declare type LibraryDBEntry = {
  _id?: string;
  path: string;
  name?: string;
  files?: string[];
  folders?: LibraryDBEntry[];
  info?: Record<string, string>
}

const DB = Nedb.create({
  filename: path.join(os.homedir(), 'kao', 'library', 'avatars.db'),
  autoload: true
});

DB.ensureIndex({ fieldName: 'path', unique: true });
DB.ensureIndex({ fieldName: 'name' });
DB.ensureIndex({ fieldName: 'info.Serie' });
DB.ensureIndex({ fieldName: 'info.Haarfarbe' });
DB.ensureIndex({ fieldName: 'info.Geschlecht' });

export default DB;

export {
  LibraryDBEntry
}