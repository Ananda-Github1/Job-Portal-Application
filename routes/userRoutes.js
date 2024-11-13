import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { updateUserController } from "../controllers/userController.js";

// Router object
const router = express.Router();

// Routers

// Get User || Get

// Update USer || PUT
router.put('/update-user', userAuth, updateUserController);

export default router;