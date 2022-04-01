const {mongoose} = require('../config/database');
const {usersSchema} = require('./schemas/users');

const {Schema, model} = mongoose;

let userSchemaModel = new Schema(usersSchema);
let Users = new model('users', userSchemaModel);

module.exports = Users;