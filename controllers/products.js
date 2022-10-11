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
  try {
    const allProducts = await productModel.find({});
    res.status(200).json(allProducts);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      }
    );

    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const deleteProduct = await productModel.findByIdAndDelete(
      req.params.productId
    );

    if (deleteProduct) {
      res.status(200).json(deleteProduct);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};
