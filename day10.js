const express = require('express');
const path = require('path');

const app = express();


const publicDirectoryPath = path.join(__dirname, 'public');

app.use(express.static(publicDirectoryPath));
app.get('/', (req, res) => {

    const indexPath = path.join(publicDirectoryPath, 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {

            console.error(`Error sending file: ${indexPath}`, err);

        } else {

            console.log(`Sent file: ${indexPath}`);
        }
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
