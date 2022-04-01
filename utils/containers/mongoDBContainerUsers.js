const Users = require('../../models/users');

class MongoDBContainerUsers{
    constructor(){

    }

    async save(user){
        let userSaved = await Users.create(user);
        return userSaved;
    }

    async getById(id){
        let user = await Users.findOne({_id:id});
        if(user == null){
            throw new Error(`El usuario con el id: ${id}, no se encuentra.`);
        }

        return user;
    }

    async getByEmail(email){
        let user = await Users.findOne({email:email});
        if(user == null){
            throw new Error(`El usuario con el email: ${email}, no se encuentra.`);
        }

        return user;
    }
}

module.exports = MongoDBContainerUsers;