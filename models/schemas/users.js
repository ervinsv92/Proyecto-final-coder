const Joi = require('joi');

let id = Joi.string().min(3);
let email = Joi.string().min(3);
let password = Joi.string().min(3);
let name= Joi.string().min(3);
let address= Joi.string().min(3);
let age = Joi.number();
let phoneNumber= Joi.string().min(3);
let urlAvatar = Joi.string().min(3)
//let id= Joi.string().min(3);

const usersSchema = {
    email:email.required(),
    password: password.required(),
    name: name.required(),
    address: address.required(),
    age: age.required(),
    phoneNumber: phoneNumber.required(),
    urlAvatar: urlAvatar.required(),
}

module.exports = {usersSchema}