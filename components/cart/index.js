let Router = require("express");
const router = new Router();
const cartController = require("../cart/controller/cartController");

const cartRouter = app =>{
    app.use("/api/cart", router);
    router.post("/", cartController.createCart);
    router.delete("/:id", cartController.delete);
    router.get("/:id/products", cartController.getProductsCartById);
    router.post("/:id/products", cartController.addProductToCart);
    router.delete("/:id/products/:id_prod", cartController.deleteProductFromCart);
    router.post("/:id_cart/create-order", cartController.createOrderFromCart);
    router.get("/:id_user/user", cartController.getCartIdByIdUser);
}

module.exports = cartRouter;