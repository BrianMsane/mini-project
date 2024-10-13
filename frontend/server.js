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

// Start server
app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}!`);
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/SAS', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => {
    console.log('MongoDB connection successful!');
});

// SCHEMAS
// Define signup schema
const signupSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    conf_pass: String,
});
const SignUp = mongoose.model('SignUp', signupSchema);

// Define login schema
const loginSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const Login = mongoose.model('Login', loginSchema);

// Define contact-us schema
const contactUsSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    text: String,
});
const ContactUs = mongoose.model('ContactUs', contactUsSchema);

// Routes
// Serve the signup page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'signup.html'));
});

// Handle signup form submission
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

// Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'login.html'));
});

// Handle login form submission
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = new Login({
        username,
        password,
    });
    await user.save();
    res.sendFile(path.join(__dirname, 'website', 'home.html'));
});

// Serve the about-us page
app.get('/about-us', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'about-us.html'));
});

// Handle contact-us form submission
app.post('/contact-us', async (req, res) => {
    const { fullName, email, text } = req.body;
    const userDetails = {
        fullName,
        email,
        text,
    };

    try {
        // Send the request to the backend server
        const response = await axios.post('http://localhost:3017/contact-us', userDetails);
        if (response.status === 200) {
            console.log('Message successfully sent to the backend server!');
            // Optionally, you can redirect the user or show a success message
        }
        res.sendFile(path.join(__dirname, 'website', 'contact-us.html'));
    } catch (error) {
        console.error('Error sending data to backend:', error);
        res.status(500).send('Failed to process the request.');
    }
});

// Serve the error404 page
app.get('/error404', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'error404.html'));
});

// Handle file uploads and forward to FastAPI backend
app.post('/upload', upload.single('document'), async (req, res) => {
    const { file } = req;

    if (!file) {
        return res.sendFile(path.join(__dirname, 'website', 'error404.html'));
    }

    try {
        // Prepare file data for backend
        const formData = new FormData();
        formData.append('file', fs.createReadStream(file.path));

        // Use axios to send the file to FastAPI backend
        const response = await axios.post('http://localhost:3017/upload_document', formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        fs.unlinkSync(file.path);

        res.send(`File uploaded successfully! Backend response: ${response.data}`);
    } catch (error) {
        console.error('File upload failed:', error);
        res.status(500).send('Failed to upload the document.');
    }
});

// Authentication middleware
function checkAuthentication(req, res, next) {
    // Implement your authentication logic here
    // For now, we'll assume the user is always authenticated
    next();
}

// Serve the fill-form page
app.get('/fill-form', checkAuthentication, (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'fill-form.html'));
});

// Serve the get-recommendations page
app.get('/get-recommendations', checkAuthentication, (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'get-recommendations.html'));
});
