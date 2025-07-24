const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 */
router.get("/tasks", getTasks);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a task
 */
router.post("/tasks", createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 */
router.put("/tasks/:id", updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 */
router.delete("/tasks/:id", deleteTask);

module.exports = router;
