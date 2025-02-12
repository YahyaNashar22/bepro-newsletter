import bcrypt from 'bcryptjs';
import User from '../model/userModel.js';
import { createToken, verifyToken } from '../utils/token.js';

export const createUser = async (req, res) => {
    try {
        const { username, password, email, phone } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ username, password: hashedPassword, email, phone, role: "user" });

        res.status(201).json({ message: "user created successfully" })
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong", error: error });
    }
}

export const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // check if email exists
        const existingUser = await User.findOne({
            $or: [
                { username: identifier },
                { email: identifier }
            ]
        });
        if (!existingUser) return res.status(404).json({ message: "username or email does not exist" });

        // check if user is blocked
        if (existingUser.blocked) return res.status(401).json({ message: "Your Account is Blocked!" });

        // check if password match
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) return res.status(401).json({ message: "Wrong  Password" });

        // sign in
        const token = createToken(existingUser);
        // const decoded = verifyToken(token);

        res.status(200).json({ message: "signed in", payload: token });

    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
    }
}


export const getAllUsers = async (req, res) => {
    try {
        const { query } = req.body;

        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } },
                { phone: { $regex: query, $options: "i" } }
            ]
        })

        res.status(200).json({
            message: "users fetched",
            payload: users
        });

    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
    }
}

export const blockUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        await User.findOneAndUpdate({ _id: id }, {
            $set: {
                blocked: !user.blocked
            }
        }, { new: true });

        res.status(200).json({
            message: "user status changed",
            payload: user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong", error: error });
    }
}

export const editPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.findById(id);

        if (!user) return res.status(404).json({ message: "user not found!" });

        await User.findOneAndUpdate({ _id: id }, {
            $set: {
                password: hashedPassword
            }
        }, { new: true });

        res.status(200).json({
            message: "user password changed",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong", error: error });
    }
}