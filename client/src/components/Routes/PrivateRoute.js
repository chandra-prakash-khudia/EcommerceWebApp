import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth.js";
import { Outlet } from "react-router-dom";
import axios from 'axios';
import Spinner from "../Spinner.js";



export default function PrivateRoute() {
    const [ok, setOk] = useState(true);
    const [auth, setAuth] = useAuth();
    
    useEffect(() => {
        const authCheck = async () => {
            
                // const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`);
                const res = await axios.get(`http://localhost:8080/api/v1/auth/user-auth`);
                if(res.data.ok){
                    setOk(true)
                }
                else{
                    setOk(false)
                    }
                
            };
        if (auth?.token) authCheck();
    }, [auth?.token]);
    return ok ? <Outlet /> : <Spinner path="" />
    
}

    
    // "proxy": "http://localhost:8080",


