import express from 'express'
import { registerController } from '../controllers/authController.js';

// Router Object
const router = express.Router()

// Router
router.post('/register', registerController);


// Export
export default router;