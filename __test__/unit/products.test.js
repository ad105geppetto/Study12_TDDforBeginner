const productController = require("../../controllers/products");
const productModel = require("../../models/products");
const httpMocks = require("node-mocks-http");
const newProduct = require("../data/new-product.json");

productModel.create = jest.fn();

describe("Product Controller Create", () => {
  it("Should have a createProduct function ", () => {
    expect(typeof productController.createProduct).toBe("function");
  });
  it("Should call ProductModel.create", () => {
    let req = httpMocks.createRequest();
    let res = httpMocks.createResponse();
    let next = null;
    req.body = newProduct;
    productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  });
});
