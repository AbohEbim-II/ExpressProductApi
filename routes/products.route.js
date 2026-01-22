import express from "express"
import { createProduct, deleteProduct, editProduct, getAllProducts, getProductById } from "../controllers/products.controller.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()


router.get('/', getAllProducts)

router.get('/:id', getProductById)

router.post('/', protect, createProduct )

router.put('/:id', protect, editProduct);

router.delete('/:id', protect, deleteProduct);



export default router

