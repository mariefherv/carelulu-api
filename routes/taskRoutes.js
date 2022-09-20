const express = require("express");
const router = express.Router();

const taskControllers = require("../controllers/taskControllers");

const auth = require("../auth");

const { verify } = auth;

// view task
router.get("/viewAll", taskControllers.viewAll);

// view task
router.get("/view", verify, taskControllers.view);

// create task
router.post("/create", verify, taskControllers.create);

// edit task
router.post("/edit/:task_id", verify, taskControllers.edit);

// delete
router.delete("/delete/:task_id", verify, taskControllers.delete);

module.exports = router;