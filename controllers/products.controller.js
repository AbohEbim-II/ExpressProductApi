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

if(!req.file){
    return res.status(400).json({ error: "Image file is required" });
} 
    const exists = await Product.findOne({ name});
    if (exists) {
        return res.status(409).json({ error: "product with this name already exists" });
    }

      const base64Image = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: "products",
    });
   
    let newProduct = new Product({ name, price, imageUrl: uploadResult.secure_url });
    await newProduct.save();
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

    if (req.file) {
    const base64 = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: "products",
    });

    product.imageUrl = uploadResult.secure_url;
  }

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});


export const deleteProduct = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  await product.deleteOne();
  res.json("Product Deleted Successfully");
})