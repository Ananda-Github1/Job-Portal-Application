import userModel from "../models/userModel.js";

// Update User Controller
export const updateUserController = async (req, res, next) => {
    const { email, firstName, lastName, location } = req.body;

    const user = await userModel.findOne({ _id: req.user.userId }).select("+password");
    if (!user) {
        return next(new Error("User not found"));
    }
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.location = location;

    await user.save();
    const token = user.createJWT();
    user.password = undefined;
    res.status(200).json({
        message: "Your data has been updated",
        user,
        token,
    });
};
