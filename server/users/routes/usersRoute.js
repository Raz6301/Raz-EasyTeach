const express = require("express");
const {
  register,
  login,
  getUsers,
  getUser,
  editUser,
  changeBizStatus,
  deleteUser,
} = require("../controllers/usersControllers");
const auth = require("../../auth/authService");
const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.get("/", auth, getUsers);
router.get("/:userId", auth, getUser);
router.put("/:userId", auth, editUser);
router.patch("/:userId", auth, changeBizStatus);
router.delete("/:userId", auth, deleteUser);

module.exports = router;
