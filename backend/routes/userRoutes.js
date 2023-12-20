const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", authMiddleware, userController.getUsers);
router.get("/users/:userId", authMiddleware, userController.getUserDetails);
router.put("/users/:userId", authMiddleware, userController.updateUser);
router.delete("/users/:userId", authMiddleware, userController.deleteUser);

module.exports = router;
