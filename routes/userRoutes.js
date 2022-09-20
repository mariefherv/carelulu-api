const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");

//register
router.post("/register",userControllers.register);

// login
router.post("/login", userControllers.login);


module.exports = router;