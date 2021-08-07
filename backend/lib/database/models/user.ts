import mongoose from "mongoose";

// Create Schema
const userSchema: mongoose.Schema = new mongoose.Schema(
{
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String
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
    },
    admin: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("User", userSchema);