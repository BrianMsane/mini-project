// Serving the front-end appliation
const express = require('express');
const mongoose = require('mongoose');
const path =require('path');
const port = 3019;


// application
const app = express();
app.listen(port, ()=>{console.log('Server started successfully!');});
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}));



// connecting to our database
mongoose.connect('mongodb://localhost:27017/SAS');
const db = mongoose.connection;
db.once('open', ()=>{
    console.log('Mongodb connection successful!');
});


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
const loginIn = mongoose.model('data', singupSchema);


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
    console.log(user);
    // res.send("Form Submitted sucessfully!");
    res.sendFile(path.join(__dirname, './home/index.html')); //home page after login
})


// store data in db
app.post('/login', async(req, res)=>{
    const {username, password} = req.body;
    const user = new loginIn({
        username,
        password,
    });
    await user.save();
    console.log(user);
    // res.send("Form Submitted sucessfully!");
    res.sendFile(path.join(__dirname, './home/index.html')); //home page after login
})

// serving the application
app.get("/about-us", (req, res) =>{
    res.sendFile(path.join(__dirname, './about-us/index.html'));
});

// serving the application
app.get("/contact-us", (req, res) =>{
    res.sendFile(path.join(__dirname, './contact-us/index.html'));
});

// serving the application
app.get("/error", (req, res) =>{
    res.sendFile(path.join(__dirname, './error/index.html'));
});
