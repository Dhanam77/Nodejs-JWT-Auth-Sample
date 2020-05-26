//Validation using joi
const { registerValidation, loginValidation } = require('../validation');

//User model
const User = require('../model/User.js');

//To hash passwords before storing in db
const bcrypt = require('bcryptjs');

//get jsonwebtokens
const jwt = require('jsonwebtoken');


//Signing up the user
exports.signup_user = async (req, res) => {

    //Validating using Joi
    const { error } = registerValidation(req.body);

    if (error) {
     return res.status(400).send(error.details[0].message);
    }

    //Check if user exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send('This email is already registered!');
    }


    //Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    //create new user
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword

    });

    try {
        const saveduser = await user.save();
        res.send({user: user._id});

    } catch (err) {
        res.status(400).send(err);
        console.log("Error in registering user");
    }
   
   
};


exports.login_user = async (req, res) => {
    //Validating using Joi
    const { error } = loginValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //Does email exit?
    const emailExist = await User.findOne({ email: req.body.email });
    if (!emailExist) {
        return res.status(400).send('Email doesn\'t exist');
    }

    //Is password correct
    const validPassword = await bcrypt.compare(req.body.password, emailExist.password);
    if (!validPassword) {
        return res.status(400).send('Invalid Password');
    };

    //Create and assign JWT Tokens
    const token = jwt.sign({ _id: emailExist._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    // res.send('Logged In');
};
