import express from "express";
import {
  createIssue,
  deleteIssue,
  updateIssue,
  getIssues,
  
} from "../controllers/issue.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// router.post("/", verifyToken, createIssue);
router.post("/", createIssue);
router.delete("/:id", verifyToken, deleteIssue);
router.put("/:id", verifyToken, updateIssue);
router.get("/",   getIssues);



export default router;