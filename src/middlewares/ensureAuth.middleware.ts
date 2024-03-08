import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import "dotenv"
import dotenv from "dotenv"
// import { AppError } from "../errors/AppError"

dotenv.config()

interface TokenPayload {
  id: string
}

export const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token = req.headers.authorization

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    })
  }

  token = token.split(" ")[1]

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded) => {
    if (error) {
      //   throw new AppError(error.message, 401)
      return res.status(401).send({ error })
    }
    const payload = decoded as TokenPayload

    req.user = {
      id: payload.id,
      token: String(token),
    }
    return next()
  })
}
