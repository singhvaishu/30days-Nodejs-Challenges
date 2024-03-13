const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {


    Product.collection.createIndex({ name: 1 }, (err, result) => {
        if (err) {
            console.error('Error creating index:', err);
        }

        else {
            console.log('Index created successfully:', result);
        }
        mongoose.connection.close();
    });
});
