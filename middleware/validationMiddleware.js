const {body, validationResult} = require('express-validator');
const userModel = require('../models/userModel');

const registerValidator = [
 
    body('username').notEmpty().withMessage('Username is required')
    .isLength({min:3,max:20}).withMessage('Username must be between 3 and 20 characters')
    .custom( async(username)=>{
     
     const existUser = await userModel.findOne({username});
        if(existUser){       
            throw new Error('Username already exist try');
        }
        return true;
    }),
    
    body('email').notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .custom(async (email) => {
        const existemail = await userModel.findOne({email});
        if(existemail){
            throw new Error('Email already exist');
        }   
        return true;
    }),

    body('password').notEmpty().withMessage('Password is required')
    .isLength({min:8,max:20}).withMessage('Password must be between 8 and 20 characters'),

    body('address').notEmpty().withMessage('Address is required'),

    body('dob').notEmpty().withMessage('Date of Birth is required')
    .isDate().withMessage('Invalid date format')

];


const validate = (req,res,next) => {

const errors = validationResult(req);

 if(!errors.isEmpty()){

     res.status(400).json({errors:errors.array()});
 }

next();

}

module.exports = {
registerValidator,
validate
};

