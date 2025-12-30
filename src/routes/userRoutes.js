const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const controller = require("../controllers/userController");

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/userget", auth, controller.getUser);
router.put("/userupdate", auth, controller.updateUser);
router.post("/logout", auth, controller.logout);

module.exports = router;
