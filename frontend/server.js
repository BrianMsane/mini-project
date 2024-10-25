const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const axios = require('axios');
const multer = require('multer');
const upload = multer({ dest: 'temp/' });


// Initialize application
const app = express();
const PORT = 3019;

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'index.html'));
});



// Start server
app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}!`);
});
