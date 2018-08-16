'use strict';

const fs = require('fs');
const path = require('path');
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const Promise = require('bluebird');

const fileAccessPromised = Promise.promisify(fs.access);
const fileOpenPromised = Promise.promisify(fs.open);


const getTimeStamp = () => {
  const d = new Date();
  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  const yy = d.getFullYear();
  return [
    yy,
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
  ].join('')
}

const cycleDBPerDay = async () => {
  const dbDir = __dirname + '/../databases';
  const dbFile = `${getTimeStamp()}_db.json`;
  const dbPath = path.resolve(`${dbDir}/${dbFile}`);

  try {
    await fileAccessPromised(dbPath);
  } catch (err) {
    await fileOpenPromised(dbPath, 'a');
  }
  return dbPath;
} 

const getDB = dbFileName => low(new FileAsync(dbFileName || "db.json"));

const initDB = async () => {
  const dbPath = await cycleDBPerDay();
  const db = await getDB(dbPath)
  
  await db
    .defaults({
      hosts: [],
      inputLogs: [],
      outputLogs: []
    })
    .write();
  return db;
}

module.exports = {
  initDB,
  getDB
};
