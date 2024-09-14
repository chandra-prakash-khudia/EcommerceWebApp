// import Layout from '../../components/Layout.js'
// import UserMenu from './../../components/UserMenu.js';
// import React, { useState, useEffect } from "react";

// import { useAuth } from "../../context/auth.js";
// import toast from "react-hot-toast";
// import axios from "axios";
// const Profile = () => {


//   const token = localStorage.getItem('token');  // Or wherever you're storing the token

//   // const config = {
//   //   headers: {
//   //     'Authorization': `Bearer ${token}`  // Ensure 'Bearer' is followed by the token
//   //   }
//   // };


//   //context
//   const [auth, setAuth] = useAuth();
//   //state
//   // const { token } = useAuth(); 
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");

//   //get user data
//   useEffect(() => {
//     if (auth?.user) {
//       const { email, name, phone, address } = auth.user;
//       setName(name || "");
//       setPhone(phone || "");
//       setEmail(email || "");
//       setAddress(address || "");
//     }
//   }, [auth?.user]);
//   // form function
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//         const { data } = await axios.put(
//             `${process.env.REACT_APP_API}/api/v1/auth/profile`,
//             { name, email, password, address, phone },
//             {
//               headers: {
//                 Authorization: `Bearer ${token}` // Make sure the token is included
//               },
//               withCredentials: true // Ensure credentials are sent if required
//             }
//           );

//         if (data.success) {
//             toast.success(data.message);
//             // Update state or redirect
//         } else {
//             toast.error(data.message);
//         }
//     } catch (error) {
//         console.error("Error while updating profile:", error);
//         if (error.response) {
//             toast.error(error.response.data.message);
//         } else {
//             toast.error("Network error. Please check your connection.");
//         }
//     }
// };
//   return (
//     <Layout title={"Your Profile"}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <UserMenu />
//           </div>
//           <div className="col-md-9">
//             <div className="form-container ">
//               <form onSubmit={handleSubmit}>
//                 <h4 className="title">USER PROFILE</h4>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="form-control"
//                     id="exampleInputNamr"
//                     placeholder="Enter Your Name"
//                     autoFocus
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     placeholder="Enter Your Email "
//                     disabled
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="form-control"
//                     id="exampleInputPassword1"
//                     placeholder="Enter Your Password"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="form-control"
//                     id="exampleInputPhone1"
//                     placeholder="Enter Your Phone"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     className="form-control"
//                     id="exampleInputAddress1"
//                     placeholder="Enter Your Address"
//                   />
//                 </div>

//                 <button type="submit" className="btn btn-primary">
//                   UPDATE
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Profile;



import Layout from '../../components/Layout.js';
import UserMenu from './../../components/UserMenu.js';
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth.js";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  // context


    //const token = localStorage.getItem('token');  // Or wherever you're storing the token

  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Retrieve user details on component mount
  useEffect(() => {
    if (auth?.user) {
      const { email, name, phone, address } = auth.user;
      setName(name || "");
      setPhone(phone || "");
      setEmail(email || "");
      setAddress(address || "");
    }
  }, [auth?.user]);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve token from localStorage
      const authData = JSON.parse(localStorage.getItem('auth'));
       const token = authData?.token;

      if (!token) {
        throw new Error('Token is missing');
      }

      // Make PUT request to update profile
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, address, phone },
        {
          headers: {
            Authorization: `Bearer ${token}` // Add the token in Authorization header
          },
          withCredentials: true // Ensure credentials are sent if required
        }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error while updating profile:", error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Network error. Please check your connection.");
      }
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container ">
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Address"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
