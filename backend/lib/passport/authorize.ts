import { NextFunction, Request, Response } from "express";
import passportJwt from "passport-jwt";
import jwt from 'jsonwebtoken';
import config from '../config/config';

module.exports = authorize;

function authorize(roles = []) {

}