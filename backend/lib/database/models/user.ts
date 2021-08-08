import { Document, Schema, Model, model, Error } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    username: string;
    password: string;    
    email: string;
    email_is_verified: boolean;
    dateRegistered: Date,
    admin: boolean,
    role: string,
    comparePassword(candidatePassword: string, callback: any): any
}

// Create Schema
export const userSchema: Schema<IUser> = new Schema<IUser>(
{
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },    
    email: {
        type: String
    },
    email_is_verified: {
        type: Boolean,
        default: false
    },
    dateRegistered: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['guest', 'user', 'admin'],
        default: 'guest'
    }
});

userSchema.pre<IUser>("save", function save(next) {
    const user = this;
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }
      bcrypt.hash(this.password, salt, (err: Error, hash: any) => {
        if (err) { return next(err); }
        user.password = hash;
        next();
      });
    });
});

userSchema.methods.comparePassword = function (candidatePassword: string, callback: any) {
    bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
      callback(err, isMatch);
    });
};

export const User: Model<IUser> = model<IUser>("User", userSchema);