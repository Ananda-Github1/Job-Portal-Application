import userModel from "../models/userModel.js";
import { registerValidation } from "../validations/userValidation.js";

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

    // Create user and save the new user
    const user = new userModel({ firstName, lastName, email, password });
    await user.save();

    // Token
    const token = user.createJWT();

    res.status(200).send({
        success: true,
        message: "User registered successfully",
        user: {
            fullName: user.fullName,
            email: user.email,
            location: user.location,
        },
        token
    });

};

// Login controller
export const loginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("Please fill all fields");
    }

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    user.password = undefined;
    const token = user.createJWT();

    // Final successful response
    return res.status(200).json({
        success: true,
        message: "Login Successfully",
        user,
        token,
    });
};


