import { Router } from "express";
import { container } from "../../../../config/container";
import { UserController } from "../../controllers/v1/user.controller";
import { authenticateJWT } from "../../middlewares/auth.middleware";

const router = Router();

const userController = container.resolve<UserController>("userController");

// USERS
router.get("/", 
  authenticateJWT, 
  userController.getAllUsers
);

router.get("/id/:id", userController.getUserById);

router.get("/email/:email", userController.getUserByEmail);

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

export default router;
