const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});

const Product = mongoose.model('Product', productSchema);

async function createProduct(product) {
    try {
        const newProduct = new Product(product);
        await newProduct.save();
        console.log('Product created successfully:', newProduct);
        return newProduct;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}

async function getAllProducts() {
    try {
        const products = await Product.find();
        return products;
    } catch (error) {
        console.error('Error retrieving products:', error);
        throw error;
    }
}

async function updateProduct(productId, updatedProduct) {
    try {
        const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
        console.log('Product updated successfully:', product);
        return product;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}


async function deleteProduct(productId) {
    try {
        await Product.findByIdAndDelete(productId);
        console.log('Product deleted successfully');
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}
