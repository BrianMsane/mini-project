
// REQUIRED PACKAGE
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const axios = require('axios');
const multer = require('multer');
const app = express();
const PORT = 3016;


// HOME PAGE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'index.html'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'contact.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'about_us.html'));
});
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'form.html'));
});
app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'error.html'));
});
app.get('/recommend', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'recommend.html'));
});
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'signin.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'signup.html'));
});


// SIGN UP
app.post('/signup-process', async (req, res) => {
    const { username, email, password, conf_pass } = req.body;
    const user = new SignUp({
        username,
        email,
        password,
        conf_pass,
    });

    try{
        const response = await axios.post('http://localhost:3017/signup', userLogin);
        if (response.status === 200) {
            if (response.body.athenticated === true){
                res.redirect(`/login?username=${username}&password=${password}`);
            }
        }
    } catch{
        console.error('Error sending data to backend:', error);
        res.status(500).send('Failed to process the request.');
    }
});


// LOGIN
app.post('/login-process', async (req, res) => {
    const { username, password } = req.body;
    const userLogin = new Login({
        username,
        password,
    });

    try{
        const response = await axios.post('http://localhost:3017/authenticate', userLogin);
        if (response.status === 200) {
            if (response.body.athenticated === true){
                console.log("Login Successful!")
                return true;
            }
        }
        res.sendFile(path.join(__dirname, 'website', 'home.html'));
    } catch (error) {
        console.error('Error sending data to backend:', error);
        res.status(500).send('Failed to process the request.');
    }
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
