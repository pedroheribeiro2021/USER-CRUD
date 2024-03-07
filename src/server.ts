import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes"
import osRoutes from "./routes/os.routes"

dotenv.config()

const app = express()

mongoose.connect(String(process.env.MONGODB_URI))

app.use(express.json())
app.use(userRoutes)
app.use(osRoutes)

app.listen(parseInt(process.env.PORT || "3000"), () => {
  console.log("server is runing")
})
