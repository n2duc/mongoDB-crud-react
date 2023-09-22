const Product = require("../models/productModel");

const productController = {
    // ADD PRODUCT
    addProduct: async (req, res) => {
        try {
            const newProduct = new Product(req.body);
            const saveProduct = await newProduct.save();
            res.status(200).json(saveProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET ALL PRODUCT
    getAllProduct: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // GET AN PRODUCT
    getAProduct: async (req, res) => {
        const id = req.params.id;
        try {
            const products = await Product.findById(id);
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE PRODUCT
    deleteProduct: async (req, res) => {
        const result = await Product.findByIdAndDelete(req.params.id)
        res.json(result);
    },
    // UPDATE PRODUCT
    updateProduct: async (req, res) => {
        const id = req.params.id;
        const updateData = req.body;
        try {
            const product = await Product.findById(id);
            await product.updateOne({ $set: updateData })
            res.status(200).json(product);
        } catch(err) {
            res.status(500).json(err);
        }
    }
}

module.exports = productController;