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
        passport.authenticate('local', function(err: any, user: any, info: any) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            if (!user) {
                return res.status(400).json({ errors: "No user found" });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return res.status(400).json({ errors: err });
                }
                return res.status(200).json({ success: `logged in ${user.id}` });
            });
        })(req, res, next);
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