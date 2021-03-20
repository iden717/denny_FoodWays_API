const express = require("express");

const router = express.Router();

const {
  getUsers,
  deleteUser,
  addUser,
  getUser,
} = require("../controllers/user");
const { checkAuth } = require("../middlewares/auth");
const { register, login } = require("../controllers/auth");

router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);
router.post("/register", register);
router.post("/login", login);
router.get("/user/:id", checkAuth, getUser);

module.exports = router;
