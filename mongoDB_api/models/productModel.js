const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    color: String,
    price: Number,
    brand: String,
})
const Product = mongoose.model("Product", productSchema);

module.exports = Product;