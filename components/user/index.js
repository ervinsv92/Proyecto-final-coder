let Router = require("express");
const router = new Router();
const userController = require("../user/controller/userController");

const userRouter = app =>{
    app.use("/api/users", router);
    router.get("/:id", userController.getById);
    router.post("/register", userController.register);
    router.post("/login", userController.login);
}

module.exports = userRouter;