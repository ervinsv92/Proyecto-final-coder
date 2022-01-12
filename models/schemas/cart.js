const Joi = require('joi');

const {productsSchema} = require('./products');
let timestamps = Joi.number().min(3);

const cartSchema = {
    timestamps:timestamps.required(),
    products: [],
}

module.exports = {cartSchema}