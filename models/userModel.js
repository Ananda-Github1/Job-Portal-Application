import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import JTW from 'jsonwebtoken';

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

// Full Name
userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
});

// Virtuals converting documents to JSON
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

// Password hashing
userSchema.pre("save", async function () {
    if(!this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare Password
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
}

// JSON WEBTOKEN
userSchema.methods.createJWT = function () {
    return JTW.sign({ userId: this._id, email: this.email },
        process.env.JWT_SECRET, { expiresIn: '1d' })
};

export default mongoose.model('User', userSchema);