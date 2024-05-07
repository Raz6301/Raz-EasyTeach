const express = require("express");
const app = express();
const chalk = require("chalk");
const router = require("./router/router");
const cors = require("./cors/cors");
const morganLogger = require("./loggers/morganLogger");
require("./initialData/initialDataService");
const config = require("config");
const {
  generateInitialCards,
  generateInitialUsers,
} = require("./initialData/initialDataService");

app.use(morganLogger);
app.use(cors);
app.use(express.json());
app.use(router);
app.use(express.text());
app.use(express.static("./public"));

const PORT = config.get("PORT") || 9000;

app.listen(PORT, async () => {
  console.log(chalk.blueBright(`Listening on: http://localhost:${PORT}`));
  require("./DB/mongodb/connectToMongoDB");
  await generateInitialUsers();
  await generateInitialCards();
});
