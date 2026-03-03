import express from "express";
import {login,register, updateprofile } from "../controllers/user.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";



const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated,updateprofile);
export default router;