const express = require("express");

const port = 5000;

const app = express();

const productRoutes = require("./routes");

app.use(express.json());
app.use("/api/products", productRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port);
console.log(`Running on port ${port}`);
