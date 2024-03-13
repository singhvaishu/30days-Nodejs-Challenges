const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define user schema with validation for email property
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    }
});

const User = mongoose.model('User', userSchema);
function addUserWithValidation(user) {
    const newUser = new User(user);
    newUser.save(function (err) {
        if (err) {
            console.error('Error adding user:', err.message);
        } else {
            console.log('User added successfully');
        }
    });
}
addUserWithValidation({ username: 'john_doe', email: 'invalid-email' });