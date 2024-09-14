import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protect Routes token-based
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


//Protected Routes token base
// export const requireSignIn = async (req, res, next) => {
//   try {
//     const decode = JWT.verify(
//       req.headers.authorization,
//       process.env.JWT_SECRET
//     );
//     req.user = decode;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };


// export const requireSignIn = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     // Check if the Authorization header exists
//     if (!authHeader) {
//       return res.status(401).json({
//         success: false,
//         message: "Authorization token missing cp",
//       });
//     }

//     // Split the token from the Bearer scheme
//     const token = authHeader.split(" ")[1];

//     // Verify the token
//     const decoded = JWT.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded JWT:", decoded); // Add this line to verify
//     // Attach the user info to the request object
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized access",
//     });
//   }
// };

// wroking 
// Admin access
// export const isAdmin = async (req, res, next) => {
//     try {
//         const user = await userModel.findById(req.user.userId);
//         if ( user.role !== 1) {
//             return res.status(401).json({ message: "unauthorized accessm || you re not admin" });
//         }else {
//             next();
//         }
//     } catch (error) {
//         res.status(401).json({ message: "Error in admin middleware" });
//     }
// };


// export const requireSignIn = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     // Check if Authorization header is present and starts with "Bearer"
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ message: "Authorization token missing or malformed" });
//     }

//     // Extract token from the Authorization header
//     const token = authHeader.split(' ')[1];
    
//     // Verify and decode the token
//     const decoded = JWT.verify(token, process.env.JWT_SECRET);

//     // Attach user info from token to the request object
//     req.user = decoded;
//     console.log("Decoded JWT:", decoded); // Add this line to verify
//     // Proceed to the next middleware
//     next();
//   } catch (error) {
//     // Handle errors during verification (e.g., invalid or expired token)
//     return res.status(401).json({ message: "Invalid or expired token", error: error.message });
//   }
// };

// till this

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    // Check if Authorization header is present
    if (!req.headers.authorization) {
      return res.status(401).send({
        success: false,
        message: "Authorization header is missing",
      });
    }

    // Get the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1]; // Expecting "Bearer <token>"

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Authorization token is missing",
      });
    }

    // Verify the token
    const decode = JWT.verify(token, process.env.JWT_SECRET);

    // Attach the user data to the request object
    req.user = decode;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Middleware to check if the user has admin privileges
export const isAdmin = async (req, res, next) => {
  try {
    // Fetch the user from the database based on the ID in the token
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Check if the user's role is admin (role === 1)
    if (user.role !== 1) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized Access - Admins only",
      });
    }

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error("Admin Check Error:", error);
    return res.status(500).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};