const express = require('express');
const app = express();
const mongoose = require('mongoose')
const PORT = 3001;

app.use(express.json())

let connection = mongoose.connect("mongodb+srv://malvan:fiba8830@malvan.c6y6w.mongodb.net/ecomdb")

app.get('/ping', (req, res) => {
  res.send('pong');
});


app.post("/create",async(req,res)=>{
  let payload = req.body;
  try{
      let new_user = new userModel(payload);
      await new_user.save();
  }catch(err){
    res.send({"error":err})
}})


app.listen(PORT,async()=>{
  try{
      await connection;
      console.log("Successfully connected to MongoDB");
  } catch (error){
      console.log(error);
  }
  
      console.log(`Server is running on port ${PORT}`)
  })