const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

// Define a User schema
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// Define a User model
const User = mongoose.model('User', UserSchema);

// Express route handler to calculate the average age of all users
app.get('/average-age', async (req, res) => {
    try {
        const result = await User.aggregate([
            {
                $group: {
                    _id: null,
                    averageAge: { $avg: '$age' }
                }
            }
        ]);

        if (result.length > 0) {
            res.json({ averageAge: result[0].averageAge });
        } else {
            res.status(404).json({ error: 'No users found' });
        }
    } catch (error) {
        console.error('Error calculating average age:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
