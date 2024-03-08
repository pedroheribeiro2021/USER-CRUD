import { Request, Response } from "express"
import OrderService from "../database/schemas/os"
import User from "../database/schemas/user"

class OrderServiceController {
  async create(req: Request, res: Response) {
    try {
      const userId = req.user.id
      const technicianId = req.body.responsible_technician

      const technician = await User.findById(technicianId)
      if (!technician) {
        return res.status(404).send({ error: "Technician not found" })
      }

      const orderServiceData = {
        ...req.body,
        createdBy: userId,
        responsible_technician: technicianId,
      }
      const newOrderService = await OrderService.create(orderServiceData)

      return res.json(newOrderService)
    } catch (error) {
      return res.status(500).send({
        error: "Failed to create service order",
        message: error,
      })
    }
  }

  async list(req: Request, res: Response) {
    try {
      const ordersServices = await OrderService.find().populate(
        "responsible_technician",
        "name",
      )

      res.status(200).json(ordersServices)
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Error listing orders", message: error })
    }
  }

  async listByTechnician(req: Request, res: Response) {
    try {
      const technicianId = req.params.id

      const orders = await OrderService.find({
        responsible_technician: technicianId,
      })
        .populate("createdBy", "name")
        .populate("responsible_technician", "name")

      if (orders.length === 0) {
        return res
          .status(404)
          .json({ message: "No orders found for this technician" })
      }
      return res.status(200).json(orders)
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error fetching orders", message: error })
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
