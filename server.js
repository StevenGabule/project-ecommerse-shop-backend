import dotenv from "dotenv";
import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import product from "./routes/product.js";
import { errorHandler, notFound } from "./middleware/error.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("WELCOME TO API MERN STACK!");
});

app.use("/api/products", product);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in port: ${PORT}`.yellow.inverse.bold);
  // console.log(`Server is running in port: ${PORT}`);
});
