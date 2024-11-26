
import express from "express";
import {
    getMyTodos,
    addTodo,
    updateTodo,
    removeTodo
} from "../controllers/todoController";

const router = express.Router();

router.get("/my-todos", getMyTodos);
router.post("/add-todo", addTodo);
router.put("/update/:id", updateTodo);
router.delete("/remove/:id", removeTodo);

export default router;