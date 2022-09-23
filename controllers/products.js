const productModel = require("../models/products");

exports.createProduct = (req, res, next) => {
  const creatProduct = productModel.create(req.body);
  res.status(201).json(creatProduct);
};
