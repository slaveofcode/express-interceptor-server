'use strict';

const db = require('../modules/lowdb');

const handler = async (req, res, next) => {
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
