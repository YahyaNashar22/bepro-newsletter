import jwt from 'jsonwebtoken';

export const createToken = (user) => {
    return jwt.sign(
        {
            username: user.username,
            email: user.email,
            role: user.role
        },
        process.env.SECRET_TOKEN,
        { expiresIn: "1h" }
    )
}

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

        return { success: true, payload: decoded };
    } catch (error) {
        return { success: false, error: error.message };
    }
}