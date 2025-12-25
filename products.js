import express from "express"

const router = express.Router()

let products = [
     { id: 1, name: "Phone", price: 500 },
  { id: 2, name: "Laptop", price: 1200 }
]

router.get('/', (req, res) => {
    res.json(products)
})

router.post('/', (req, res) => {
  const { id, name, price } = req.body;
  if (!id || !name || price === undefined) {
    return res.status(400).json({
      error: "id, name, and price are required"
    });
  }

  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({
      error: "price must be a non-negative number"
    });
  }
  let newProduct = { id, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});




export default router

