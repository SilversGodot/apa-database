import { Request, Response } from 'express';
import { User } from '../database/models/user';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'passport/secrets';

export class UserController {
    public registerUser (req: Request, res: Response, next: any) {
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

    public authenticateUser (req: Request, res: Response, next: any) {
        passport.authenticate('local-sign-in', function(err: any, user: any, info: any) {
            req.logIn(user, function(err) {
                if (err) {
                    return res.status(400).json({ errors: err });
                }

                const body = { _id: user.id };
                const token = jwt.sign({ user: body}, JWT_SECRET);
                return res.status(200).json({ token });
            });
            
        })(req, res, next);
    };
}