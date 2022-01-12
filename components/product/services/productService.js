const {config} = require("../../../config");
const FileContainerProducts = require("../../../utils/containers/fileContainerProducts");
const MongoDBContainerProducts = require("../../../utils/containers/mongoDBContainerProducts");

class ProductService{
    constructor(){
        switch(config.dataConnection){
            case 'FILE':
                this.dataConnection = new FileContainerProducts();
                break;
            case 'MONGO':
                this.dataConnection = new MongoDBContainerProducts();
                break;
            case 'FIREBASE':
                break;
        }
    }

    async save(product){
        return this.dataConnection.save(product);
    }

    async getAll(){
        return this.dataConnection.getAll();
    }

    async getById(id){
        return this.dataConnection.getById(id);
    }

    async update(product){
        return this.dataConnection.update(product);
    }

    async delete(id){
        return this.dataConnection.delete(id);
    }
}

module.exports = ProductService;