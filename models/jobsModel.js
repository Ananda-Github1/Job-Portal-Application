import mongoose from "mongoose";

// Jobs Schema
const JobsSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true,
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['pending', 'reject', 'interview'],
        default: 'pending'
    },
    workType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'contract'],
        default: 'full-time'
    },
    workLocation: {
        type: String,
        default: 'Remote',
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

export default mongoose.model('Jobs', JobsSchema);