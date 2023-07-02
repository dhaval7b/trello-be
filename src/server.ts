import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import mongoose from "mongoose";
// import User from "./models/user";
import * as usersController from "./controllers/users";
import * as boardsController from "./controllers/boards";
import bodyParser, { json } from "body-parser";
import authMiddleware from "./middlewares/auth";

import cors from "cors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req, res) =>{
    res.send("API is up");
});
//@ts-ignore
app.get("/api/boards/:boardId", authMiddleware, boardsController.getBoard)
// @ts-ignore
app.get("/api/boards", authMiddleware,  boardsController.getBoards);



app.post("/api/users/login", usersController.login);
app.post("/api/users", usersController.register);
// @ts-ignore
app.get("/api/user", authMiddleware, usersController.currentUser);
// @ts-ignore
app.post("/api/boards", authMiddleware, boardsController.createBoard)


io.on('connection',()=>{
    console.log("connect");
})

mongoose.connect('mongodb://localhost:27017/eltrello').then(()=>{
    console.log("connetced to database");
    httpServer.listen(4001,()=>{
        console.log(`api is listening on port 4001`)
    });
});

// const user = new User({email:'', username:"", password:""});
// user.save();
// if(user){
//     console.log("user: ", user)
// } else{
//     console.log("huh......")
// }

// user.validatePassword("");






