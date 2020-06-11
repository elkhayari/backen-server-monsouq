const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: false,
    },
    info: {
        type: String,
        required: false,
    },
    archive: {
        type: Boolean,
        default: false
    },
     stock: {
        type: Number,
        default: 0
    },

    date: {
        type: Date,
        default: Date.now
    },

},  {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
