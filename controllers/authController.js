import userModel from "../models/userModel.js";
import { registerValidation } from "../validations/userValidation.js";
import bcrypt from 'bcryptjs';

// User Register Controller
export const registerController = async (req, res, next) => {

    // Validate the request body with Joi
    const { error } = registerValidation.validate(req.body);
    if (error) {
        return next(new Error(error.details[0].message));
    }

    const { firstName, lastName, email, password } = req.body;

    // Checking the existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        const duplicateError = new Error("You already have an account, Please login.");
        duplicateError.statusCode = 400;
        return next(duplicateError);
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user and save the new user
    const newUser = new userModel({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();

    res.status(200).send({
        success: true,
        message: "User registered successfully",
        data: newUser
    });

};


