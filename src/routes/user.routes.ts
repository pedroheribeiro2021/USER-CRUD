import { Router } from "express"
import UserController, {
  createSessionController,
} from "../controllers/user.controller"

const userRoutes = Router()

userRoutes.post("/user", UserController.create)
userRoutes.get("/user", UserController.list)
userRoutes.delete("/user/:id", UserController.delete)
userRoutes.patch("/user/:id", UserController.update)

userRoutes.post("/login", createSessionController)

export default userRoutes
