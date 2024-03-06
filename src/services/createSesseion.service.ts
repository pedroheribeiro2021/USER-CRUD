import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import User from "../database/schemas/user"

dotenv.config()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createSessionService = async ({ email, password }: any) => {
  const user = await User.findOne({ email })
  console.log(user)
  if (!user) {
    throw new Error("Usuário e/ou senha inválidos")
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw new Error("Usuário e/ou senha inválidos")
  }

  const token = jwt.sign({ id: user._id }, String(process.env.SECRET_KEY), {
    expiresIn: "30m",
  })

  return {
    id: user._id,
    data_criacao: user.createdAt,
    token,
  }
}

export default createSessionService
