require("dotenv").config();

const config = {
    port:process.env.PORT || 8080,
    dataConnection:process.env.DATA_CONNECTION || 'FILE',
    fileProducts:process.env.FILE_PRODUCTS || 'products.txt',
    fileCart:process.env.FILE_CART || 'cart.txt',
    jwtKey:process.env.JWT_KEY || 'sd2f1s2df12sd1f21',
}

const configMongoDB ={
    mongoUri: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/',
    mongoDBName: process.env.MONGO_DB_NAME || 'proyectofinal'
}

module.exports = {config, configMongoDB};