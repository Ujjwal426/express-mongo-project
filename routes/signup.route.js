import express from "express";
import { addUser } from "../Controllers/sign.controllers.js";

const signRoutes = express.Router();

signRoutes.post("/", addUser);

export default signRoutes;