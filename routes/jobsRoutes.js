import express from 'express'
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController, deleteJobController, getAllJobsController, updateJobController } from '../controllers/jobController.js';

const router = express.Router();

// Create job route || POST
router.post('/create-job', userAuth, createJobController);

// Get all Job Routes || GET
router.get('/get-jobs', userAuth, getAllJobsController);

// Update Jobss Routes || PUT
router.put('/update-job/:id', userAuth, updateJobController);

// Delete Jobss Routes || DELETE
router.delete('/delete-job/:id', userAuth, deleteJobController);


export default router;


