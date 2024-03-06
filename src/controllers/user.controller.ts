import { Request, Response } from "express"
import User from "../database/schemas/user"
import createSessionService from "../services/createSesseion.service"

class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body
    try {
      const userExist = await User.findOne({ email })

      if (userExist) {
        return res.status(400).json({
          error: "Ops",
          message: "User already exists",
        })
      }

      const user = await User.create({
        name,
        email,
        password,
      })

      return res.json(user)
    } catch (error) {
      return res.status(500).send({ error: "Failed", message: error })
    }
  }

  async list(req: Request, res: Response) {
    try {
      const usuarios = await User.find()
      res.status(200).json(usuarios)
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Erro ao listar usuários", message: error })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    try {
      const user = await User.findByIdAndDelete(id)
      if (!user) {
        return res.status(404).send({ error: "User not found" })
      }

      return res.status(200).send({ message: "User deleted successfully" })
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Erro ao listar usuários", message: error })
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const updateData = req.body

    try {
      const user = await User.findByIdAndUpdate(id, updateData, { new: true })
      if (!user) {
        return res.status(404).send({ error: "User not found" })
      }

      return res.status(200).json(user)
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Erro ao listar usuários", message: error })
    }
  }
}

const userController = new UserController()
export default userController

export const createSessionController = async (req: Request, res: Response) => {
  try {
    const sessionData = req.body
    const token = await createSessionService(sessionData)
    return res.json(token)
  } catch (error) {
    console.log(error)
    return res.status(400).send({ error })
  }
}

//   export default createSessionController;
