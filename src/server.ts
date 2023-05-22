import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import mongoose from "mongoose";
// import User from "./models/user";
import * as usersController from "./controllers/users";
import bodyParser, { json } from "body-parser";
import authMiddleware from "./middlewares/auth";
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req, res) =>{
    res.send("API is up");
})

app.post("/api/users/login", usersController.login);
app.post("/api/users", usersController.register);
app.get("/api/user", authMiddleware, usersController.currentUser);
// app.route("api/users/login").post(usersController.login);


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






