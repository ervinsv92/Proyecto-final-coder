const {db : firestoreDB} = require('../firebase');

const CART_COLLECTION = 'cart';
const PRODUCTS_COLLECTION = 'products';

class FirebaseContainerCart{
    constructor(){
        this.queryCart = firestoreDB.collection(CART_COLLECTION);
        this.queryProducts = firestoreDB.collection(PRODUCTS_COLLECTION);
    }

    async createCart(){   
        console.log("crear")     
        let id = this.queryCart.doc().id;
        let cart = {
            id,
            timestamps:Date.now(),
            products:[]
        }
        console.log("creat carrito")
        try {
            await this.queryCart.doc(id).set(cart);    
        } catch (error) {
            console.log(error)
        }
        
        return id;
    }

    async getCartById(id){      
        let doc = await this.queryCart.doc(id);
        let docTemp = await doc.get();
        let cart = await docTemp.data();
        
        if(cart === null){
            throw new Error(`El cart con el id: ${id}, no se encuentra.`);
        }    
      
        return cart;
    }

    async getProductsCartById(id){      
        let doc = await this.queryCart.doc(id);
        let docTemp = await doc.get();
        let cart = await docTemp.data();
        console.log("carrito productos: ", cart)
        if(cart === null){
            throw new Error(`El cart con el id: ${id}, no se encuentra.`);
        }    
      
        return cart.products;
    }

    async addProductToCart(idCart, idProduct){
        let docCart = await this.queryCart.doc(idCart).get();
        let cart = await docCart.data() || null;

        let docProduct = await this.queryProducts.doc(idProduct).get();
        let product = await docProduct.data() || null;

        if(cart === null){
            throw new Error(`El cart con el id: ${idCart} no se encuentra.`);
        }else if(product === null){
            throw new Error(`El product con el id: ${idProduct} no se encuentra.`);
        }

        cart.products.push(product);
        await this.queryCart.doc(idCart).set(cart);
        return cart;
    }

    async delete(id){
        let doc = await this.queryCart.doc(id).get();
        let cart = await doc.data();

        if(cart === null){
            throw new Error(`El cart con el id: ${id} no se encuentra.`);
        }

        doc.delete();
        return cart;
    }

    async deleteProductFromCart(idCart, idProduct){
        let docCart = await this.queryCart.doc(idCart).get();
        let cart = await docCart.data() || null;

        if(cart === null){
            throw new Error(`El cart con el id: ${idCart} no se encuentra.`);
        }

        cart.products = cart.products.filter(x=>x.id != idProduct);
        await this.queryCart.doc(idCart).set(cart);
        return cart;
    }
}

module.exports = FirebaseContainerCart;