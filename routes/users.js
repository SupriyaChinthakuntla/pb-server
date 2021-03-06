const bcrypt = require('bcrypt');
const userModel = require('../model/users');
const express = require('express');
const router = express.Router();
 
const cors = require('cors');
router.use(cors());

router.post('/', async (req, res) => {       
 
    let user = await userModel.findOne({ username: req.body.username });
    if (user) {
        return res.status(400).send('That user already exists!');
    } else {
        user = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            repassword: req.body.repassword
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(user);
    }
});


router.get('/',async (req,res)=>{
    userModel.find({})
    .then((data)=>{
        console.log(data);
        res.status(200).send(data);
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send();
    })   
})
 
module.exports = router;