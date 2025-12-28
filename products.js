import express from "express"

const router = express.Router()

let products = [
     { id: 1, name: "Phone", price: 500 },
  { id: 2, name: "Laptop", price: 1200 }
]

router.get('/', (req, res) => {
    res.status(200).json(products)
})

router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
}
  res.status(200).json(product)
})


export default router

