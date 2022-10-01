const express = require("express");
const router = express.Router();
const productController = require("./controllers/products");

router.post("/", productController.createProduct);
router.get("/", productController.getProduct);

module.exports = router;
