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
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         status:
 *           type: string
 *           enum: [pending, in-progress, completed]
 *           description: The status of the task
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           description: The priority of the task
 *       example:
 *         id: "507f1f77bcf86cd799439011"
 *         title: "Complete project"
 *         description: "Finish the API documentation"
 *         status: "in-progress"
 *         priority: "high"
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retrieve a list of all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Internal server error"
 */
router.get("/tasks", getTasks);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *               description:
 *                 type: string
 *                 description: The description of the task
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *                 description: The status of the task
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 description: The priority of the task
 *             example:
 *               title: "New task"
 *               description: "Task description"
 *               status: "pending"
 *               priority: "medium"
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Title is required"
 *       500:
 *         description: Internal server error
 */
router.post("/tasks", createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *               description:
 *                 type: string
 *                 description: The description of the task
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *                 description: The status of the task
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 description: The priority of the task
 *             example:
 *               title: "Updated task"
 *               description: "Updated description"
 *               status: "completed"
 *               priority: "high"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Task not found"
 *       500:
 *         description: Internal server error
 */
router.put("/tasks/:id", updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the task to delete
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Task not found"
 *       500:
 *         description: Internal server error
 */
router.delete("/tasks/:id", deleteTask);

module.exports = router;
