import { Router } from "express"
import orderServiceController from "../controllers/os.controller"

const osRoutes = Router()

osRoutes.post("/os", orderServiceController.create)
osRoutes.get("/os", orderServiceController.list)
osRoutes.patch("/os/:id", orderServiceController.update)
osRoutes.delete("/os/:id", orderServiceController.delete)

export default osRoutes
