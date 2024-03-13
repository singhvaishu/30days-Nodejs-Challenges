const express = require('express');
const app = express();
const port = 3000;

function greetHandler(req, res) {
    const name = req.query.name || 'Guest';
    res.send(`Hello, ${name}!`);
}

app.get('/greet', greetHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
