'use strict';

const { getDB } = require('../modules/lowdb');

const handler = async (req, res, next) => {
  const db = await getDB();
  const hosts = await db
    .get("hosts")
    .value();

  res.render('index', {
    title: 'Simple Express Interceptor',
    payload: {
      hosts
    }
  });
};

module.exports = handler;
