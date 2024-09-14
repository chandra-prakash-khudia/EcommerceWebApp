import express from "express"
import {
    registerController,loginController,testController,forgotPasswordController,updateProfileController , getOrdersController ,getAllOrdersController,orderStatusController,getAllUsersController
} from "../controllers/authController.js"
// logoutController,
import { isAdmin , requireSignIn } from "../middlewares/authMiddleware.js";


const router = express.Router();
// routing 
//register
// router.post("/register",registerController );
// //login
// router.post("/login", loginController );
// //logout
// // router.post("/logout", logoutController);
// //ltest
// // forgot Password || Post
// router.post("/forgot-password" ,forgotPasswordController )

// router.get("/test",requireSignIn , isAdmin , testController );

// router.get("/user-auth" , (req,res)=>{
//     res.status(200).send({ok:true});
// });
// router.get("/admin-auth" , requireSignIn, isAdmin , (req,res)=>{
//     res.status(200).send({ok:true});
// })


// router.put("/profile",requireSignIn , updateProfileController);
// router.get("/orders", getOrdersController);

// //all orders
// router.get("/all-orders",  isAdmin, getAllOrdersController);

// // order status update
// router.put(
//   "/order-status/:orderId",
//   isAdmin,
//   orderStatusController
// );




// checking another one

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

router.get("/all-users", requireSignIn, isAdmin, getAllUsersController);

export default router ;
