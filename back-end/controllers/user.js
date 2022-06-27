const { registerValidation , loginValidation} = require('../middleware/validation');
const bcrypt = require('bcryptjs');
const path = require('path');
const User = require('../model/user');
const jwt = require('jsonwebtoken');

exports.register = async (req,res) => {

    req.body.address = {pincode: req.body.pincode,street: req.body.street};
    //Validation
    // const { error } = registerValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    //Check existing user
    const emailExist = await User.findOne({email : req.body.email});
    if(emailExist) return res.status(400).send("Email already exists");

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    //Creating a new user
    const user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : hashPassword,
        address : req.body.address,
        phone : req.body.phone,
        role : req.body.role
    });
    try {
        const savedUser = await user.save();
        res.send({user : user._id});
    }
    catch(err) {
        res.status(400).send(err);
    }
};

exports.login = async (req,res) => {
    //Validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check for user
    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send("Email not found");

    //Password validation
    const validPassword = await bcrypt.compare(req.body.password , user.password);
    if(!validPassword) return res.status(400).send("Invalid Password");

    //Create token
    const accessToken = jwt.sign({_id : user._id,role: user.role}, process.env.SECRET_TOKEN1,{expiresIn:'1h'});
    const refreshToken = jwt.sign({_id : user._id,role: user.role}, process.env.SECRET_TOKEN2,{expiresIn:'1h'})
    res.status(200).header('access-token','Bearer '+accessToken).json({accessToken,refreshToken});

}

exports.refreshToken = async (req,res,next) => {
    const refreshToken = req.body.token;
    //check for refresh token
    if(!refreshToken){
        res.status(403).json({msg: "user not authenticated"});
    }
    //compare token with secret key
    
    jwt.verify(refreshToken,process.env.SECRET_TOKEN2,(err,data) => {
        if(!err) {
            //generating access token
            const accessToken = jwt.sign({_id : data._id,firstName: data.firstName}, process.env.SECRET_TOKEN1,
                {expiresIn:'20s'});
            res.status(201).json({ accessToken });
        }
        else {
            res.status(403).json({msg: "Invalid refresh token"});
        }

    })

}