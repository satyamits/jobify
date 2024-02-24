// const User = require("../models/User");
// const CryptoJS = require("crypto-js");
// const bcrypt = require('bcrypt');
// const { decrypt } = require("dotenv");

// module.exports = {
//     createUser: async (req, res) => {
//         const { username, email, password } = req.body;
//         try {
//             // Generate a salt
//             const salt = await bcrypt.genSalt(10);
//             // Hash the password along with the salt
//             const hashedPassword = await bcrypt.hash(password, salt);

//             const newUser = new User({
//                 username,
//                 email,
//                 password: hashedPassword,
//             });

//             const savedUser = await newUser.save();

//             res.status(201).json(savedUser);
//             console.log("User created");
//         } catch (error) {
//             res.status(500).json(error);
//             console.log(error.message);
//         }
//     },

//     loginUser: async (req, res) => {
//         try {
//             const user = await User.findOne({ email: req.body.email });
//             if (!user) {
//                 return res.status(401).json("Incorrect Login Credentials");
//             }
//             const validPassword = await bcrypt.compare(req.body.password, user.password);
//             if (!validPassword) {
//                 return res.status(401).json("Incorrect Login Credentials");
//             }
//             console.log("User LoggedIn");
//             const { password, __v, createdAt, ...others } = user._doc;
//             res.status(200).json(others);
//         } catch (error) {
//             console.log(error);
//             res.status(500).json(error.message);

//         }
//     }
// };


// const User = require('../models/User');
// const CryptoJS = require('crypto-js');
// const jwt = require('jsonwebtoken');


// module.exports = {
//     createUser: async (req, res) => {
//         const newUser = new User({
//             username: req.body.username,
//             email: req.body.email,
//             password: CryptoJS.AES.encrypt(
//                 req.body.password,
//                 process.env.SECRET
//             ).toString(),
//         });
//         try {
//             const savedUser = await newUser.save();
//             res.status(201).json(savedUser);
//             console.log('User Created');
//         } catch (error) {
//             console.log(error);
//             res.status(500).json(error);
//         }
//     },

//     loginUser: async (req, res) => {
//         try {
//             const user = await User.findOne({ email: req.body.email });
//             !user && res.status(401).json('Wrong Login Details');

//             const decrytedpass = CryptoJS.AES.decrypt(
//                 user.password,
//                 process.env.SECRET
//             );
//             const depassword = decrytedpass.toString(CryptoJS.enc.Utf8);

//             depassword !== req.body.password &&
//                 res.status(401).json('Wrong Login Details');

//             const userToken = jwt.sign(
//                 {
//                     id: user._id,
//                     isAdmin: user.isAdmin,
//                     isAgent: user.isAgent,
//                 },
//                 process.env.JWT_SEC,
//                 { expiresIn: '21d' }
//             );

//             const { password, __v, createdAt, ...others } = user._doc;

//             res.status(200).json({ ...others, userToken });
//         } catch (error) {
//             res.status(500);
//         }
//     },


// }


const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: async (req, res) => {
        try {
            // Generate a salt
            const salt = await bcrypt.genSalt(10);
            // Hash the password along with the salt
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });

            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
            console.log('User Created');
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).json('Wrong Login Details');
            }

            // Compare the provided password with the hashed password stored in the database
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(401).json('Wrong Login Details');
            }

            //Create and send JWT token if login is successful
            const userToken = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin,
                    isAgent: user.isAgent,
                },
                process.env.JWT_SEC,
                { expiresIn: '21d' }
            );

            const { password, __v, createdAt, ...others } = user._doc;
            res.status(200).json({ ...others, userToken });
            console.log("User LoggedIn");
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    },
};
