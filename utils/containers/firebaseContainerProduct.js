const {db : firestoreDB} = require('../firebase');

const PRODUCTS_COLLECTION = 'products';

class FirebaseContainerProduct{
    constructor(){
        this.query = firestoreDB.collection(PRODUCTS_COLLECTION);
    }

    async save(product){
        product.id = this.query.doc().id;
        await this.query.doc(product.id).set(product);
        return await this.getById(product.id);
    }

    async getAll(){
        const querySnapshot = await this.query.get();
        const list = querySnapshot.docs.map((doc)=>({
            id:doc.id,
            name:doc.data().name,
            code:doc.data().code,
            description:doc.data().description,
            image: doc.data().image,
            price:doc.data().price,
            stock:doc.data().stock
        }))
        return list;
    }

    async getById(id){
        const doc = this.query.doc(id);
        const productTemp = await doc.get();
        const product = await productTemp.data();
        if(product == null){
            throw new Error(`El producto con el id: ${id}, no se encuentra.`);
        }
        return product;
    }

    async update(product){
        const doc = this.query.doc(product.id);
        await doc.update(product);
        return await this.getById(product.id);
    }

    async delete(id){
        const doc = this.query.doc(id);
        const productEliminated = await this.getById(id);
        await doc.delete();
        return productEliminated;
    }
}

module.exports = FirebaseContainerProduct;