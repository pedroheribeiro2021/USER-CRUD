import express from "express"
import mongoose from "mongoose"
import routes from "./routes/user.routes"
import dotenv from "dotenv"

dotenv.config()

const app = express()

mongoose.connect(String(process.env.MONGODB_URI))

app.use(express.json())
app.use(routes)

app.listen(parseInt(process.env.PORT || "3000"), () => {
  console.log("server is runing")
})
