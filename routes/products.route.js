import express from "express"
import { createProduct, editProduct, getAllProducts, getProductById } from "../controllers/products.controller.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

let products = [
]

router.get('/', getAllProducts)

router.get('/:id', getProductById)


router.post('/', protect, createProduct )

router.put('/:id', protect, editProduct);

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

