const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'too short Product Title'],
        maxlength: [50, 'too long Product Title'],
    },

    slug: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'too short Product Slug'],
        maxlength: [50, 'too long Product Slug'],
        lowercase: true,
    },

    description: {
        type: String,
        required: [true, 'Product Description is required'],
        minlength: [10, 'too short Product Description'],
        maxlength: [500, 'too long Product Description'],
    },

    quantity: {
        type: Number,
        required: [true, 'Product Quantity is required'],
        min: [1, 'Product Quantity must be at least 1'],
    },

    sold: {
        type: Number,
        default: 0,
    },

    price: {
        type: Number,
        required: [true, 'Product Price is required'],
        trim: true,
        min: [1, 'Product Price must be at least 1'],
    },

    priceAfterDiscount: {
        type: Number,
        trim: true,
        min: [1, 'Product Price After Discount must be at least 1'],
    },

    colors: [String],

    imageCover: {
        type: String,
        required: [true, 'Product Image Cover is required'],
    },

    images: [String],

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Product Category is required'],
    },

    subcategories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
    },

    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    },

    ratingsAverage: {
        type: Number,
        min: [1, 'Rating must be above or equal 1.0'],
        max: [5, 'Rating must be below or equal 5.0'],
    },

    ratingsQuantity: {
        type: Number,
        default: 0,
    },
},{timestamps: true});

module.exports = mongoose.model('Product', productSchema);