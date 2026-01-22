import express from "express"
import { createProduct, deleteProduct, editProduct, getAllProducts, getProductById } from "../controllers/products.controller.js"
import { isAdmin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()


router.get('/', getAllProducts)

router.get('/:id', getProductById)

router.post('/', protect, isAdmin, createProduct )

router.put('/:id', protect, isAdmin, editProduct);

router.delete('/:id', protect, isAdmin,  deleteProduct);

export default router

