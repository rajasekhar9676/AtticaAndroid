
const multer = require('multer');
const path = require('path');
const Product = require('../models/productModel'); // Adjust the path as necessary




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
        const { name, description, price, category, weights } = req.body;
        let imagePath = req.body.image; 

        if (req.file) {
            imagePath = req.file.filename;
        } else if (!imagePath || !imagePath.startsWith('http')) {
            return res.status(400).json({ message: 'Image upload failed or invalid image URL' });
        }

        // Ensure weights is an array and has values
        if (!Array.isArray(weights) || weights.length === 0) {
            return res.status(400).json({ message: 'Weights data is required and must be an array.' });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            image: imagePath,
            category,
            weights,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all products, with optional filtering by category
const getAllProducts = async (req, res) => {
    try {
        const { category } = req.query;
        let filter = {};

        if (category) {
            filter.category = category;
        }

        const products = await Product.find(filter);
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
        const { name, description, price, image, category, weights } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, image, category, weights },
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
    deleteProductById,
};
