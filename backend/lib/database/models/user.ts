import { Document, Schema, Model, model, Error } from "mongoose";
import bcrypt from "bcrypt-nodejs";

export interface IUser extends Document {
  username: string;
  password: string;
}

export const userSchema: Schema<IUser> = new Schema<IUser>({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true }
});


userSchema.pre("save", function save(next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(this.password, salt, (err: Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword: string, callback: any) {
  bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
    callback(err, isMatch);
  });
}

export const User: Model<IUser> = model<IUser>("User", userSchema);