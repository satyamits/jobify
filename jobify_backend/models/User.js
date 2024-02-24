const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        location: { type: String, required: false },
        isAdmin: { type: Boolean, default: false },
        isAgent: { type: Boolean, default: false },
        skills: { type: Array, default: false },
        profile: {
            type: String,
            required: true,
            default: "https://d326fntlu7tb1e.cloudfront.net/uploads/9948f698-1e4d-4cd2-84c0-a81a9911cc0a-facebook_circled_48px.png",

        }
    }, { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
