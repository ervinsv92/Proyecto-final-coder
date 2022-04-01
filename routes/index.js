const productRouter = require("../components/product");
const cartRouter = require("../components/cart");
const userRouter = require("../components/user");

const serverRouter = (app) =>{
    productRouter(app);
    cartRouter(app);
    userRouter(app);

    // app.get("/", (req, res, next)=>{
    //     res.json({message:'ok'});
    // });

    // app.get("/api/logout", (req, res) => {
    //     //let username = req.user.username;
    //     req.logout();
    //     //res.render("partials/logout", {username});
    //     res.json({message:'ok'});
    // });

    // app.post("/api/login", passport.authenticate('login', {failureRedirect:'/', successRedirect: '/',}), (req, res) => {
    //     //const {nombre} = req.body;
    //     console.log(req.body)
    //     //req.session.nombre = nombre;
    //     //res.json(req.body);
    //     res.json({message:'ok'});
    // });
    
    // //router.post("/signup", (req, res) => {
    // app.post("/api/register", passport.authenticate('register', {failureRedirect:'/'}), (req, res) => {
    //     console.log("registro prueba", req)
    //     //const {nombre} = req.body;
    //     //req.session.nombre = nombre;
    //     //const {username} = req.body
    //     //res.json(req.body);
    //     res.json({message:'ok'});
    // });
}

module.exports = serverRouter;