const productController = require("../../controllers/products");

describe("Product Controller Create", () => {
  it("Should have a createProduct function ", () => {
    expect(typeof productController.createProduct).toBe("function");
  });
});
