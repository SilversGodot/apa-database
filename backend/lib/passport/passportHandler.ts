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
    passport.use('local-register', new LocalStrategy({ usernameField: "username", passwordField: "password"}, async(username: string, password: string, done: any) => {
        let user = await User.findOne({ username: username });
        if (user) {
            return done({ message: 'User already exisits!' }, null);
        } else {
            const newUser = new User({ username, password });
            await newUser.save()
            .then((user: any) => {
                return done(null, user);
            })
            .catch((err: any) => {
                return done({ message: err }, null);
            }); 
        }
    }));

    passport.use('local-sign-in', new LocalStrategy({usernameField: "username",passwordField: "password"}, async(username: string, password: string, done: any) => {
        let user = await User.findOne({ username: username });
        if(user) {
            user.comparePassword(password, (err: Error, isMatch: boolean) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                }
                return done({ message: "Invalid password." }, null);
            });
        } else {
            return done({ message: `username ${username} not found.` }, null);
        }
    }));

    passport.use('jwt', new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.jwt.secret
        }, 
        async function (jwtToken, done) {
            let user = await User.findOne({ username: jwtToken.user.username });
            if (user){
                return done(null, user, jwtToken);
            } else {
                return done({ message: "Invalid token." }, null, jwtToken);
            }
        }
    ));
};