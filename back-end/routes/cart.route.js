const express=require('express');

let cartRouter=express.Router();

cartRouter.post("/add",async (req,res)=>{
    try{
        const {productID,Quanity,userID}=req.body;
    }