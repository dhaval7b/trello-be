import { Request, Response, NextFunction } from "express-serve-static-core";
import BoardModel from '../models/board';
import board from "../models/user";
import { BoardDocument } from "../types/board.interface";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";
import { secret } from '../config';
import { response } from "express";
import { ExpressRequestInterface } from "../types/ExpressRequest.interface";


export const getBoards = async (req: ExpressRequestInterface, res: Response, next:NextFunction)=>{
    try{
        if(!req.user){
            return res.sendStatus(401);
        }
        const boards = await BoardModel.find({userId: req.user.id});
        console.log("boards called");
        res.send(boards);
    } catch(err){
        next(err);
    }
}

export const getBoard = async (req: ExpressRequestInterface, res: Response, next:NextFunction)=>{
    try{
        if(!req.user){
            return res.sendStatus(401);
        }
        const board = await BoardModel.findById(req.params.boardId);
        console.log("single board called")
        res.send(board);
    } catch(err){
        next(err);
    }
}


export const createBoard = async (req: ExpressRequestInterface, res: Response, next:NextFunction)=>{
    try{
        if(!req.user){
            return res.sendStatus(401);
        }
        const newBoard = new BoardModel({
            title : req.body.title,
            userId: req.user.id,
        })
        const savedBoard = await newBoard.save();
        res.send(savedBoard);
    } catch(err){
        next(err);
    }
}

