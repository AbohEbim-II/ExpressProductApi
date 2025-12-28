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


router.post('/', (req, res) => {
  const { name, price } = req.body;
   const id = Number(req.body.id);
  if (!id || !name || price === undefined) {
    return res.status(400).json({
      error: "id, name, and price are required"
    });
  }
 

if (Number.isNaN(id)) {
  return res.status(400).json({ error: "id must be a number" });
}
  
  const exists =  products.find(p => p.id === id);  
  if (exists) {
    return res.status(409).json({ error: "product with this id already exists" });
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

