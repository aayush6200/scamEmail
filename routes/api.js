const express = require("express");
const router = express.Router();

const gpt = require("./gpt.js");
const links = require("./links.js");
const domains = require("./thirdparty.js");
const combineResults = require("./combine.js");
const gptCheck = require("../controllers/gptcheck.js");
const send = require("./sendCombine.js");

router.post(
  "/verify",
  links,
  combineResults,
  domains,
  combineResults,
  gpt,
  combineResults,
  gptCheck,
  send
);

module.exports = router;
