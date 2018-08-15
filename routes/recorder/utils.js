'use strict';

const { getDB } = require("../../modules/lowdb");

const detectHost = async hostName => {
  const db = await getDB();
  const foundHost = await db.get('hosts').find({ name: hostName }).value();
  if (!foundHost) {
    await db.get('hosts').push({ name: hostName }).write()
  }

  return hostName;
};

const makeLog = (logName) => {
  return async (hostName, data) => {
    const db = await getDB();
    return db.get(logName).push({
      hostName,
      data
    }).write();
  }
} 

module.exports = {
  detectHost,
  pushInput: makeLog("inputLogs"),
  pushOutput: makeLog("outputLogs")
};