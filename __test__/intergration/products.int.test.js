const request = require("supertest");
const app = require("../../server");
const newProduct = require("../data/new-product.json");
const updatedProduct = require("../data/updated-product.json");

let firstProduct;
it("POST /api/products", async () => {
  const response = await request(app).post("/api/products").send(newProduct);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
});

it("Should return 500 on POST /api/products", async () => {
  const response = await request(app)
    .post("/api/products")
    .send({ name: "phone" });
  expect(response.statusCode).toBe(500);
  expect(response.body).toStrictEqual({
    message:
      "Products validation failed: description: Path `description` is required.",
  });
});

it("GET /api/products", async () => {
  const response = await request(app).get("/api/products");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0];
});

it("GET /api/products/:productId", async () => {
  const response = await request(app).get(`/api/products/${firstProduct._id}`);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
});

it("GET id doesn't exist /api/products/:productId", async () => {
  const response = await request(app).get(
    `/api/products/${firstProduct._id.slice(0, firstProduct._id.length - 2)}44`
  );
  expect(response.statusCode).toBe(404);
});

it("PATCH /api/products/:productId", async () => {
  const response = await request(app)
    .patch(`/api/products/${firstProduct._id}`)
    .send(updatedProduct);
  firstProduct.name = updatedProduct.name
    ? updatedProduct.name
    : firstProduct.name;
  firstProduct.description = updatedProduct.description
    ? updatedProduct.description
    : firstProduct.description;
  firstProduct.price = updatedProduct.price
    ? updatedProduct.price
    : firstProduct.price;
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  console.log(response.body.description);
  expect(response.body.description).toBe(firstProduct.description);
});

it("PATCH id doesn't exist /api/products/:productId", async () => {
  const response = await request(app)
    .patch(
      `/api/products/${firstProduct._id.slice(
        0,
        firstProduct._id.length - 2
      )}44`
    )
    .send(updatedProduct);
  expect(response.statusCode).toBe(404);
});
