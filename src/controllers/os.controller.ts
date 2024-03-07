import { Request, Response } from "express"
import OrderService from "../database/schemas/os"

class OrderServiceController {
  async create(req: Request, res: Response) {
    try {
      const newOrderService = await OrderService.create(req.body)

      return res.json(newOrderService)
    } catch (error) {
      return res.status(500).send({ error: "Failed", message: error })
    }
  }

  async list(req: Request, res: Response) {
    try {
        const ordersServices = await OrderService.find()
    //   const ordersServices = await OrderService.find().populate(
    //     "createdBy",
    //     "name",
    //   )

      res.status(200).json(ordersServices)
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Erro ao listar usuários", message: error })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const order = await OrderService.findByIdAndDelete(req.params.id)
      if (!order) {
        return res.status(404).json({ message: "Order not found" })
      }
      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const order = await OrderService.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        },
      )
      if (!order) {
        return res.status(404).json({ message: "Order not found" })
      }
      return res.status(200).json(order)
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }
}

const orderServiceController = new OrderServiceController()
export default orderServiceController
