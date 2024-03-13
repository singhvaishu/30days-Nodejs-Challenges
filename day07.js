const express = require('express');
const app = express();

/**
 * Express middleware to log incoming requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function requestLoggerMiddleware(req, res, next) {

    console.log(`${new Date()} - ${req.method} request received.`);

    next();
}


app.use(requestLoggerMiddleware);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/example', (req, res) => {
    res.send('This is an example route with GET method');
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
