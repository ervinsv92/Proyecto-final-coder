const Joi = require('joi');

const {productsSchema} = require('./products');
let timestamps = Joi.number().min(3);
let idUser = Joi.string().min(3);

const cartSchema = {
    idUser:idUser.required(),
    timestamps:timestamps.required(),
    products: [],
}

module.exports = {cartSchema}