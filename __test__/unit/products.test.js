const productController = require("../../controllers/products");
const productModel = require("../../models/products");
const httpMocks = require("node-mocks-http");
const newProduct = require("../data/new-product.json");
const allProducts = require("../data/all-products.json");

productModel.create = jest.fn();
productModel.find = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct;
  });
  it("Should have a createProduct function ", () => {
    expect(typeof productController.createProduct).toBe("function");
  });
  it("Should call ProductModel.create", async () => {
    await productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  });
  it("Should return 201 response code", async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("Should return json body in response", async () => {
    productModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });
  it("Should handle errors", async () => {
    const errorMessage = { message: "describtion property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("Product Controller Get", () => {
  it("Should have a getProduct function", () => {
    expect(typeof productController.getProduct).toBe("function");
  });
  it("Should call ProductModel.find({})", async () => {
    await productController.getProduct(req, res, next);
    expect(productModel.find).toHaveBeenCalledWith({});
  });
  it("Should return 200 response", async () => {
    await productController.getProduct(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
  });
  it("Should return json body in response", async () => {
    productModel.find.mockReturnValue(allProducts);
    await productController.getProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(allProducts);
  });
  it("Should handle errors", async () => {
    const errorMessage = { message: "Error finding prodcuct data" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.find.mockReturnValue(rejectedPromise);
    await productController.getProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
