var mongoDb = require('../models/index');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.isUserAuthenticated = function(req, res) {
    res.json({
        isLoggedIn: true,
        username: req.user.username
    })
}

exports.registerUser = async function(req, res) {
    const user = req.body;

    // Check if user already exists
    const usernameExists = await mongoDb.UserModel.findOne({username: user.username})
    const emailExists = await mongoDb.UserModel.findOne({email: user.email})

    if(usernameExists || emailExists) {
        res.json({error: "Account already exist for given Username or Email"})
    } else {
        console.log(user)
        user.password = await bcrypt.hash(req.body.password, 10);
        
        const dbUser = new mongoDb.UserModel({
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password
        })

        dbUser.save();
        res.json({success: "User has been successfully registered"});
    }
}

exports.loginUser = async function(req, res) {
    const userRequest = req.body;

    mongoDb.UserModel.findOne({username: userRequest.username})
        .then(user => {
            // If user doesnot exists
            if(!user) {
                return res.json({
                    error: "Entries are not correct"
                })
            }
            bcrypt.compare(userRequest.password, user.password)
                .then(matched => {

                    //passwords are not matched
                    if(!matched) {
                        return res.json({
                            error: "Entries are not correct"
                        })
                    }

                    const payload = {
                        id: user._id,
                        username: user.username
                    }

                    jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        {expiresIn: 24 * 60 * 60 * 1000},
                        (err, token) => {
                            if(err)
                                return res.json({
                                    error: err
                                })
                            

                                return res.json({
                                    message: "Success",
                                    token: "Beared: "+token
                                })
                        }
                    )
                })
        })
}

exports.verifyJWT = function(req, res, next) {
    const token = req.headers["x-access-token"].split(' ')[1];

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) return res.json({
                isLoggedIn: false,
                message: "Failed to Authenticate"
            })
            req.user = {};
            req.user.id = decoded.id
            req.user.username = decoded.username
            next();
        })
    }
}



module.exports = exports;