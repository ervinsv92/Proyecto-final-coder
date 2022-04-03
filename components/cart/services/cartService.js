const {config} = require("../../../config");
const FileContainerCart = require('../../../utils/containers/fileContainerCarts');
const FirebaseContainerCart = require("../../../utils/containers/firebaseContainerCart");
const MongoDBContainerCart = require("../../../utils/containers/mongoDBContainerCart");

class CartService{
    constructor(){
        switch(config.dataConnection){
            case 'FILE':
                this.dataConnection = new FileContainerCart();
                break;
            case 'MONGO':
                this.dataConnection = new MongoDBContainerCart();
                break;
            case 'FIREBASE':
                this.dataConnection = new FirebaseContainerCart();
                break;
        }
    }

    async createCart(idUser){
        return this.dataConnection.createCart(idUser);
    }

    async getCartById(id){
        return this.dataConnection.getCartById(id);
    }

    async getCartIdByIdUser(id_user){
        return this.dataConnection.getCartIdByIdUser(id_user);
    }

    async getProductsCartById(id){
        return this.dataConnection.getProductsCartById(id);
    }

    async addProductToCart(idCart, idProduct){
        return this.dataConnection.addProductToCart(idCart, idProduct);
    }

    async delete(id){
        return this.dataConnection.delete(id);
    }

    async deleteProductFromCart(idCart, idProduct){
        return this.dataConnection.deleteProductFromCart(idCart, idProduct);
    }
}

module.exports = CartService;