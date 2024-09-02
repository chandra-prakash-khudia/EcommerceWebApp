import express from "express"
import {
    registerController,loginController,testController,forgotPasswordController,
} from "../controllers/authController.js"
// logoutController,
import { isAdmin , requireSignIn } from "../middlewares/authMiddleware.js";


const router = express.Router();
// routing 
//register
router.post("/register",registerController );
//login
router.post("/login",loginController );
//logout
// router.post("/logout", logoutController);
//ltest
// forgot Password || Post
router.post("/forgot-password" ,forgotPasswordController )

router.get("/test",requireSignIn , isAdmin , testController );
router.get("/user-auth" , requireSignIn , (req,res)=>{
    res.status(200).send({ok:true});
});
router.get("/admin-auth" , requireSignIn , isAdmin , (req,res)=>{
    res.status(200).send({ok:true});
})
export default router ;
