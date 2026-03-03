// import express from "express";
// import {login,register, updateprofile } from "../controllers/user.controllers.js";
// import isAuthenticated from "../middlewares/isAuthenticated.js";



// const router = express.Router();

// router.route("/register").post(register);
// router.route("/login").post(login);
// router.route("/profile/update").post(isAuthenticated,updateprofile);
// export default router;


import express from "express";
import {login,register, updateprofile } from "../controllers/user.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";



const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated,updateprofile);

// use these things
// router.post('/register', register)

// router.post('/login', login)
// router.post('/profile/update', isAuthenticated, updateprofile)
export default router;