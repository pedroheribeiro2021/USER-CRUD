import { Router } from "express"
import orderServiceController from "../controllers/os.controller"
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware"

const osRoutes = Router()

osRoutes.post("/os", ensureAuthMiddleware, orderServiceController.create)
osRoutes.get("/os", orderServiceController.list)
osRoutes.get(
  "/os/:id",
  ensureAuthMiddleware,
  orderServiceController.listByTechnician,
)
osRoutes.patch("/os/:id", ensureAuthMiddleware, orderServiceController.update)
osRoutes.delete("/os/:id", ensureAuthMiddleware, orderServiceController.delete)

export default osRoutes
