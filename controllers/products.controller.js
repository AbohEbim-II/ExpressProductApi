import Product from "../models/products.model.js";
import asyncHanlder from "express-async-handler";


export const getAllProducts = asyncHanlder(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products)
})

export const getProductById = asyncHanlder(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404)
            throw new Error("Product not found" );
    }
    res.status(200).json(product)
})

export const createProduct =  asyncHanlder(async(req, res) => {
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