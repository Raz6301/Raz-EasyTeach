const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");

const ENVOIRMENT = config.get("NODE_ENV");
const DB_NAME = config.get("DB_NAME");
const DB_PASSWORD = config.get("DB_PASSWORD");

if (ENVOIRMENT === "development")
  mongoose
    .connect("mongodb://127.0.0.1:27017/EasyTeach")
    .then(() =>
      console.log(
        chalk.magentaBright(
          "You have been connected to MongoDB Locally successfully!"
        )
      )
    )
    .catch((error) =>
      console.log(
        chalk.redBright(`Could not connect to mongoDb locally: ${error}`)
      )
    );

if (ENVOIRMENT === "production")
  mongoose
    .connect(
      `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.h4nzzj4.mongodb.net/test`
    )
    .then(() =>
      console.log(
        chalk.magentaBright(
          "You have been connected to MongoDB globally successfully!"
        )
      )
    )
    .catch((error) =>
      console.log(
        chalk.redBright(`Could not connect to mongoDb globally: ${error}`)
      )
    );
