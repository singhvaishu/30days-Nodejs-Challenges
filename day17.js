// Import Mongoose
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    email: String
});

const User = mongoose.model('User', userSchema);

async function addUserToDatabase(user) {
    try {

        const newUser = new User(user);


        await newUser.save();

        console.log('User added successfully:', newUser);
    } catch (error) {
        console.error('Error adding user:', error.message);
    }
}


addUserToDatabase({ username: 'john_doe', email: 'john@example.com' });
