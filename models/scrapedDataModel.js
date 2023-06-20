const mongoose = require('mongoose');

const productMenuSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    type: String,
    size: String,
})

const Product = mongoose.model('Product', productMenuSchema);

module.exports = Product;