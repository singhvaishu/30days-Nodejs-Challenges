const jwt = require('jsonwebtoken');

// Sample user database for demonstration purposes
const users = [
    { id: 1, username: 'admin', password: 'adminpassword', role: 'admin' },
    { id: 2, username: 'user', password: 'userpassword', role: 'user' }
];

// Secret key for JWT
const secretKey = 'yourSecretKey';

function authenticateAndAuthorize(req, res, next) {

    const token = req.headers['authorization'] || req.query.token;

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed. Token not provided.' });
    }


    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
        } else {

            const user = users.find(u => u.id === decoded.id);
            if (!user) {
                return res.status(401).json({ message: 'Authentication failed. User not found.' });
            }


            if (user.role !== 'admin') {
                return res.status(403).json({ message: 'Authorization failed. Insufficient privileges.' });
            }


            req.user = user;
            next();
        }
    });
}

module.exports = authenticateAndAuthorize;
