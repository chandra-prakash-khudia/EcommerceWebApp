import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protect Routes token-based
// export const requireSignIn = async (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//       return res.status(401).json({ message: "Authorization token required" });
//   }
//   try {
//       const decoded = JWT.verify(token, process.env.JWT_SECRET);
//       req.user = decoded;
//       next();
//   } catch (error) {
//       return res.status(401).json({ message: "Invalid or expired token" });
//   }

// };

export const requireSignIn = async (req, res, next) => {
  const token = req.cookies.jwt; // Make sure you're using the same cookie name

  if (!token) {
      return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use jwt.verify instead of JWT.verify
      req.user = decoded;
      next();
  } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.userId);
        if ( user.role !== 1) {
            return res.status(401).json({ message: "unauthorized access" });
        }else {
            next();
        }
    } catch (error) {
        res.status(401).json({ message: "Error in admin middleware" });
    }
};
