import express from 'express'
import { registerController } from '../controllers/authController.js';

// Router Object
const router = express.Router()

// Register Route || POST
router.post('/register', registerController);

// Loging Route || Post
router.post('/login');

// Export
export default router;