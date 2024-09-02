import userModel from "../models/userModel.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import bcrypt from 'bcryptjs';

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address,answer } = req.body;
        // console.log(`  ${name}    ${email}   ${password}    ${phone}   ${address}`)
        // Validate input fields
        if (!name) return res.status(400).json({ message: "Name is required" });
        if (!email) return res.status(400).json({ message: "Email is required" });
        if (!password) return res.status(400).json({ message: "Password is required" });
        if (!phone) return res.status(400).json({ message: "Phone is required" });
        if (!address) return res.status(400).json({ message: "Address is required" });
        if (!answer) return res.status(400).json({ message: "Answer is required"})

        // Check if user exists
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).send({
                success: false,
                message: "Already registered, please login",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user
        const user = new userModel({
            name, email, password: hashedPassword, phone, address,answer
        });
        await user.save();

        // Generate token and set cookie
        generateTokenAndSetCookie(user._id, res);

        return res.status(201).send({
            success: true,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email and password are required",
            });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        // Check password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid password",
            });
        }

        // Generate token and set cookie
        const token = generateTokenAndSetCookie(user._id, res);
        res.cookie('token', token)

        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                token,
                role:user.role ,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};
// forgot password controller
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;

        if (!email) {
            return res.status(400).send({ message: 'Email is required' });
        }
        if (!answer) {
            return res.status(400).send({ message: 'Answer is required' });
        }
        if (!newPassword) {
            return res.status(400).send({ message: 'New password is required' });
        }

        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({ success: false, message: 'Wrong email or answer' });
        }

        // Generate token and set cookie
        const token = generateTokenAndSetCookie(user._id, res);

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true });

        res.status(200).send({
            success: true,
            message: 'Password updated successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in forgot password',
            error,
        });
    }
};
export const testController = (req, res) => {
    try {
        res.send("Protected route");
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
};

// export const logoutController = async (req, res) => {
//     try {
//         res.cookie("jwt", "", { maxAge: 0 });
//         res.status(200).send({
//             success: true,
//             message: "Logout successful"
//         });
//     } catch (error) {
//         console.error("Error in logout controller", error);
//         res.status(500).send({ error });
//     }
// }
