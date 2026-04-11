import express from "express";
import { isAuthenticated } from "../middlewares/isUserAuthenticated.js";
import { getCurrentUser, registerUser, signInUser, signOutUser, updateUser } from "../Controllers/UserController.js";

const Router  = express.Router();

Router.post("/register", registerUser);
Router.post("/signin", signInUser);
Router.post("/signout", signOutUser);
Router.get("/currentuser",isAuthenticated, getCurrentUser);
Router.put("/updateuser",isAuthenticated, updateUser);
export default Router;