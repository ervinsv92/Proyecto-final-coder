const {mongoose} = require('../config/database');
const {productsSchema} = require('./schemas/products');

const {Schema, model} = mongoose;

let productSchemaModel = new Schema(productsSchema);
let Products = new model('products', productSchemaModel);

module.exports = Products;