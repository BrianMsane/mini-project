// Required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const axios = require('axios');
const multer = require('multer');
const upload = multer({ dest: 'temp/' });
const fs = require('fs');
const FormData = require('form-data'); // To handle multipart/form-data

// Initialize application
const app = express();
const PORT = 3019;

// Middleware
app.use(express.static(path.join(__dirname, 'website'))); // Serve static files from 'website' directory
app.use(express.urlencoded({ extended: true }));


// Serve the contact-us page
app.get('/contact-us', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'contact.html'));
});


// Start server
app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}!`);
});