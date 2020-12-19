const express = require('express');
const app = express();
const config = require('config');
const cors = require('cors');
const port = process.env.PORT || 3000;
const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const budgetModel = require('./model/budget');


const userModel = require('./model/users');
const users = require('./routes/users');
const auth = require('./routes/auth');
const budget = require('./routes/budget');


const accessTokenKey = 'My super secret key';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var url = 'mongodb+srv://supriya:12345@cluster0.pa8f0.mongodb.net/personalBudget?retryWrites=true&w=majority';


mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));


// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','http://68.183.139.30:3000');
//     res.setHeader('Access-Control-Allow-Headers','Content-type,Authorization');
//     next();
// })    

app.use(express.json());
app.use('/users', users);    
app.use('/auth', auth);    
app.use('/budget', budget);
//app.use('',express.static('public'));




app.listen(port,()=>{
    console.log("App is running on port "+port);
});