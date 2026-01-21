import express from "express"
import { createProduct, getAllProducts, getProductById } from "../controllers/products.controller.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

let products = [
]

router.get('/', getAllProducts)

router.get('/:id', getProductById)


router.post('/', protect, createProduct )

router.put('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price } = req.body; 
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  if (name !== undefined) product.name = name;
  if (price !== undefined) {
    if (typeof price !== 'number' || price < 0) {   
      return res.status(400).json({
        error: "price must be a non-negative number"
      });
    } 
    product.price = price;
  }
  res.json(product);
});

router.delete('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId); 
  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }
  const deletedProduct = products.splice(productIndex, 1);
  res.json(deletedProduct[0]);
});



export default router

