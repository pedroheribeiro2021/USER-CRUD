import express from "express";
import mongoose from "mongoose";
import routes from "./routes/user.routes";

const app = express();

mongoose.connect("mongodb://127.0.0.1/firstapi");

app.use(express.json());
app.use(routes)

app.listen(3000, () => {
  console.log("server is runing");
});
