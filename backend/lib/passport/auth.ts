import { NextFunction, Request, Response } from "express";
import passport from "passport";
import "./passportHandler";

export class Auth {
  public authenticateJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", function (err, user, jwtToken) {
      if (err) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      }
      if (!user) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      } else {
        req.app.locals.dbUser = user;
        return next();
      }
    })(req, res, next);
  }

  public authorizeAdmin(req: Request, res: Response, next: NextFunction){
    const user = req.app.locals.dbUser;
    if(user.role == "admin") {
      return next();
    } else {
      return res.status(401).json({ status: "error", code: "unauthorized" });
    }
  }
}