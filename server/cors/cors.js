const express = require("express");
const app = express();
const cors = require("cors");
const chalk = require("chalk");

const authorizedAPIs = [
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5501",
  "http://localhost:3000",
];

const options = (req, callback) => {
  // console.log("in cors: ", req.headers.origin);
  const isExist = authorizedAPIs.find((api) => api === req.headers.origin);
  if (!isExist)
    return callback(
      // error message
      chalk.redBright(
        `CORS Error: the API ${req.headers.origin} is an Unauthorized API`
      ),
      {
        // CORS
        origin: false,
      }
    );
  callback(null, { origin: true });
};

app.use(cors(options));

module.exports = app;
