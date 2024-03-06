import { Router } from "express";
import UserController, { createSessionController } from "../controllers/user.controller";

const routes = Router();

routes.post("/user", UserController.create);
routes.get("/user", UserController.list);
routes.delete("/user/:id", UserController.delete);
routes.patch("/user/:id", UserController.update);

routes.post("/login", createSessionController);

export default routes;
