const bcrypt = require("bcryptjs");
import User from '../database/models/user';
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport: any) {
    passport.serializeUser((user: any, done: any) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id: any, done: any) => {
        User.findById(id, (err: any, user: any) => {
            done(err, user);
        });
    });
    
    // Local Strategy for registering a new user
    passport.use('local-register', new LocalStrategy({ usernameField: "username", passwordField: "password"}, (username: any, password: any, done: any) => {
            // Match User
            User.findOne({ username: username })
                .then((user: any) => {
                    // Create new User
                    if (!user) {
                        const newUser = new User({ username, password });
                        // Hash password before saving in database
                        bcrypt.genSalt(10, (err: any, salt: any) => {
                            bcrypt.hash(newUser.password, salt, (err: any, hash: any) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser.save()
                                    .then((user: any) => {
                                        return done(null, user);
                                    })
                                    .catch((err: any) => {
                                        console.log(err);
                                        return done(null, false, { message: err });
                                    });
                            });
                        });
                        // Return other user
                    } else {
                        return done(null, false, {message: "Username taken"});
                    }
                })
                .catch((err: any) => {
                    return done(null, false, { message: err });
                });
        })
    );

    passport.use('local-sign-in', new LocalStrategy({ usernameField: "username", passwordField: "password"}, (username: any, password: any, done: any) => {
        User.findOne({ username: username })
            .then((user: any) => {
                if (user) {
                    bcrypt.compare(password, user.password, (err: any, isMatch: any) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Wrong password" });
                        }
                    });
                }
                else {
                    return done(null, false, {message: "User does not exist"});
                }
            });
        })
    );
};