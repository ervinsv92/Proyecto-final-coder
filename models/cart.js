const {mongoose} = require('../config/database');
const {cartSchema} = require('./schemas/cart');

const {Schema, model} = mongoose;

let cartSchemaModel = new Schema(cartSchema);
let Carts = new model('carts', cartSchemaModel);

module.exports = Carts;