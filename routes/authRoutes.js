const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.get('/signup', authController.getSignup)

router.post('/signup', authController.postSignup)

router.get('/login', authController.getLogin)

router.post('/login', authController.postLogin)

router.get('/logout',authController.getLogout)


// cookies 

// router.get('/set-cookies' ,(req,res)=> {
// //     res.setHeader('Set-Cookie','newUser=true')
// //     res.send('you got cookies')

// // new method cookie-parser
//  res.cookie('newUser',false)
//  res.cookie('isEmployee',false,{maxAge : 1000*60*60*24,/*secure : true,httpOnly : true*/}) // miliseconds, cookie only be sent when we have http secure connection , cannnot be accesed by document.xookie in fronte js
//  res.send('you got cookies')
 
//  })
// router.get('/read-cookies',(rea,res)=>{
//     const cookies = req.cookies;
// })

module.exports = router