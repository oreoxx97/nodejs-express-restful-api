const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/product')
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/Cats', { useNewUrlParser: true })

// สร้าง database schema
const Cat = mongoose.model('Cat', { name: String })

// สร้าง instance จาก model
const kitty = new Cat({ name: 'JavaScript' })

// save ลง database (return เป็น Promise)
kitty.save().then(() => console.log('meow'))

// mock data
const products = [{}]

mongoose.connection.on('error', err => {
    console.error('MongoDB error', err)
  })

app.post('/products', async (req, res) => {
    const payload = req.body
    const product = new Product(payload)
    await product.save()
    res.status(201).end()
  })



  
  app.get('/products', (req, res) => {
    res.json(products)
  })
  
  app.get('/products/:id',async  (req, res) => {
    const { id } = req.params
  const product = await Product.findById(id)
  res.json(product)
  })
  
  app.post('/products', (req, res) => {
    const payload = req.body
    res.json(payload)
  })
  
  app.put('/products/:id', async  (req, res) => {
    const payload = req.body
    const { id } = req.params
  
    const product = await Product.findByIdAndUpdate(id, { $set: payload })
    res.json(product)
  })
  
  app.delete('/products/:id',async (req, res) => {
    const { id } = req.params

    await Product.findByIdAndDelete(id)
    res.status(204).end()
  })


app.listen(9000, () => {
  console.log('Application is running on port 9000')
})