"use strict";

const { getDB } = require("../modules/lowdb");
const { sortBy, find } = require('lodash');

const handler = async (req, res, next) => {
  const { hostName } = req.params;

  const db = await getDB();

  const dateSorterDesc = (item) => (new Date() - new Date(item.createdAt));

  const inputLogs = await db
    .get("inputLogs")
    .filter({ hostName })
    .sortBy([dateSorterDesc])
    .take(100)
    .value();

  const inputLogKeys = inputLogs.map(item => item.logKey);
  const outputLogs = await db
    .get("outputLogs")
    .filter(item => {
      return item.hostName == hostName && inputLogKeys.includes(item.logKey);
    })
    .sortBy([dateSorterDesc])
    .take(100)
    .value();

  const logs = [];
  for (const inputLog of inputLogs) {
    logs.push({
      createdAt: inputLog.createdAt,
      input: inputLog,
      output: find(outputLogs, { hostName: inputLog.hostName, logKey: inputLog.logKey })
    })
  }
  const sortedLogs = sortBy(logs, [dateSorterDesc]);

  res.render("logs/index", {
    hostName,
    title: `Logs for ${hostName}`,
    payload: {
      logs: sortedLogs
    }
  });
};

module.exports = handler;
