const productModel = require("../models/products");

exports.createProduct = async (req, res, next) => {
  try {
    const creatProduct = await productModel.create(req.body);
    res.status(201).json(creatProduct);
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  await productModel.find({});
};
