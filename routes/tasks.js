const express = require("express");
const router = express.Router();

const {getAllTasks,getTask,updateTask,deleteTask,createTask} = require("../controllers/tasks");
const {isLoggedIn} = require('../middleware/loginChecker');

router.route("/")
.get(isLoggedIn, getAllTasks)
.post(isLoggedIn, createTask);

router.route("/:id")
.get(isLoggedIn, getTask)
.patch(isLoggedIn, updateTask)
.delete(isLoggedIn, deleteTask);

module.exports=router;