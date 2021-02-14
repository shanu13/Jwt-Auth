const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const authroutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth,checkUser } = require('./middleware/authmiddleware')
const app = express();

const dburi = 'mongodb://localhost:27017/users';

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json())
app.use(cookieParser())
app.set('view engine' , 'ejs')
app.set('views',path.join(__dirname,'views'));

 
app.use(authroutes);

app.get('*',checkUser)
app.get('/',(req,res) => {
    res.render('home')
})
app.get('/smoothies',requireAuth,(req,res)=> {
    res.render('smoothies')
})

mongoose.connect(dburi, {useNewUrlParser : true ,  useUnifiedTopology: true})
        .then(result => {
            app.listen(80)
            console.log('db connected')
        })
        .catch(err => {
            console.log(err);
        })