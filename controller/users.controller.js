import { usersLoginService, usersService } from "../service/users.service.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
export const usersController = async (req, res) => {
    try {
        const data = req.body
        const result = await usersService(data)
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: result
        })
    } catch (err) {
        throw new Error(err.message)
    }
}

export const usersLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Fetch the user from the database
        const user = await usersLoginService(email);

        // If the user is not found, return an error
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Respond with success and the token
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: user, // Send the user data in the response
            token: token
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}