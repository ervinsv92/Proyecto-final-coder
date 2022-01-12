const Products = require('../../models/products');

class MongoDBContainerProducts{
    constructor(){

    }

    async save(product){
        let productSaved = await Products.create(product);
        console.log("guardado mongoose: ", productSaved);
        return productSaved;
        // const list = await this.fileHelper.getAll() || [];
        // product.id = uuid();
        // product.timestamp = Date.now();
        // list.push(product)
        // await this.fileHelper.saveFile(list);
        // return product;
    }

    async getAll(){
        let products = await Products.find();
        // const list = await this.fileHelper.getAll() || [];
        // return list;
        return products;
    }

    async getById(id){
        // const list = await this.fileHelper.getAll() || [];
        // const product = list.find(x=>x.id == id) || null;
        // console.log("pro: ", product)
        // if(product == null){
        //     throw new Error(`El producto con el id: ${id}, no se encuentra.`);
        // }

        // return product;
        let product = await Products.findOne({_id:id});
        if(product == null){
            throw new Error(`El producto con el id: ${id}, no se encuentra.`);
        }

        return product;
    }

    async update(product){
        // const list = await this.fileHelper.getAll() || [];
        // const idx = list.findIndex(x=>x.id == product.id);

        // if(idx == -1){
        //     throw new Error(`El producto con el id: ${product.id} no se encuentra.`);
        // }

        // list[idx] = product;
        // await this.fileHelper.saveFile(list);
        // return product;
        let productUpdated = await Products.updateOne({_id:product.id}, product);
        console.log("Producto actualizado: ", productUpdated)
        return productUpdated
    }

    async delete(id){
        // let list = await this.fileHelper.getAll() || [];
        // const idx = list.findIndex(x=>x.id == id);

        // if(idx == -1){
        //     throw new Error(`El producto con el id: ${id} no se encuentra.`);
        // }

        // const eliminate = list[idx];
        // list = list.filter(x => x.id != id);
        // await this.fileHelper.saveFile(list);
        // return eliminate;
        let productEliminated = await Products.deleteOne({_id:id});
        console.log("Producto eliminado: ", productEliminated)
        return productEliminated
    }
}

module.exports = MongoDBContainerProducts