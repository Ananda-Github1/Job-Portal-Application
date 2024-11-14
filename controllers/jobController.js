import mongoose from "mongoose";
import jobsModel from "../models/jobsModel.js";
import moment from 'moment';

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
    if (req.user.userId !== job.createdBy.toString()) {
        return next("You Cannot delete this job post")
    }
    //  or use || await jobsModel.findByIdAndDelete(id);
    await job.deleteOne();

    res.status(200).json({
        message: "Job post deleted !"
    })
}

// Job Stats and Filters
export const jobStatsController = async (req, res) => {
    const stats = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            },
        },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 },
            },
        },
    ]);

    // Defult Stats
    const defultStats = {
        pending: 0,
        reject: 0,
        interview: 0
    };
    // Populate defaultStats with actual values from stats
    stats.forEach((item) => {
        defultStats[item._id] = item.count;
    });

    // Monthly Yearly Stats
    let monthlyApplication = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                },
                count: { $sum: 1 }
            }
        }
    ]);
    monthlyApplication = monthlyApplication.map((item) => {
        const { _id: { year, month }, count } = item
        const date = moment().month(month - 1).year(year).format("MMM Y")
        return { date, count }
    }).reverse();
    
    res.status(200).json({
        totalJobPosts: stats.length,
        defultStats,
        monthlyApplication
    });
};


