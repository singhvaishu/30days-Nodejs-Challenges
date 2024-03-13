// Import required modules
const express = require('express');
const mongoose = require('mongoose');


const app = express();


const mongoURI = 'mongodb://localhost/mydatabase';


function connectToMongoDB() {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.on('error', (error) => {
        console.error('MongoDB connection error:', error);
    });

    db.once('open', () => {
        console.log('Connected to MongoDB successfully');
    });
}


connectToMongoDB();


app.get('/', (req, res) => {
    res.send('Hello, MongoDB!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
