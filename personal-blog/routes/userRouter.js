import { Router } from "express";

import { UserController } from "../controllers/userController.js";
import { basicAuthMiddleware } from "../middlewares/authMiddleware.js";

export const userRouter = Router();

userRouter.get("/home", UserController.getHomePage);

userRouter.get("/admin", basicAuthMiddleware, UserController.getAdminHomePage);