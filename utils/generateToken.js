import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });

    // res.cookie("jwt", token, {
    //     maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    //     httpOnly: true, // Prevent XSS attacks
    //     sameSite: "strict", // Prevent CSRF attacks
    //     secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    // });
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // Ensure this is correct
      });

    return token;
};
