import os from 'os';
import path from 'path';
import Nedb from 'nedb-promises';

declare type NeDBQuery = {
  [key: string]: any;
};

declare type DbDoc = {
  _id: string;
};

declare type InsertOrUpdateFunction = <TSchema>(query: NeDBQuery, doc: TSchema) => Promise<DbDoc & TSchema>;

declare type EnrichedNeDB = Nedb<DbDoc> & {
  insertOrUpdate: InsertOrUpdateFunction;
}

const DB = Nedb.create({
  filename: path.join(os.homedir(), 'kao', 'library', 'avatars.db'),
  autoload: true
}) as EnrichedNeDB;

DB.insertOrUpdate = async function <TSchema>(query: NeDBQuery, doc: TSchema): Promise<DbDoc & TSchema> {
  const findOneResult = await this.findOne(query);
  if (findOneResult) {
    return await this.update(findOneResult, doc as NeDBQuery, { returnUpdatedDocs: true }) as DbDoc & TSchema;
  } else {
    return this.insert({ ...query, ...doc });
  }
}

export default DB;

export {
  DbDoc
}