const UserController = require("../controllers/userController")
const router = require("express").Router();

router.post("/user", UserController.addUser);
router.get("/users", UserController.getUsers);
router.get("/user/:id", UserController.getUser);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.removeUser);

module.exports = router;