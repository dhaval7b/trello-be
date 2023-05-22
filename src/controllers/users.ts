import { Request, Response, NextFunction } from "express-serve-static-core";
import UserModel from '../models/user';
import user from "../models/user";
import { UserDocument } from "../types/user.interface";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";
import { secret } from '../config';
import { response } from "express";
import { ExpressRequestInterface } from "../types/ExpressRequest.interface";

const normalizeUser = (user:UserDocument)=>{
    const token = jwt.sign({id: user.id, email: user.id}, secret);
    return {
        email : user.email,
        username: user.username,
        id: user.id,
        token
    }
}
export const register = async (req: Request, res: Response, next:NextFunction)=>{
    try{
        const newUser = new UserModel({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });
        console.log("new user: ", newUser);
        const savedUser = await newUser.save();
        res.send(normalizeUser(savedUser));
    } catch(err){
        if(err instanceof Error.ValidationError){
            const messages = Object.values(err.errors).map(err=> err.message);
            return res.status(422).json(messages);

        }
        next(err);
    }
}

export const login = async ( req: Request, res: Response, next:NextFunction) => {
    try{
        const user = await UserModel.findOne({email: req.body.email});
        const errors = {emailOrPassword: "incorrect email or password"};
        if (!user){
            console.log("does not exist");
            return res.status(422).json();
        }
        console.log(user);
        res.send(normalizeUser(user));
    } catch(err){
        next(err);
    }
}

export const currentUser = async(req: ExpressRequestInterface, res: Response, next: NextFunction)=>{
    if (!req.user){
        return res.sendStatus(401);
    }
    res.send(normalizeUser(req.user))
};
