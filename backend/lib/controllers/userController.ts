import { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../database/models/user';

import passportJwt from "passport-jwt";
const ExtractJwt = passportJwt.ExtractJwt;

export class UserController {
    public getUsers (req: Request, res: Response) {
        User.find({})
            .then((users: any[]) => res.send(users))
            .catch((error: any) => console.log(error));
    }

    public addUser (req: Request, res: Response, next: any) {
        passport.authenticate('local-register', function(err: any, user: any, info: any) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            if (!user) {
                return res.status(400).json({ errors: "No user found" });
            }
            else {
                User.findOneAndUpdate({'_id': user.id}, {email: req.body.email})
                .then((user: any) => res.send(user))
                .catch((error: any) => console.log(error));;
            }

        })(req, res, next);
    }

    public getCurrentUser (req: Request, res: Response, next: any) {
        try {
            const usertoken = req.headers.authorization?.split(' ')[1];
            if (usertoken) {
                const decoded = jwt.verify(usertoken, 'TopSecret');
                console.log(decoded);
            }
            else {
                console.log("empty");
            }
            
        } catch {
        }
        
        res.send(req.headers);
    }

    public signIn (req: Request, res: Response, next: any) {
        passport.authenticate('local-sign-in', function(err: any, user: any, info: any) {
            req.logIn(user, function(err) {
                if (err) {
                    return res.status(400).json({ errors: err });
                }
                const body = { username: user.username, email: user.email };
                const token = jwt.sign({ user: body }, "TopSecret");
                return res.status(200).json({ token });
            });
            
        })(req, res, next);
    };

    public signOut (req: Request, res: Response, next: any) {
        req.logout();
        // req.session.destroy(function (err: any) {
        //    if (err) { return next(err); }
        //    // The response should indicate that the user is no longer authenticated.
        return res.send({ authenticated: req.isAuthenticated() });
        //  });
    }
}
