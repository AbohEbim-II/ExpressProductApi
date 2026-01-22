import Product from "../models/products.model.js";
import asyncHandler from "express-async-handler";


export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products)
})

export const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404)
            throw new Error("Product not found" );
    }
    res.status(200).json(product)
})

export const createProduct =  asyncHandler(async(req, res) => {
    const { name, price } = req.body;
    if (!name || price === undefined) {
        return res.status(400).json({
            error: "Name and Price are required"
        });
    }


    const exists = await Product.findOne({ name});
    if (exists) {
        return res.status(409).json({ error: "product with this name already exists" });
    }

   
    let newProduct = new Product({ name, price });
    newProduct.save();
    res.status(201).json(newProduct);
})

export const editProduct = asyncHandler(async (req, res) => {
  const { name, price } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});
