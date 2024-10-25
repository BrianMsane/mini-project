
// REQUIRED PACKAGE
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const axios = require('axios');
const multer = require('multer');
const upload = multer({ dest: 'temp/' });
const app = express();
const PORT = 3019;


// HOME PAGE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'index.html'));
});


// SIGN UP
app.post('/signup', async (req, res) => {
    const { username, email, password, conf_pass } = req.body;
    const user = new SignUp({
        username,
        email,
        password,
        conf_pass,
    });
    await user.save();
    res.redirect(`/login?username=${username}&password=${password}`);
});


// LOGIN
app.post('/login-redirect', async (req, res) => {
    const { username, password } = req.body;
    const user = new Login({
        username,
        password,
    });
    await user.save();
    res.sendFile(path.join(__dirname, 'website', 'home.html'));
});


// CONTACT US
app.post('/email', async (req, res) => {
    const { fullName, email, text } = req.body;
    const userDetails = {
        fullName,
        email,
        text,
    };

    try {
        const response = await axios.post('http://localhost:3017/contact-us', userDetails);
        if (response.status === 200) {
            console.log('Message successfully sent to the backend server!');
            // pop-up message in page
        }
        res.sendFile(path.join(__dirname, 'website', 'contact-us.html'));
    } catch (error) {
        console.error('Error sending data to backend:', error);
        res.status(500).send('Failed to process the request.');
    }
});


// START
app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}!`);
});
