let express = require("express");
let cors = require("cors");
//const session = require('express-session');
//let passport = require('passport');
//const passportStrategy  = require('passport-local').Strategy;
let serverRouter = require("./routes");
let {config} = require("./config");
//const {isValidPassword, createHash} = require('./utils/bcrypt');
//const MongoDBContainerUsers = require('./utils/containers/mongoDBContainerUsers');
const existsRouteMiddleware = require("./utils/middleware/general/existsRouteMiddleware");
const PORT = config.port;
const app = express();

//Middlewares
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

// app.use(session({
//     secret: "secret123",
//     cookie:{
//         httpOnly: false,
//         secure: false,
//         maxAge: 60000
//     },
//     resave:false,
//     saveUninitialized:false
// }));

// let dataConnection;
// switch(config.dataConnection){
//     case 'FILE':
//         //this.dataConnection = new FileContainerProducts();
//         break;
//     case 'MONGO':
//         dataConnection = new MongoDBContainerUsers();
//         break;
//     case 'FIREBASE':
//         //this.dataConnection = new FirebaseContainerProduct();
//         break;
// }

// passport.use('login', new passportStrategy (
//     (username, password, done)=>{
        
//         (async ()=>{
//             console.log('login 132')
//             try {
//                 const user = await dataConnection.getByEmail(username);
//                 if (user){
    
//                     if(!isValidPassword(user, password)){
//                         console.log("Contraseña incorrecta")
//                         return done(null, false)
//                     }
    
//                     return done(null, user)
//                 }else{
//                     console.log("No se encuentra el usuario")
//                     return done(null, false)
//                 }
//             } catch (error) {
//                 console.log("Error: ", error);
//                 return done(null, false);
//             }
//         })()
//     }
// ))

// passport.use('register', new passportStrategy ({passReqToCallback:true},
//     async function(req, username, password, done){
//         console.log("registro: ",req.body);
//         try {
//             const user = await dataConnection.getByEmail(username);
//             console.log("registro: ",req.body);
//             //console.log("Usuario: ", user)
//             if (!user){
//                 let newUser = {
//                     username, 
//                     password:createHash(password)
//                 }
//                 const userSaved = await dataConnection.save(newUser);
//                 return done(null, userSaved)
//             }else{
//                 console.log("El usuario ya está registrado")
//                 return done(null, false)
//             }
//         } catch (error) {
//             console.log("Error: ", error);
//             return done(null, false);
//         }
//     }
// ))

// passport.serializeUser((user, done)=>{
//     console.log("serializo: ", user)
//     done(null, user.email);
// })

// passport.deserializeUser(async (email, done)=>{
//     console.log("de serializo")
//     const user = await dataConnection.getByEmail(email);
//     done(null, user);
// });

// app.use(passport.initialize());
// app.use(passport.session());

//Routes
serverRouter(app);

//Debe ir al final de todas las rutas, ya que sino entra en ninguna de ellas entra en este middleware
app.use(existsRouteMiddleware);

app.listen(PORT, ()=>{
    console.log(`Conectado a http://localhost:${PORT}`);
})