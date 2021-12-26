import express from "express";
import { logUser } from "../Controllers/log.controller.js";

const logRoutes = express.Router();

logRoutes.post("/",logUser);

export default logRoutes;

