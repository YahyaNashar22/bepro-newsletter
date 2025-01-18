import bcrypt from 'bcryptjs';
import User from '../model/userModel.js';
import { createToken, verifyToken } from '../utils/token.js';

export const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = User.create({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "user created successfully" })
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check if email exists
        const existingUser = await User.findOne({ username });
        if (!existingUser) return res.status(404).json({ message: "username does not exist" });

        // check if password match
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) return res.status(401).json({ message: "Wrong  Password" });

        // sign in
        const token = createToken(existingUser);

        res.status(200).json({ message: "signed in", payload: token });

    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
    }
}
