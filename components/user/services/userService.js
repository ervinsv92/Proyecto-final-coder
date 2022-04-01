const {config} = require("../../../config");
//const FileContainerProducts = require("../../../utils/containers/fileContainerProducts");
//const FirebaseContainerProduct = require("../../../utils/containers/firebaseContainerProduct");
const MongoDBContainerUsers = require("../../../utils/containers/mongoDBContainerUsers");

class ProductService{
    constructor(){
        switch(config.dataConnection){
            case 'FILE':
                //this.dataConnection = new FileContainerProducts();
                break;
            case 'MONGO':
                this.dataConnection = new MongoDBContainerUsers();
                break;
            case 'FIREBASE':
                //this.dataConnection = new FirebaseContainerProduct();
                break;
        }
    }

    async save(user){
        return this.dataConnection.save(user);
    }

    async getById(id){
        return this.dataConnection.getById(id);
    }

    async getByEmail(email){
        return this.dataConnection.getByEmail(email);
    }
}

module.exports = ProductService;