const express = require("express");

const router = express.Router();

const { getUsers, deleteUser, addUser } = require("../controllers/user");
const { register, login } = require("../controllers/auth");

router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
