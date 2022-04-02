//se impota el servicio de usuarios
const UsersService = require("../services/userService");
const usersService = new UsersService();
const jwt = require('../../../utils/jwt/jwt');
const {isValidPassword, createHash} = require('../../../utils/bcrypt');
const sendEmail = require('../../../utils/nodemailer');
const config = require('../../../config');

class UsersController{
    async getById(req, res, next){
        try {
            const {id} = req.params;
            let user = await usersService.getById(id);
            res.json(user)
        } catch (error) {
            res.status(404).json({error:-3, description:error.message});
        }
    }

    async register(req, res, next){
        try {
            const {email, password, name, address, age, phoneNumber, urlAvatar} = req.body;

            if(email == undefined || email == ''){
                return res.status(400).json({error:-4, description:'El payload email es requerido y no puede estar vacio.'});
            }else if(password == undefined || password == ''){
                return res.status(400).json({error:-4, description:'El payload password es requerido y no puede estar vacio.'});
            }else if(name == undefined || name == ''){
                return res.status(400).json({error:-4, description:'El payload name es requerido y no puede estar vacio.'});
            }else if(address == undefined || address == ''){
                return res.status(400).json({error:-4, description:'El payload address es requerido y no puede estar vacio.'});
            }else if(age == undefined || age == ''){
                return res.status(400).json({error:-4, description:'El payload age es requerido y no puede estar vacio.'});
            }else if(phoneNumber == undefined || phoneNumber == ''){
                return res.status(400).json({error:-4, description:'El payload phoneNumber es requerido y no puede estar vacio.'});
            }else if(urlAvatar == undefined || urlAvatar == ''){
                return res.status(400).json({error:-4, description:'El payload urlAvatar es requerido y no puede estar vacio.'});
            }
            const hashPassword = createHash(password);
            req.body.password = hashPassword;
            let user = await usersService.save(req.body);   
            
            let bodyEmail = `<p><strong>Correo:</strong>${user.email}</p>
                <p><strong>Nombre Usuario:</strong>${user.user}</p>
                <p><strong>Dirección:</strong>${user.address}</p>
                <p><strong>Edad:</strong>${user.age}</p>
                <p><strong>Teléfono:</strong>${user.phoneNumber}</p>
            `;

            sendEmail(config.config.adminEmail,'Nuevo Registro', bodyEmail);

            const token = jwt.createToken(user);
            res.json({status:true, token});
        } catch (error) {
            console.error(error)   
            return res.status(400).json({status:false, message:'Ups, ocurrio un error'});
        }
    }

    async login(req, res, next){
        try {
            const {email, password} = req.body;
            let user = await usersService.getByEmail(email);
            if (user){
    
                if(!isValidPassword(user, password)){
                    console.log("Contraseña incorrecta")
                    return res.status(400).json({status:false, message:'Usario no encontrado'});
                }
                
                const token = jwt.createToken(user);
                res.json({status:true, token});
            }else{
                console.log("No se encuentra el usuario")
                return res.status(400).json({status:false, message:'Usario no encontrado'});
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json({status:false, message:'Ups, ocurrio un error'});
        }
    }
}

module.exports = new UsersController;