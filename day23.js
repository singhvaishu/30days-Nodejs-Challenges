const mongoose = require('mongoose');

// Define Category schema
const categorySchema = new mongoose.Schema({
    name: String,
    description: String
});

// Define Product schema with reference to Category
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

// Create Category model
const Category = mongoose.model('Category', categorySchema);


const Product = mongoose.model('Product', productSchema);

/**
 * Retrieves all products with populated category details from MongoDB
 * @returns {Array} - Array of product objects with populated category details
 */
async function getProductsPopulatedWithCategory() {
    try {

        const products = await Product.find().populate('category').exec();
        return products;
    } catch (error) {
        console.error("Error retrieving products with populated category details:", error);
        return [];
    }
}

(async () => {

    try {
        await mongoose.connect('mongodb://localhost:27017/your_database_name', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");

        const category1 = await Category.create({ name: 'Electronics', description: 'Electronics products' });
        const category2 = await Category.create({ name: 'Clothing', description: 'Clothing products' });


        await Product.create({ name: 'Laptop', price: 1000, category: category1._id });
        await Product.create({ name: 'T-shirt', price: 20, category: category2._id });


        const products = await getProductsPopulatedWithCategory();
        console.log("Products with populated category details:", products);
    } catch (error) {
        console.error("Error:", error);
    }
})();
