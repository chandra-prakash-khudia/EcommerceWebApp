import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout.js'
import UserMenu from './../../components/UserMenu.js';
import moment from "moment";
import axios from 'axios';
import { useAuth } from "../../context/auth.js";

const Orders = () => {



    const token = localStorage.getItem('token');  // Or wherever you're storing the token

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`  // Ensure 'Bearer' is followed by the token
      }
    };

    
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const getOrders = async () => {
        try {
            const userId = auth.user._id;
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`, {
                params: { userId },
                withCredentials: true, // If your backend requires credentials
              } ,{config} );
            console.log("Orders Data:", data);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);
    return (
        <Layout title={"Your Orders"}>
            <div className="container-flui p-3 m-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>


                    <div className="col-md-9">
                        <h1 className="text-center">All Orders</h1>
                        {orders.length === 0 ? (
                            <p>No orders found.</p>  // Add this message if orders are empty
                        ) : (
                            orders.map((o, i) => {
                                return (
                                    <div className="border shadow" key={o._id}> {/* Add unique key */}
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Buyer</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Payment</th>
                                                    <th scope="col">Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{o?.status || 'N/A'}</td> {/* Add fallback for missing fields */}
                                                    <td>{o?.buyer?.name || 'Anonymous'}</td> {/* Add fallback */}
                                                    <td>{moment(o?.createAt).fromNow() || 'Unknown'}</td>
                                                    <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                                                    <td>{o?.products?.length || 0}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="container">
                                            {o?.products?.map((p, i) => (
                                                <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                                    <div className="col-md-4">
                                                        <img
                                                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                                            className="card-img-top"
                                                            alt={p.name}
                                                            width="100px"
                                                            height={"100px"}
                                                        />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p>{p.name}</p>
                                                        <p>{p.description.substring(0, 30)}</p>
                                                        <p>Price : {p.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;