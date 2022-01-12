const Joi = require('joi');

let id = Joi.string().min(3);
let name = Joi.string().min(3);
let code= Joi.string().min(3);
let description= Joi.string().min(3);
let price= Joi.number().min(3);
let stock= Joi.number().min(3);
let image= Joi.string().min(3);
//let id= Joi.string().min(3);

const productsSchema = {
    name:name.required(),
    code: code.required(),
    description: description.required(),
    price: price.required(),
    stock: stock.required(),
    image: image.required()
}

module.exports = {productsSchema}