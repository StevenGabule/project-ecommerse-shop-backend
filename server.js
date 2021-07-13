import dotenv from "dotenv";
import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import product from "./routes/product.js";
import user from "./routes/users.js";
import order from "./routes/order.js";
import { errorHandler, notFound } from "./middleware/error.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", product);
app.use("/api/users", user);
app.use("/api/orders", order);

app.get("/api/config/paypal", (req, res) => {
  return res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in port: ${PORT}`.yellow.inverse.bold);
});
