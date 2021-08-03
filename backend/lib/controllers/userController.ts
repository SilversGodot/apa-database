import { Request, Response } from 'express';
const passport = require('passport');
import User from '../database/models/user';

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
        console.log(req.session);
        console.log(req.isAuthenticated());
        console.log(req);
        res.send("Logged in as " + req.sessionID);
    }

    public signIn (req: Request, res: Response, next: any) {
        passport.authenticate('local-sign-in', function(err: any, user: any, info: any) {
            req.logIn(user, function(err) {
                if (err) {
                    return res.status(400).json({ errors: err });
                }
                return res.status(200).json({ success: `logged in ${user.id}` });
            });
            
        })(req, res, next);
    };

    public signOut (req: Request, res: Response, next: any) {
        req.logout();
        req.session.destroy(function (err) {
            if (err) { return next(err); }
            // The response should indicate that the user is no longer authenticated.
            return res.send({ authenticated: req.isAuthenticated() });
          });
    }
}


// export class UserController {
//     public login(req: Request, res: Response) {
//         passport.authenticate('local', function(err: any, user: any, info: any) {
//             if (err) {
//                 return res.status(400).json({errors: err});
//             }
//             if (!user) {
//                 return res.status(400).json({errors: 'No user foundd'});
//             }
//             req.logIn(user, function(err) {
//                 if (err) {
//                     return res.status(400).json({errors: err});
//                 }
//                 return res.status(200).json({success: `logged in ${user.id}`});
//             });
//         });
//     }
// }