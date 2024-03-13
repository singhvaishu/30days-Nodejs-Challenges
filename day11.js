const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Authentication middleware
function authenticationMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
}

// Protected route
app.get('/protected-route', authenticationMiddleware, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
