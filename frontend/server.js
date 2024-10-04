// Serving the front-end appliation
const express = require('express');
const mongoose = require('mongoose');
const path =require('path');
const axios = require('axios');
const multer = require('multer');
const upload = multer({ dest: 'temp/' });
const fs = require('fs');

const PORT = 3019;


// application
const app = express();
app.listen(PORT, ()=>{console.log('Server started successfully!');});
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}));



// connecting to our database
mongoose.connect('mongodb://localhost:27017/SAS');
const db = mongoose.connection;
db.once('open', ()=>{
    console.log('Mongodb connection successful!');
});

// SCHEMAS
// define signup schema
singupSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    conf_pass: String
});
const SignUp = mongoose.model('data', singupSchema);


// define login schema
loginSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const loginIn = mongoose.model('datas', singupSchema);


// define contact-us schema
contactUsSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    text: String
});
const contactUs= mongoose.model('datad', contactUsSchema);




// serving the application
app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, './signup/index.html'));
});


// store data in db
app.post('/signup', async(req, res)=>{
    const {username, email, password, conf_pass} = req.body;
    const user = new SignUp({
        username,
        email,
        password,
        conf_pass
    });
    await user.save();
    res.redirect(`/login?username=${username}&password=${password}`)
});


// store data in db
app.post('/login', async(req, res)=>{
    const {username, password} = req.body;
    const user = new loginIn({
        username,
        password,
    });
    await user.save();
    res.sendFile(path.join(__dirname, './home/index.html'));
});


// serving the about-us
app.get("/about-us", (req, res) =>{
    res.sendFile(path.join(__dirname, './about-us/index.html'));
});


app.post("/contact-us", async (req, res) => {
    // Extract data from the frontend request and make backend payload
    const { fullName, email, text } = req.body;
    const userDetails = {
        fullName,
        email,
        text
    };

    try {
        // Send the request to the backend server
        const response = await axios.post('http://localhost:3017/contact-us', userDetails);
        if (response.status === 200) {
            console.log("Message successfully sent to the backend server!"); //pop-up to tell the user to check thier emails
        }
        res.sendFile(path.join(__dirname, './contact-us/index.html'));
    } catch (error) {
        console.error("Error sending data to backend:", error);
        res.status(500).send("Failed to process the request.");
    }
});


// serving the error404 page
app.get("/error404", (req, res) =>{
    res.sendFile(path.join(__dirname, './error/index.html'));
});


// Handle file uploads and forward to FastAPI backend
app.post('/upload', upload.single('document'), async (req, res) => {
    const {file } = req;

    if (!file) {
        return res.sendFile(path.join(__dirname, './public/error404.html'));
    }

    try {
        // Prepare file data for backend
        const fileStream = fs.createReadStream(file.path);
        const formData = {
            file: fileStream,
        };

        // Use axios to send the file to FastAPI backend
        const response = await axios.post('http://localhost:3017/upload_document', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        fs.unlinkSync(file.path);

        res.send(`File uploaded successfully! Backend response: ${response.data}`); // serve the next step
    } catch (error) {
        console.error('File upload failed:', error);
        res.status(500).send('Failed to upload the document.');
    }
});