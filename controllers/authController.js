import userModel from "../models/userModel.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import bcrypt from 'bcryptjs';
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";

// export const registerController = async (req, res) => {
//     try {
//         const { name, email, password, phone, address,answer } = req.body;
//         // console.log(`  ${name}    ${email}   ${password}    ${phone}   ${address}`)
//         // Validate input fields
//         if (!name) return res.status(400).json({ message: "Name is required" });
//         if (!email) return res.status(400).json({ message: "Email is required" });
//         if (!password) return res.status(400).json({ message: "Password is required" });
//         if (!phone) return res.status(400).json({ message: "Phone is required" });
//         if (!address) return res.status(400).json({ message: "Address is required" });
//         if (!answer) return res.status(400).json({ message: "Answer is required"})

//         // Check if user exists
//         const userExists = await userModel.findOne({ email });
//         if (userExists) {
//             return res.status(400).send({
//                 success: false,
//                 message: "Already registered, please login",
//             });
//         }

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Save user
//         const user = new userModel({
//             name, email, password: hashedPassword, phone, address,answer
//         });
//         await user.save();

//         // Generate token and set cookie
//         generateTokenAndSetCookie(user._id, res);

//         return res.status(201).send({
//             success: true,
//             message: "User registered successfully",
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({
//             success: false,
//             message: "Error in registration",
//             error,
//         });
//     }
// };

// // export const loginController = async (req, res) => {
// //     try {
// //         const { email, password } = req.body;

// //         // Validate input fields
// //         if (!email || !password) {
// //             return res.status(400).send({
// //                 success: false,
// //                 message: "Email and password are required",
// //             });
// //         }

// //         // Check if user exists
// //         const user = await userModel.findOne({ email });
// //         if (!user) {
// //             return res.status(404).send({
// //                 success: false,
// //                 message: "User not found",
// //             });
// //         }

// //         // Check password match
// //        // const isMatch = await bcrypt.compare(password, user.password);
// //        const isMatch = await comparePassword(password, user.password);
// //         if (!isMatch) {
// //             return res.status(401).send({
// //                 success: false,
// //                 message: "Invalid password",
// //             });
// //         }

// //         // Generate token and set cookie
// //          const token = generateTokenAndSetCookie(user._id, res);
// //         // res.cookie('token', token)

// //           // Generate JWT token
// //     //   const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });



// //         res.status(200).send({
// //             success: true,
// //             message: "Login successful",
// //             user: {
// //                 _id: user._id,
// //                 name: user.name,
// //                 email: user.email,
// //                 phone: user.phone,
// //                 address: user.address,
// //                 role:user.role ,
// //             } , token,
// //         });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).send({
// //             success: false,
// //             message: "Error in login",
// //             error,
// //         });
// //     }
// // };
// // forgot password controller
// export const forgotPasswordController = async (req, res) => {
//     try {
//         const { email, answer, newPassword } = req.body;

//         if (!email) {
//             return res.status(400).send({ message: 'Email is required' });
//         }
//         if (!answer) {
//             return res.status(400).send({ message: 'Answer is required' });
//         }
//         if (!newPassword) {
//             return res.status(400).send({ message: 'New password is required' });
//         }

//         const user = await userModel.findOne({ email, answer });
//         if (!user) {
//             return res.status(404).send({ success: false, message: 'Wrong email or answer' });
//         }

//         // Generate token and set cookie
//        // const token = generateTokenAndSetCookie(user._id, res);

//         // Hash new password
//         const hashedPassword = await bcrypt.hash(newPassword, 10);

//         // Update user password
//         await userModel.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true });

//         res.status(200).send({
//             success: true,
//             message: 'Password updated successfully',
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({
//             success: false,
//             message: 'Error in forgot password',
//             error,
//         });
//     }
// };
// export const testController = (req, res) => {
//     try {
//         res.send("Protected route");
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error });
//     }
// };

// //update prfole
// export const updateProfileController = async (req, res) => {
//     try {
//         if (!req.user || !req.user._id) {
//             return res.status(401).json({ success: false, message: "User not authenticated" });
//         }

//         const { name, email, password, address, phone } = req.body;

//         // Find the user by their ID (from JWT or session)
//         const user = await userModel.findById(req.user._id);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         // Password validation (if provided)
//         if (password && password.length < 6) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Password must be at least 6 characters long",
//             });
//         }

//         let hashedPassword = user.password; // Default to the current password
//         if (password) {
//             hashedPassword = await hashPassword(password);
//         }

//         // Perform the update
//         const updatedUser = await userModel.findByIdAndUpdate(
//             req.user._id,
//             {
//                 name: name || user.name,
//                 email: email || user.email, // You may need to handle email validation separately
//                 password: hashedPassword,
//                 phone: phone || user.phone,
//                 address: address || user.address,
//             },
//             { new: true } // Return the updated document
//         );

//         if (!updatedUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Profile update failed",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Profile updated successfully",
//             updatedUser,
//         });
//     } catch (error) {
//         console.error("Error while updating profile:", error);
//         res.status(500).json({
//             success: false,
//             message: "An error occurred while updating the profile",
//             error: error.message,
//         });
//     }
// };

// export const loginController = async (req, res) => {
//     try {
//       const { email, password } = req.body;
  
//       // Validate input
//       if (!email || !password) {
//         return res.status(400).json({ success: false, message: 'Email and password are required' });
//       }
  
//       // Find user by email
//       const user = await userModel.findOne({ email });
//       if (!user) {
//         return res.status(404).json({ success: false, message: 'Email not registered' });
//       }
  
//       // Check password
//       const isMatch = await comparePassword(password, user.password);
//       if (!isMatch) {
//         return res.status(401).json({ success: false, message: 'Invalid credentials' });
//       }
  
//       // Generate JWT token
//       const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//       // Respond with user and token
//       res.status(200).json({
//         success: true,
//         message: 'Login successful',
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           phone: user.phone,
//           address: user.address,
//         },
//         token,
//       });
//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
//     }
//   };








export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 3) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};


export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });  // Use -1 (number) instead of "-1" (string)
      
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};




export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({}).select("-password"); // Exclude passwords for security
    res.status(200).send({
      success: true,
      message: "All users fetched successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching users",
      error,
    });
  }
};














































//   export const getOrdersController = async (req, res) => {
//     try {
//      // Add this to check if req.user is properly set
//       const { userId } = req.query; 
//       console.log(userId);
//       const orders = await orderModel
//         .find({ buyer: userId })
//         .populate("products", "-photo")
//         .populate("buyer", "name");
//       res.json(orders);
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         success: false,
//         message: "Error in getOrdercontroller Orders",
//         error,
//       });
//     }
//   };
// //orders
// export const getAllOrdersController = async (req, res) => {
//   try {
//     const orders = await orderModel
//       .find({})
//       .populate("products", "-photo")
//       .populate("buyer", "name")
//       .sort({ createdAt: "-1" });
//     res.json(orders);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error getAllOrdersController Orders",
//       error,
//     });
//   }
// };

// //order status
// export const orderStatusController = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;
//     const orders = await orderModel.findByIdAndUpdate(
//       orderId,
//       { status },
//       { new: true }
//     );
//     res.json(orders);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error While Updateing Order",
//       error,
//     });
//   }
// };