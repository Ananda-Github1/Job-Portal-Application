import express from 'express'
import { loginController, registerController } from '../controllers/authController.js';

// Router Object
const router = express.Router()

// Register Route || POST
router.post('/register', registerController);

// Loging Route || Post
router.post('/login', loginController);

// Export
export default router;