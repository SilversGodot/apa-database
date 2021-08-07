import { NextFunction, Request, Response } from "express";
import passport from "passport";
import "./setup";

export class Auth {
    public authenticateJWT(req: Request, res: Response, next: NextFunction) {
        passport.authenticate("jwt", function (err, user, jwtToken) {
          if (err) {
            console.log(err);
            return res.status(401).json({ status: "error", code: "unauthorized" });
          }
          if (!user) {
            return res.status(401).json({ status: "error", code: "unauthorized" });
          } else {
            return next();
          }
        })(req, res, next);
    }

    public authenticateAdminJWT(req: Request, res: Response, next: NextFunction) {
      passport.authenticate("admin-jwt", function (err, admin, jwtToken) {
        if (err) {
          console.log(err);
          return res.status(401).json({ status: "error", code: "unauthorized" });
        }
        if (!admin) {
          return res.status(401).json({ status: "error", code: "unauthorized" });
        } else {
          return next();
        }
      })(req, res, next);
  }
}