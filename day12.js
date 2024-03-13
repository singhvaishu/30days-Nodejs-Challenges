const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.',
    handler: (req, res, next) => {
        res.status(429).send('Too many requests, please try again later.');
    }
});


app.use(limiter);


app.get('/', (req, res) => {
    res.send('Hello World today is day 12 in nodejs challenges!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
