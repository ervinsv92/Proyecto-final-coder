const jwt = require('jsonwebtoken');
const config = require('../../config/index');

class JsonWebToken{
    createToken(user){
        const token = jwt.sign({
            id: user._id,
            email:user.email,
            urlAvatar:user.urlAvatar
        }, String(config.jwtKey));

        return token;
    }

    verifyToken(token){
        let user = null;
        try {
            user = jwt.verify(token, String(config.jwtKey));    
        } catch (error) {
            console.log(error);
        }
        return user;
    }
}

module.exports = new JsonWebToken();