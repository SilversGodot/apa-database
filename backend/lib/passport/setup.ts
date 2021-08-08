import { Authenticator } from 'passport';
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import { User } from '../database/models/user';
import config from '../config/config';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

module.exports = function(passport: Authenticator) {
    passport.serializeUser((user: any, done: any) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id: any, done: any) => {
        User.findById(id, (err: any, user: any) => {
            done(err, user);
        });
    });
    
    // Local Strategy for registering a new user
    passport.use('local-register', new LocalStrategy({ usernameField: "username", passwordField: "password"}, (username: string, password: string, done: any) => {
            // Match User
            User.findOne({ username: username })
                .then((user: any) => {
                    const newUser = new User({ username, password });
                    newUser.save()
                    .then((user: any) => {
                        return done(null, user);
                    })
                    .catch((err: any) => {
                        console.log(err);
                        return done(null, false, { message: err });
                    });
                })
                .catch((err: any) => {
                    return done(null, false, { message: err });
            });
        })
    );

    passport.use('local-sign-in', new LocalStrategy({usernameField: "username",passwordField: "password"}, (username: string, password: string, done: any) => {
        User.findOne({ username: username })
            .then((user: any) => {
                if (user) {
                    user.comparePassword(password, (err: Error, isMatch: boolean) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(undefined, user);
                          }
                          return done(undefined, false, { message: "Invalid username or password." });
                    });
                }
                else {
                    return done(undefined, false, { message: `username ${username} not found.` });
                }
            });
        })
    );

    passport.use('jwt', new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.jwt.secret
        }, 
        async function (jwtToken, done) {
            let user = await User.findOne({ username: jwtToken.user.username }).exec();
            if (user){
                return done(undefined, user, jwtToken);
            } else {
                return done(undefined, false);
            }
        }
    ));

    passport.use('admin-jwt', new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.jwt.secret
        }, 
        async function (jwtToken, done) {
            return done(undefined, jwtToken.user.admin, jwtToken);
        }
    ));
};