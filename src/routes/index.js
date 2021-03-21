const express = require("express");

const router = express.Router();

const {
  getUsers,
  deleteUser,
  addUser,
  getUser,
} = require("../controllers/user");

const {
  getProducts,
  getProductsPartner,
  getDetailProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const { register, login } = require("../controllers/auth");

const { checkAuth } = require("../middlewares/auth");
const { checkRolePartner } = require("../middlewares/checkRole");

//auth
router.post("/register", register);
router.post("/login", login);

//for admin
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);
router.get("/user/:id", getUser);

//product
router.get("/products", getProducts);
router.get("/products/:id", getProductsPartner);
router.get("/product/:id", getDetailProduct);
router.post("/product", checkAuth, checkRolePartner, addProduct);
router.patch("/product/:id", checkAuth, checkRolePartner, updateProduct);
router.delete("/product/:id", checkAuth, checkRolePartner, deleteProduct);

module.exports = router;
