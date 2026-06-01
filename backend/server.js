const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
const {chats} = require('./data')
const dotenv = require('dotenv');
dotenv.config();
app.get("/",(req,res)=>{
    res.send("Backend setup properly");
})
app.get("/api/v1/chat",(req,res)=>{
    res.send(chats);
})

app.get("/api/v1/chat/:id",(req,res)=>{
   let {id} = req.params;
   let userChat = chats.find((chat)=>chat._id == id)
   res.send(userChat)
})

app.listen(PORT,()=>{
    console.log(`Server is runing on PORT ${PORT}`);
})