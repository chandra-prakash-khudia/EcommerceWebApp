import React, { useState } from "react";
import Layout from "./../../components/Layout.js";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import {useAuth} from '../../context/auth.js'

const Login = () => {

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth]  = useAuth()
  const navigate = useNavigate();
  const location = useLocation()
  // form function
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  
  //     const res = await axios.post(`${window.location.origin}/api/v1/auth/login`, {
  //       email,
  //       password
  //     } , {
  //       withCredentials: true});
  //     if (res && res.data.success) {
  //       toast.success(res.data && res.data.message);
  //       setAuth({
  //           ...auth ,
  //           user: res.data.user,
  //           token: res.data.token,
  //       })
  //       localStorage.setItem('auth' , JSON.stringify(res.data))
  //       navigate( location.state || "/");
  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(
  //       `${process.env.REACT_APP_API}/api/v1/auth/login`,
  //       { email, password },
  //       { withCredentials: true }
  //     );
  
  //     if (res.data.success) {
  //       toast.success(res.data.message);
  //       setAuth({
  //         ...auth,
  //         user: res.data.user,
  //         token: res.data.token,
  //       });
  //       localStorage.setItem('auth', JSON.stringify(res.data));
  //       navigate(location.state || "/");
  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       toast.error("Invalid credentials. Please try again.");
  //     } else if (error.response && error.response.status === 404) {
  //       toast.error("Email not registered.");
  //     } else {
  //       toast.error("Something went wrong. Please try again.");
  //     }
  //     console.error(error);
  //   }
  // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//         const { data } = await axios.post(
//             `${process.env.REACT_APP_API}/api/v1/auth/login`,
//             { email, password },
//             { withCredentials: true }
//         );

//         if (data.success) {
//             toast.success(data.message);

//             // Update auth context and localStorage with user and token
//             setAuth({
//                 user: data.user,
//                 token: data.token,
//             });
//             localStorage.setItem('auth', JSON.stringify({
//                 user: data.user,
//                 token: data.token
//             }));

//             // Redirect to the intended location or default to home
//             navigate(location.state?.from || "/");
//         } else {
//             toast.error(data.message);
//         }
//     } catch (error) {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//                     toast.error("Invalid credentials. Please try again.");
//                     break;
//                 case 404:
//                     toast.error("Email not registered.");
//                     break;
//                 default:
//                     toast.error("Something went wrong. Please try again.");
//                     break;
//             }
//         } else {
//             toast.error("Network error. Please check your connection.");
//         }
//         console.error("Login error:", error);
//     }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const { data } = await axios.post(
      `${window.location.origin}/api/v1/auth/login`,
      { email, password },
      { withCredentials: true }
    );

    if (data.success) {
      toast.success(data.message);

      // Update auth context and localStorage with user and token
      setAuth({
        user: data.user,
        token: data.token,
      });

      if (typeof window !== "undefined") {
        // Ensure this code runs only on the client-side
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: data.user,
            token: data.token,
          })
        );
        console.log("Token is", localStorage.getItem("auth")); // Moved log after storing token
      }

      // Redirect to the intended location or default to home
      navigate(location.state?.from || "/");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          toast.error("Invalid credentials. Please try again.");
          break;
        case 404:
          toast.error("Email not registered.");
          break;
        default:
          toast.error("Something went wrong. Please try again.");
          break;
      }
    } else {
      toast.error("Network error. Please check your connection.");
    }
    console.error("Login error:", error); // Log the full error for debugging
  }
};
  return (
    <Layout>
        <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Login FORM</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
        <div className="mb-3">
        <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>
            Forgot Password
          </button>
        </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login