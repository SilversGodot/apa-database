import { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { User } from '../database/models';

export class UserController {
    public getUsers (req: Request, res: Response) {
        User.find({})
            .then((users: any[]) => res.send(users))
            .catch((error: any) => console.log(error));
    }

    public getUser (req: Request, res: Response) {
        User.find({_id: req.params.userId})
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
        const usertoken = req.headers.authorization?.split(' ')[1];
        if (usertoken) {
            const decoded = jwt.verify(usertoken, config.jwt.secret);
            const tokenUserId = JSON.parse(JSON.stringify(decoded)).sub;
            const match = req.params.userId === tokenUserId;
            if (match) {
                User.findOne({_id: tokenUserId})
                .then((user: any) => res.send(user))
                .catch((error: any) => console.log(error));
            }
            else {
                res.status(400).json({ message: "Wrong user" });
            }
        }
        else {
            res.status(400).json({ errors: "No token found" });
        }
    }

    public signIn (req: Request, res: Response, next: any) {
        passport.authenticate('local-sign-in', function(err: any, user: any, info: any) {
            req.logIn(user, function(err) {
                if (err) {
                    return res.status(400).json({ errors: err });
                }

                const body = {
                    username: user.username, 
                    email: user.email, 
                    admin: user.admin
                };

                const token = jwt.sign({
                    sub: user._id,
                    user: body, 
                }, 
                config.jwt.secret, 
                { expiresIn: '24h' });
                
                return res.status(200).json({ token });
            });
            
        })(req, res, next);
    };

    public signOut (req: Request, res: Response, next: any) {
        req.logout();
        return res.send({ authenticated: req.isAuthenticated() });
    }
}
