const express = require('express');
const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
    if (err instanceof PositiveIntegerError) {
        res.status(400).json({ error: 'Parameter "number" must be a positive integer' });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

class PositiveIntegerError extends Error { }

function positiveIntegerHandler(req, res, next) {
    const number = parseInt(req.query.number);
    if (isNaN(number) || number <= 0 || !Number.isInteger(number)) {
        return next(new PositiveIntegerError());
    }
    res.json({ message: 'Success' });
}


app.get('/positive', positiveIntegerHandler);

app.get('/', (req, res) => {
    res.send('Server is running');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
