const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/productsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error("MongoDB connection error", err);
});


const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});


const Product = mongoose.model('Product', productSchema);

app.use(bodyParser.json());

// Express route to create a new product
app.post('/products', async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const product = new Product({ name, description, price });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Express route to retrieve all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Express route to update a product
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price }, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
