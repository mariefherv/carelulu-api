const express = require("express");
const auth = require("../auth");
const router = express.Router();

const taskControllers = require("../controllers/taskControllers");

const { verify } = auth;

// view task
router.get("/view", verify, taskControllers.view);

// create task
router.post("/create", verify, taskControllers.create);

// edit task
router.post("/edit/:task_id", verify, taskControllers.edit);

// mark task as done
router.put("/markDone/:task_id", verify, taskControllers.setStatus);

// delete
router.delete("/delete/:task_id", verify, taskControllers.delete);

module.exports = router;