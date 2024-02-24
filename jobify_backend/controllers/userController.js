// const User = require("../models/User");
// const bcrypt = require('bcrypt');


// module.exports = {
//     updateUser: async (req, res) => {
//         if (req.body.password) {
//             const salt = await bcrypt.genSalt(10);
//             // Hash the password along with the salt
//             const hashedPassword = await bcrypt.hash(password, salt);
//             req.body.password = hashedPassword
//         }
//         try {
//             const UpdateUser = await User.findByIdAndUpdate(
//                 req.params.id, {
//                 $set: req.body
//             }, { new: true }
//             );
//             const { password, __v, createdAt, ...others } = this.updateUser._doc;
//             res.status(200).json({ ...others });
//         } catch (error) {

//         }
//     },


// }


// const User = require("../models/User");
// const CryptoJS = require('crypto-js');

// module.exports = {
//     updateUser: async (req, res) => {
//         if (req.body.password) {
//             req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
//         }
//         try {
//             const updatedUser = await User.findByIdAndUpdate(
//                 req.user.id, {
//                 $set: req.body
//             }, { new: true });
//             const { password, __v, createdAt, ...others } = updatedUser._doc;

//             res.status(200).json({ ...others });
//             // res.status(200).json(updatedUser);
//         } catch (err) {
//             res.status(500).json(err)
//         }
//     },

//     deleteUser: async (req, res) => {
//         try {
//             await User.findByIdAndDelete(req.user.id)
//             res.status(200).json("Successfully Deleted")
//         } catch (error) {
//             res.status(500).json(error)
//         }
//     },


// }


const User = require("../models/User");
const bcrypt = require('bcrypt');

module.exports = {
    updateUser: async (req, res) => {
        try {
            if (req.body.password) {
                // Generate a salt
                const salt = await bcrypt.genSalt(10);
                // Hash the password along with the salt
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await User.findByIdAndUpdate(
                req.user.id,
                { $set: req.body },
                { new: true }
            );

            const { password, __v, createdAt, ...others } = updatedUser._doc;
            console.log(others);
            res.status(200).json({ ...others });
            console.log("User Udated");
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.user.id);
            res.status(200).json("Successfully Deleted");
            console.log("User Deleted");
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
};
