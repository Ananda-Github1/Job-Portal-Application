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


