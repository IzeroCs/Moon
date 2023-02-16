import mongoose from "mongoose"
import Logger from "../utils/Logger"

const logger = Logger.create("DatabaseConnect")

export default function () {
  mongoose.set("strictQuery", false)
  mongoose.connect("mongodb://localhost:27017/moon")
  mongoose.connection.on("connected", () => logger
    .debug("Connected to database successfully"))
  mongoose.connection.on("error", (err) => logger
    .err("Error while connection to database: " + err))
  mongoose.connection.on("disconnected", () => logger
    .err("MongoDB connection disconnected"))
}
