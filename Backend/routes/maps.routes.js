import { Router } from "express";
import { AuthUser } from "../middlewares/auth.middlewares.js";
import { GetAutoCompleteSuggestions, GetCoordinates, GetDistanceTime } from "../controllers/maps.controller.js";
import {query} from "express-validator"

export const MapRouter = Router();

MapRouter.get("/getcoordinates",query("address").isString().isLength({min:3}), AuthUser, GetCoordinates )
MapRouter.get("/getdistancetime", query("origin").isString().isLength({min:3}),
    AuthUser, GetDistanceTime )
MapRouter.get("/getsuggestion", query("input").isString().isLength({min:3}), AuthUser, GetAutoCompleteSuggestions )