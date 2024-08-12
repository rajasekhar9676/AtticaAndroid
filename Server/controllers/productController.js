// const Product = require('../models/Product');
const Product=require('../models/productModel')
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save file with a unique name
    },
});

// Initialize multer with storage settings
const upload = multer({ storage: storage });

// Create a new product with image upload
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, image } = req.body;

        let imagePath = image; // Assume image is an external URL

        if (req.file) {
            // If there's an uploaded file, use the internal image path
            imagePath = req.file.filename;
        } else if (!image || !image.startsWith('http')) {
            // If there's no valid image provided, return an error
            return res.status(400).json({ message: 'Image upload failed or invalid image URL' });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            image: imagePath,
            category
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Create a new product
// const createProduct = async (req, res) => {
//     try {
//         const { name, description, price, image } = req.body;

//         const newProduct = new Product({
//             name,
//             description,
//             price,
//             image // Assuming this is a URL or base64 encoded string
//         });

//         const savedProduct = await newProduct.save();
//         res.status(201).json(savedProduct);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };



// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a product by ID
const updateProductById = async (req, res) => {
    try {
        const { name, description, price, image } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, image },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product by ID
const deleteProductById = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createProduct,
    upload,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
};



