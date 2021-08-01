const mongoose = require("mongoose");

// Create Schema
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        email_is_verified: {
            type: Boolean,
            default: false
        },
        password: {
            type: String
        },
        dateRegistered: {
            type: Date,
            default: Date.now
        }
    }
);

export default mongoose.model("User", UserSchema);