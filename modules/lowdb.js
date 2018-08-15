'use strict';

const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");

const getDB = dbFileName => low(new FileAsync(dbFileName || "db.json"));

const initDB = async () => {
  const db = await getDB()
  
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
