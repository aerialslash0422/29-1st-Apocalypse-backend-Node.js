const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
//const jwt = require('./middlewares');

// const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const User = require('../models/user')

const router = express.Router();

const emailRule = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const passwordRule = /'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/

router.post('/signup', async(req,res) => {
    const {email, name, password, phoneNumber } = req.body;
    
    const emailValidate = emailRule.exec(email)
    if (!emailValidate){
        return res.status(400).json({
            'message' : 'INVALID_EMAIL'
        })
    }

    const passwordValidate = passwordRule.exec(password)
    if (!passwordValidate){
        return res.status(400).json({
            'message' : 'INVALID_PASSWORD'
        })
    }

    try{
        const user = await User.findOne({where : {email}});

        if (user) {
            return res.status(400).json({
                'message' : 'ALREADY_EXIST_USER'
                })
        }

        const hash = await bcrypt.hash(password,12);
        
        await User.create({
            email,
            name,
            password : hash,
            phoneNumber
        });

        return res.status(200).json({
            'message' : 'SUCCESS',
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            'message' : 'Server Error'
        });
    }
});

router.post('/signin', async(req,res,next) => {
    const {email, password } = req.body;
    try{
        const user = await User.findOne({where : {email}});
        
        if (!bcrypt.compare(password, user.password)){
            return res.status(401).json({
                'message' : 'INVALID_PASSWORD'
            })
        }
        const token = jwt.sign(
            user.id,
            process.env.JWT_SECRET, 
            {algorithm : "HS256"}
        )

        return res.status(200).json({
            'message' : 'SUCCESS',
            'access_token' : token
        })
    }catch{
        console.error(error);
        return res.status(500).json({
            'message' : 'Server Error'
        });
    }
});

module.exports = router;
