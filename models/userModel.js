import mongoose from "mongoose"

// User Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: 'India'
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);