import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Routes } from "./routes/apaRoutes";
const passport = require("passport");
const cookieParser = require('cookie-parser')

import { v4 as uuidv4 } from 'uuid';
const session = require('express-session')

const NAMESPACE = 'Server';

class App {
    public app: express.Application;
    public mongoUrl: string = 'mongodb+srv://apa-admin:nov11222@apa-database.hszts.mongodb.net/apa?retryWrites=true&w=majority';
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }

    private config(): void {
        //support application/x-www-form-urlencoded post data
        this.app.use(express.urlencoded({ extended:false }));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        require('./passport/setup')(passport);

        this.app.use(cookieParser('keyboard cat'));
        this.app.use(session({
            genid: (req: any) => {
              return uuidv4() // use UUIDs for session IDs
            },
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true
          }))
    }

    private mongoSetup(): void {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose.connect(this.mongoUrl)
        .then((result) => {
            console.log(NAMESPACE, 'Connected to MongoDB');
        })
        .catch((err) => {
            console.log(NAMESPACE, err);
        });
    }
}

export default new App().app;