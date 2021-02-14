const User = require('../models/user');
const jwt = require('jsonwebtoken');

const handleErrors = (err)=> {
    console.log(err.message,err.code);
    let errors  ={
        email : '',
        password : ''
    };

        if(err.message === 'incoorect email' ){
            errors.email = 'email is not registered'
        }
        if(err.message === 'incoorect password' ){
            errors.email = 'incorrect password'
        }

        // duplicate error code
        if(err.code === 11000){
            errors['email'] = 'Email already registered';
            return errors
        }
     
    //validation errors 
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            // console.log(properties) //destructuring properties
            errors[properties.path] = properties.message    // error['email] = 'some value'
        })  
    }

    

    return errors;

}

const createToken = (id) => {  // id of user save in database

    const maxAge = 3*24*60*60;
    return jwt.sign({ id }, 'shantanu secret', {expiresIn : maxAge});
}

exports.getSmoothies = (req,res)=> {
    res.render('smoothies')
}

exports.getSignup = (req,res,next)=> {
    res.render('signup')
}

exports.postSignup = async (req,res,next)=> {
    const { email,password } = req.body;
    console.log(email,password) 

    try {
        const user = await  User.create({
            email : email,
            password : password
        })
        const token = createToken(user._id) // create token
        // next step to place it in a cokkie to store
        res.cookie('jwt', token, { httponly : true, maxAge : 3*24*60*60*1000 })
        res.status(201).json({user : user._id}) 
    }
    catch(err){
         const errors  = handleErrors(err);
         res.status(400).json({errors : errors})
    }
c
    
}

exports.getLogin = (req,res,next)=> {
    const { email,password } = req.body;
    res.render('login')
}

exports.postLogin = async (req,res,next)=> {
      const { email,password } = req.body;

      try {
            const user = await User.login(email,password)
            const token = createToken(user._id);
            res.cookie('jwt',token,{httponly : true, maxAge : 3*24*60*60*1000});
            res.status(200).json({user : user._id})
      }catch(err){
          const errors = handleErrors(err);
          res.status(400).json({})
      }


}

exports.getLogout = (req,res,next)=>{
    res.cookie('jwt','', {maxAge : 1})
    res.redirect('/')
}