// Serving the front-end appliation

const express = require('express');
const mongoose = require('mongoose');
const path =require('path');
const port = 3019;
const app = express();

app.listen(port, ()=>{
    console.log('Server started successfully!')
});

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, './signup/index.html'))
});

