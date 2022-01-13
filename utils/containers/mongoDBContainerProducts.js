const Products = require('../../models/products');

class MongoDBContainerProducts{
    constructor(){

    }

    async save(product){
        let productSaved = await Products.create(product);
        console.log("guardado mongoose: ", productSaved);
        return productSaved;
    }

    async getAll(){
        return await Products.find();;
    }

    async getById(id){
        let product = await Products.findOne({_id:id});
        if(product == null){
            throw new Error(`El producto con el id: ${id}, no se encuentra.`);
        }

        return product;
    }

    async update(product){
        return await Products.updateOne({_id:product.id}, product);
    }

    async delete(id){
        return await Products.deleteOne({_id:id});
    }
}

module.exports = MongoDBContainerProducts