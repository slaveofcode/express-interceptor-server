'use strict';

const express = require('express');
const router = express.Router();
const { detectHost } = require('./recorder/utils')

router.use(async (req, res, next) => {
  const { body } = req;
  await detectHost(body.hostName);
  next();
})
router.get('/', require('./home'));
router.get("/logs/:hostName", require("./logs"));

router.post('/in', require('./recorder/in'));
router.post("/out", require("./recorder/out"));

module.exports = router;
