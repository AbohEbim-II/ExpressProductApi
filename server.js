import express from "express";
import dotenv from "dotenv";
import productRoutes from "./products.js";
import cors from "cors";
import connectDB from "./config/database.js";

dotenv.config();

const app = express();
connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use("/products", productRoutes)

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})