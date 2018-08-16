"use strict";

const { pushInput } = require("./utils");

module.exports = async (req, res) => {
  // console.log("---------------------------------------------");
  // console.log("key;", req.body.key);
  // console.log("IN: ", JSON.stringify(req.body).substr(0, 100) + "...");
  // console.log("body: ", req.body);
  const { body } = req;
  await pushInput(
    body.hostName,
    body
  );
  req.app.get("io").emit("new-message-added");
  res.json({ status: "OK" });
};
