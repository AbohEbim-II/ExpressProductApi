import express from "express";
import dotenv from "dotenv";
import productRoutes from "./products.js";

dotenv.config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/products", productRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})