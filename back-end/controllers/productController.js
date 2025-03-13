
const Product = require("../models/product");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname); 
    },
});

const upload = multer({ storage: storage });


const createProduct = async (req, res) => {
    try {
        console.log("Received Data:", req.body); // Debugging log

        const { name, description, price, category, userEmail } = req.body;
        
        if (!name || !description || !price || !category || !req.files || !userEmail) {
            return res.status(400).json({ message: "All fields, images, and user email are required" });
        }

        const images = req.files.map(file => `uploads/${file.filename}`);

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            images,
            userEmail,
        });

        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating product" });
    }
};


// middleware to upload images
const uploadImages = upload.array("images"); 



//milestone 12
const getProducts = async (req, res) => {
    try {
        const { email } = req.query; // Get email from query params

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const products = await Product.find({ userEmail: email }); // Filter products by email
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products" });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Error fetching product" });
    }
};




const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id; // Get ID from URL params
        const updatedData = req.body;   // Use entire request body as update data

        if (!productId) {
            return res.status(400).json({ error: "Product ID is required" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updatedData,
            { new: true, runValidators: true } // Ensure validation runs
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ error: "Error updating product" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({ error: "Product ID is required" });
        }

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Error deleting product" });
    }
};


module.exports = { createProduct, uploadImages,getProducts, updateProduct, getProductById ,deleteProduct};
