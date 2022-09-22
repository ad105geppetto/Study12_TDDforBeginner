const productModel = require("../models/products");

exports.createProduct = (req, res, next) => {
  productModel.create(req.body);
  res.status(201).send();
};
