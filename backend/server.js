const express = require('express');
const db = require('./db');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const fn = path.join(__dirname, 'config.json');
const app = express();
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(3001);
