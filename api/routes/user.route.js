import express from "express";
import { deleteUser, getUser, updateProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.put("/:id", verifyToken, updateProfile);
router.get("/:id", getUser);


export default router;