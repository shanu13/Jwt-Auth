const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type : String, 
        required : [true,'Please Enter an Email'],
        unique : true,
        lowercase : true,
        validate : [isEmail,'Enter an valid Email']

    },

    password : {
        type : String,
        required: [true,'Please enter an password'],
        minlength : [6,'Minimum length is 6']
    }
})

//fires a function after doc saved toi db

// userSchema.post('save',(doc,next)=> { // 'save' event occured
//     // console.log('new user saved',doc)
//     next()
// })

// fires a function before doc saved
 
userSchema.pre('save',async function(next) {
    // console.log('user about to get created and get saved',this)
    console.log(this);
    
    const salt = await bcrypt.genSalt()
    console.log(salt,this.password)
    this.password =  await bcrypt.hash(this.password,salt)
    next();
})

// static methiod to login 

userSchema.statics.login = async function(email,pasword){
    const user = await this.findOne({ email });
    if(user){
     const auth =  await  bcrypt.compare(password,user.password)
     if(auth){
         return user;
     }
       throw Error('incorrect Password')
    }
    throw Error('incorrect Email')
}

module.exports = mongoose.model('User',userSchema);