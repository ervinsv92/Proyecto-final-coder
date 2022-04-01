const Cart = require('../../models/cart');
const Products = require('../../models/products');

class MongoDBContainerCart{

    constructor(){}

    async createCart(){
        let cart = {
            timestamps:Date.now(),
            products:[]
        }
        const cartCreated = await Cart.create(cart);
        return cartCreated._id;
    }

    async getProductsCartById(id){
        const cart = await Cart.findOne({_id:id});
        if(cart === null){
            throw new Error(`El cart con el id: ${id}, no se encuentra.`);
        }
        return cart.products;
    }

    async addProductToCart(idCart, idProduct){
        const cart = await Cart.findOne({_id:idCart});
        const product = await Products.findOne({_id:idProduct});
        
        if(cart === null){
            throw new Error(`El cart con el id: ${idCart} no se encuentra.`);
        }else if(product === null){
            throw new Error(`El product con el id: ${idProduct} no se encuentra.`);
        }
        let newProduct = {...product._doc, _id:idProduct};
        cart.products.push(newProduct);
        const cartUpdated = await Cart.updateOne({_id:idCart}, cart);  
        
        return cartUpdated || null;
    }

    async delete(id){
        const cart = Cart.findOne({_id:id});
        if(cart === null){
            throw new Error(`El cart con el id: ${id} no se encuentra.`);
        }

        const cartEliminated = await Cart.findOneAndDelete({_id:id});
        return cartEliminated;
    }

    async deleteProductFromCart(idCart, idProduct){
        const cart = await Cart.findOne({_id:idCart});
        if(cart === null){
            throw new Error(`El cart con el id: ${idCart} no se encuentra.`);
        }

        const productEliminated = cart.products.find(x=> x._id === idProduct);
        cart.products = cart.products.filter(x=> x._id !== idProduct);
        const cartUpdated = await Cart.updateOne({_id:idCart}, cart);
        
        return productEliminated;
    }
}

module.exports = MongoDBContainerCart;