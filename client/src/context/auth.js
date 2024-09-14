// // import { useState,useEffect, useContext, createContext } from "react";
// // import axios from "axios";
// // const AuthContext = createContext();
// // const AuthProvider = ({ children }) => {
// //     const [auth, setAuth] = useState({
// //         user: null,
// //         token: "",
// //     });
// //     // default 
// //     axios.defaults.headers.common['Authorization'] = auth?.token
// //     useEffect(() => {
// //         const data = localStorage.getItem("auth")
// //         if (data) {
// //             const parseData = JSON.parse(data)
// //             setAuth({
// //                 ...auth ,
// //                 user: parseData.user,
// //                 token: parseData.token,
// //             });
// //             }
// //             // eslint - disable -next-line
// //             }, []);
            
// //     return (
        
// //         <AuthContext.Provider value={[auth, setAuth]}>
// //             {children}
// //         </AuthContext.Provider>
// //     );
// // }

// // // custom hook 
// // const useAuth = () => useContext(AuthContext)
// // export { useAuth, AuthProvider }


// import { useState, useEffect, useContext, createContext } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState({
//         user: null,
//         token: "",
//     });
//     // Debugging statement to check auth state
//     useEffect(() => {
//         console.log("Current auth state:", auth);
//     }, [auth]);
//     // Set axios headers when auth token changes
//     useEffect(() => {
//         console.log("Setting axios authorization header:", auth.token);
//         axios.defaults.headers.common['Authorization'] = auth.token ? `Bearer ${auth.token}` : '';
//     }, [auth.token]);

//     useEffect(() => {
//         const data = localStorage.getItem("auth");
//         if (data) {
//             const parseData = JSON.parse(data);
//             setAuth({
//                 user: parseData.user,
//                 token: parseData.token,
//             });
//         }
//         // eslint-disable-next-line
//     }, []);

//     return (
//         <AuthContext.Provider value={[auth, setAuth]}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use auth context
// const useAuth = () => useContext(AuthContext);

// export { useAuth, AuthProvider };



import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

// Create an AuthContext to share authentication state across components
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Initialize state with null user and empty token
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    // Debugging: Log the current auth state whenever it changes
    useEffect(() => {
        console.log("Current auth state:", auth);
    }, [auth]);

    // Set axios default Authorization header when the auth token changes
    useEffect(() => {
        console.log("Setting axios authorization header:", auth.token);
        axios.defaults.headers.common['Authorization'] = auth.token ? `Bearer ${auth.token}` : '';
    }, [auth.token]);

    // On component mount, load auth data from localStorage
    useEffect(() => {
        try {
            const data = localStorage.getItem("auth");
            if (data) {
                const parseData = JSON.parse(data);
                setAuth({
                    user: parseData.user,
                    token: parseData.token,
                });
            }
        } catch (error) {
            console.error("Error loading auth from localStorage:", error);
            // In case of error, reset auth state
            setAuth({ user: null, token: "" });
        }
        // eslint-disable-next-line
    }, []);

    // Provide the auth state and setter to the rest of the app
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
