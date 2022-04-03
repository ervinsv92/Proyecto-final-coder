//se impota el servicio de productos
const CartService = require("../services/cartService");
const UsersService = require("../../user/services/userService");
const twilio = require('../../../utils/twilio');
const config = require('../../../config');
const sendEmail = require('../../../utils/nodemailer')
const cartService = new CartService();
const usersService = new UsersService();

class CartController{
    async getProductsCartById(req, res, next){
        try {
            const {id} = req.params;
            let products = await cartService.getProductsCartById(id);
            res.json(products)
        } catch (error) {
            res.status(404).json({error:-3, description:error.message});
        }
    }

    async getCartIdByIdUser(req, res, next){
        try {
            const {id_user} = req.params;
            let idCart = await cartService.getCartIdByIdUser(id_user);
            res.json(idCart)
        } catch (error) {
            res.status(404).json({error:-3, description:error.message});
        }
    }

    async createCart(req, res, next){
        try {
            const {idUser} = req.body;
            let idCart = await cartService.createCart(idUser);    
            res.json(idCart)
        } catch (error) {
            console.error(error)   
        }
    }

    async delete(req, res, next){
        try {
            const {id} = req.params;
            
            if(id == undefined || id == ''){
                return res.status(400).json({error:-4, description:'El payload id es requerido y no puede estar vacio.'});
            }

            let cart = await cartService.delete(id);    
            res.json(cart)
        } catch (error) {
            res.status(404).json({error:-3, description:error.message});
        }
    }

    async addProductToCart(req, res, next){
        try {
            const {id = ''} = req.params;
            const {idProduct = ''} = req.body;
            
            if(id == undefined || id == ''){
                return res.status(400).json({error:-4, description:'El payload id es requerido y no puede estar vacio.'});
            }else if(idProduct == undefined || idProduct == ''){
                return res.status(400).json({error:-4, description:'El payload idProduct es requerido y no puede estar vacio.'});
            }

            let cart = await cartService.addProductToCart(id, idProduct);    
            res.json(cart)
        } catch (error) {
            res.status(404).json({error:-3, description:error.message});
        }
    }

    async deleteProductFromCart(req, res, next){
        try {
            const {id, id_prod} = req.params;
            
            if(id == undefined || id == ''){
                return res.status(400).json({error:-4, description:'El payload id es requerido y no puede estar vacio.'});
            }else if(id_prod == undefined || id_prod == ''){
                return res.status(400).json({error:-4, description:'El payload id_prod es requerido y no puede estar vacio.'});
            }

            let productEliminated = await cartService.deleteProductFromCart(id, id_prod);    
            res.json(productEliminated)
        } catch (error) {
            res.status(404).json({error:-3, description:error.message});
        }
    }

    async createOrderFromCart(req, res, next){
        try {
            const {id_cart} = req.params;
            
            
            if(id_cart == undefined || id_cart == ''){
                return res.status(400).json({error:-4, description:'El payload id_card es requerido y no puede estar vacio.'});
            }

            const cart = await cartService.getCartById(id_cart);
            const user = await usersService.getById(cart.idUser);
            
            let bodyOrder = '';
            let subject = `Nuevo pedido de ${user.name} - ${user.email}`;
            
            for(let product of cart.products){
                console.log(product);
                bodyOrder += `<p>Código: ${product.code}, Nombre: ${product.name}, Descripción: ${product.description}, Precio: ${product.price}</p></br>`
            }
            
            //Send email to admin
            await sendEmail(config.config.adminEmail,subject, bodyOrder);
            //Send message to admin
            await twilio.sendMessageWhatsapp(config.config.adminNumber,subject);
            //Send message to user
            await twilio.sendMessage(user.phoneNumber,'Su pedido ha sido recibido y se encuentra en proceso.');

            res.json({message:'Orden creada'})
        } catch (error) {
            console.log(error);
            res.status(404).json({error:-3, description:error.message});
        }
    }
}

module.exports = new CartController;