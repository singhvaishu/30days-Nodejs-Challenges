const express = require('express');
const app = express();

// Define cache object
const cache = {};

/**
 * Caching middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function cachingMiddleware(req, res, next) {
    const key = req.url;
    if (cache[key]) {
        const { data, expirationTime } = cache[key];


        if (expirationTime > Date.now()) {

            res.send(data);
            return;
        } else {

            delete cache[key];
        }
    }


    res.cacheResponse = function (data, expirationSeconds) {
        cache[key] = {
            data: data,
            expirationTime: Date.now() + expirationSeconds * 1000
        };
    };
    next();
}
app.get('/example', cachingMiddleware, (req, res) => {
    const responseData = 'This is a cached response';
    res.cacheResponse(responseData, 60);
    res.send(responseData);
});
app.get('/test', cachingMiddleware, (req, res) => {
    const responseData = 'This is a test cached response';
    res.cacheResponse(responseData, 30);
    res.send(responseData);
});
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
