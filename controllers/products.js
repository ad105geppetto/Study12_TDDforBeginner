const productModel = require("../models/products");

exports.createProduct = async (req, res, next) => {
  const creatProduct = await productModel.create(req.body);
  res.status(201).json(creatProduct);
};
