'use strict';

const { getDB } = require("../../modules/lowdb");

const detectHost = async hostName => {
  const db = await getDB();
  const foundHost = await db.get('hosts').find({ name: hostName }).value();
  if (!foundHost && hostName) {
    await db.get('hosts').push({ name: hostName }).write()
  }

  return hostName;
};

const makeLog = (logName) => {
  return async (hostName, data) => {
    const db = await getDB();
    return db.get(logName).push({
      hostName,
      logKey: data.key,
      data,
      createdAt: new Date()
    }).write();
  }
} 

module.exports = {
  detectHost,
  pushInput: makeLog("inputLogs"),
  pushOutput: makeLog("outputLogs")
};