"use strict";

const { pushOutput } = require("./utils");

module.exports = async (req, res) => {
  // console.log("---------------------------------------------");
  // console.log("key;", req.body.key);
  // console.log("OUT: ", JSON.stringify(req.body).substr(0, 100) + "...");
  // console.log("body: ", req.body);
  const { body } = req;
  await pushOutput(
    body.hostName,
    body
  );
  res.json({ status: "OK" });
};
