const express = require("express");
const router = express.Router();
const studentsRoute = require("../students/routes/studentsRoute");
const { handleError } = require("../utils/errorHandler.js");
const usersRoute = require("../users/routes/usersRoute");

router.use("/users", usersRoute);
router.use("/students", studentsRoute);
router.use((req, res) => handleError(res));

module.exports = router;
