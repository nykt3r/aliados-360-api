import { Router } from "express";
import { container } from "../../../../config/container";
import { UserController } from "../../controllers/v1/user.controller";

const router = Router();

// USERS
router.get("/", async (req, res) => {
  const controller = container.resolve<UserController>("userController");
  return controller.getAllUsers(req, res);
});

router.get("id/:id", async (req, res) => {
  //userId
  const controller = container.resolve<UserController>("userController");
  return controller.getUserById(req, res);
});

router.get("email/:email", async (req, res) => {
  //userEmail
  const controller = container.resolve<UserController>("userController");
  return controller.getUserByEmail(req, res);
});

router.post("/register", async (req, res) => {
  const controller = container.resolve<UserController>("userController");
  return controller.registerUser(req, res);
});

router.post("/login", async (req, res) => {
  const controller = container.resolve<UserController>("userController");
  return controller.loginUser(req, res);
});

export default router;
