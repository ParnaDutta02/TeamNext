"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/next", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.introduction
      ? req.body.result.parameters.introduction
      : "Seems like some problem. Please speak again.";

  var result="";
  var resultJson = require('./result.json');
  if(speech==="Hi"){
    result=resultJson[0];
  }
  else
  {
    result=resultJson[1];
  }

  return res.json({
    speech: result,
    displayText: result,
    source: "webhook-echo-sample"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
