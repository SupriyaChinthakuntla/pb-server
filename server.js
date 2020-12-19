const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const pbModel = require('./model/budget');
const bodyParser = require('body-parser')
const accessTokenKey = 'My super secret key';
const config = require('config');

const userModel = require('./model/users');
const users = require('./routes/users');
const auth = require('./routes/auth');
const budget = require('./routes/budget');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

var url = 'mongodb+srv://supriya:12345@cluster0.pa8f0.mongodb.net/personalBudget?retryWrites=true&w=majority';

mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));


app.use(express.json());
app.use('/users', users);    
app.use('/auth', auth);    
app.use('/budget', budget);

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});