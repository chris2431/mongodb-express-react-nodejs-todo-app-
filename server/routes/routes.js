import express from "express";
import passport from "passport";
const router = express.Router();
import controller from "../controllers/controllers.js";

router.get("/", passport.authenticate("jwt", { session: false, failureRedirect: "/failure-auth" }), controller.home);

router.get("/failure-auth", controller.failureRoute);

router.get("/todos", passport.authenticate("jwt", { session: false, failureRedirect: "/failure-auth" }), controller.get);

router.post("/todos", passport.authenticate("jwt", { session: false, failureRedirect: "/failure-auth" }), controller.post);

router.delete("/todos", passport.authenticate("jwt", { session: false, failureRedirect: "/failure-auth" }), controller.delete);

router.put("/todos", passport.authenticate("jwt", { session: false, failureRedirect: "/failure-auth" }), controller.put);

// REGISTER/LOGIN ROUTES

router.post("/register", controller.registerPost);

router.post("/login", controller.loginPost);

export default router;
