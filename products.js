import express from "express"

const router = express.Router()

let products = [
     { id: 1, name: "Phone", price: 500 },
  { id: 2, name: "Laptop", price: 1200 }
]

router.get('/', (req, res) => {
    res.json(products)
})
export default router

