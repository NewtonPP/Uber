import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { ConnectToDb } from "./Database/db.js";
import { UserRouter } from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import { CaptainRouter } from "./routes/captain.routes.js";
import { MapRouter } from "./routes/maps.routes.js";
import { RideRouter } from "./routes/ride.routes.js";

dotenv.config();

export const app = express();
ConnectToDb()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/users",UserRouter)
app.use("/captain",CaptainRouter)
app.use("/maps", MapRouter)
app.use("/rides", RideRouter)