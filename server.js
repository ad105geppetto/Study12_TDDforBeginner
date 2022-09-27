const express = require("express");

const port = 5000;

const app = express();

const productRoutes = require("./routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@test.81mvvlc.mongodb.net/${process.env.MONGO_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use("/api/products", productRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port);
console.log(`Running on port ${port}`);

module.exports = app;
