const Cart = require('../../models/cart');
const Products = require('../../models/products');

class MongoDBContainerCart{

    constructor(){}

    async createCart(){
        
        // const list = await this.fileHelper.getAll() || [];
        // let cart = {}
        // cart.id = uuid();
        // cart.timestamp = Date.now();
        // cart.products = [];
        // list.push(cart)
        // await this.fileHelper.saveFile(list);
        // return cart.id;
        let cart = {
            timestamps:Date.now(),
            products:[]
        }
        const cartCreated = await Cart.create(cart);
        return cartCreated._id;
    }

    async getProductsCartById(id){
        // const list = await this.fileHelper.getAll() || [];
        // const cart = list.find(x=>x.id == id) || null;
        
        // if(cart == null){
        //     throw new Error(`El cart con el id: ${id}, no se encuentra.`);
        // }

        // return cart.products;
        const cart = await Cart.findOne({_id:id});
        if(cart === null){
            throw new Error(`El cart con el id: ${id}, no se encuentra.`);
        }
        return cart.products;
    }

    async addProductToCart(idCart, idProduct){
        // const list = await this.fileHelper.getAll() || [];
        // const listProducts = await this.fileHelperProducts.getAll() || [];
        // const idx = list.findIndex(x=>x.id == idCart);
        // const idxProduct = listProducts.findIndex(x=>x.id == idProduct);
        
        // if(idx == -1){
        //     throw new Error(`El cart con el id: ${cart.id} no se encuentra.`);
        // }else if(idxProduct == -1){
        //     throw new Error(`El product con el id: ${idProduct} no se encuentra.`);
        // }

        // const product = listProducts[idxProduct];

        // list[idx].products.push(product);
        // await this.fileHelper.saveFile(list);
        // return list[idx];
        
        const cart = await Cart.findOne({_id:idCart});
        const product = await Products.findOne({_id:idProduct});
        product.id = idProduct;
        console.log("agregar producto: ", product)
        if(cart === null){
            throw new Error(`El cart con el id: ${idCart} no se encuentra.`);
        }else if(product === null){
            throw new Error(`El product con el id: ${idProduct} no se encuentra.`);
        }

        cart.products.push(product);
        const cartUpdated = await Cart.updateOne({_id:idCart}, cart);  
        
        return cartUpdated || null;
    }

    async delete(id){
        // let list = await this.fileHelper.getAll() || [];
        // const idx = list.findIndex(x=>x.id == id);

        // if(idx == -1){
        //     throw new Error(`El cart con el id: ${id} no se encuentra.`);
        // }

        // const eliminate = list[idx];
        // list = list.filter(x => x.id != id);
        // await this.fileHelper.saveFile(list);
        // return eliminate;
        const cart = Cart.findOne({_id:id});
        if(cart === null){
            throw new Error(`El cart con el id: ${id} no se encuentra.`);
        }

        const cartEliminated = await Cart.findOneAndDelete({_id:id});
        return cartEliminated;
    }

    async deleteProductFromCart(idCart, idProduct){
        // let list = await this.fileHelper.getAll() || [];
        // const idx = list.findIndex(x=>x.id == idCart);

        // if(idx == -1){
        //     throw new Error(`El cart con el id: ${id} no se encuentra.`);
        // }

        // let eliminate = list[idx].products.find(x=>x.id == idProduct);
        // list[idx].products = list[idx].products.filter(x=>x.id != idProduct);
        
        // await this.fileHelper.saveFile(list);
        // return eliminate;
        const cart = await Cart.findOne({_id:idCart});
        if(cart === null){
            throw new Error(`El cart con el id: ${idCart} no se encuentra.`);
        }

        const productEliminated = cart.products.find(x=> x._id === idProduct);
        console.log("Prodiucts antes: ", cart.products)
        cart.products = cart.products.filter(x=> x._id !== idProduct);
        console.log("Prodiucts despues: ", cart.products)
        const cartUpdated = await Cart.updateOne({_id:idCart}, cart);
        //console.log("carrito con productos eliminados", cartUpdated)
        return productEliminated;
    }
}

module.exports = MongoDBContainerCart;