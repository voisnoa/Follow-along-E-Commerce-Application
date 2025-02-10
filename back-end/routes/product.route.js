const express=require('express');
const multer=require('multer');
const path=require('path');
const { productModel } = require('../model/product.model');
// const { productModel } = require('../model/product.model');

let productRouter=express.Router();

productRouter.get("/",async (req,res)=>{
  try{
    const products=await productModel.find();
    res.send({"message":"Successfully fetched the products",data:products});
  }catch(error){
    console.log(error);
    res.send({"error-message":error});
  }
});   

productRouter.get("/:id",async (req,res)=>{
  let id=req.params.id;
  try{
    const product=await productModel.find(id);
    res.send({"message":"Successfully fetched the product",data:product});
  }catch(error){
    console.log(error);
    res.send({"error-message":error});
  }
}); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '././uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })

  productRouter.get("/",(req,res)=>{
    res.send({"msg":"Hello"})
  })

productRouter.post("/create",upload.array('productImage', 12),async(req,res)=>{

    try {
        const {productName, productDescription,productPrice}=req.body;

        const imgPaths=req.files.map((file)=>`/uploads/${file.filename}`);

        console.log(imgPaths)

        const newProduct=new productModel({
            productName, 
            productDescription,
            productPrice,
            productImage:imgPaths
        });

        await newProduct.save();
        res.json({"message":"Hurray! Successfully added the product on database"})
    } catch (error) {
        console.log(error);
        res.send({error});
    }

});

productRouter.delete("/product/:id", async(req,res)=>{
  let id = req.params.id

  try{
    let deleteProduct = await productModel.findByIdAndDelete(id);
    if(!deleteProduct){
      res.status(404).json({"Message":"Product Not Found"})
    }
    res.status(200).json({"Message":"Product successfully deleted"})
  }catch(error){
    res.status(500).json({ "error": error.message });
  }
})




module.exports={productRouter}