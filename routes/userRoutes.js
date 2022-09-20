const express = require("express");
const auth = require("../auth");
const router = express.Router();

const userControllers = require("../controllers/userControllers");

const { verify } = auth;

//get user details
router.get("/getUserDetails", verify, userControllers.getDetails);

//register
router.post("/register",userControllers.register);

// login
router.post("/login", userControllers.login);


module.exports = router;