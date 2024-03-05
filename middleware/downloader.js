const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.post('/download', (req, res) => {
    const filePath = req.body.filePath;

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Stream the file to the client
        const fileStream = fs.createReadStream(filePath);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename=' + path.basename(filePath));
        fileStream.pipe(res);
    });
});

