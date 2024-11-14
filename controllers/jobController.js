import jobsModel from "../models/jobsModel.js";

// Create Job Post
export const createJobController = async (req, res, next) => {
    const { company, position } = req.body

    if (!company || !position) {
        next("Please provide company name and postion")
    }
    req.body.createdBy = req.user.userId;
    const job = await jobsModel.create(req.body);
    res.status(201).json({
        message: "Job post created",
        job
    })
};

// Get all Job Post
export const getAllJobsController = async (req, res, next) => {
    const jobs = await jobsModel.find({ createdBy: req.user.userId });
    res.status(201).json({
        message: "All jobs posts",
        totalJobs: jobs.length,
        jobs,
    })
};

// Update job post details
export const updateJobController = async (req, res, next) => {
    const { id } = req.params;
    const { company, position } = req.body;
    //Validate
    if (!company || !position) {
        return next("Please provide company and position for update")
    }
    // Find Job
    const job = await jobsModel.findOne({ _id: id });
    if (!job) {
        return next(`No job found in this ${id}`);
    }
    if (req.user.userId !== job.createdBy.toString()) {
        return next("You can not update this job");
    }
    // Update Job
    const updateJob = await jobsModel.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true, runValidators: true }
    );
    res.status(201).json({
        message: "Job details updated",
        updateJob
    })
};

// Delete Job Post
export const deleteJobController = async (req, res, next) => {
    const { id } = req.params;
    // find Job
    const job = await jobsModel.findOne({ _id: id })
    if (!job) {
        return next("Job post not found")
    }
    // Check if the current user is the creator of the job post
    if(req.user.userId !== job.createdBy.toString()){
        return next ("You Cannot delete this job post")
    }
    //  or use || await jobsModel.findByIdAndDelete(id);
    await job.deleteOne();

    res.status(200).json({
        message: "Job post deleted !"
    })
}


