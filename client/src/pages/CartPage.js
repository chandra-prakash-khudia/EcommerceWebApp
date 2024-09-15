import Layout from '../components/Layout.js';
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/cart.js';
import { useAuth } from '../context/auth.js';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react"
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";

// import dotenv from 'dotenv';

// dotenv.config();

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    console.log("Auth in CartPage:", auth);
    // Calculate total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.forEach((item) => {
                total += item.price;
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        } catch (error) {
            console.log(error);
            return "$0.00"; // Default value in case of error
        }
    };

    // Remove item from cart
    const removeCartItem = (pid) => {
        try {
            const updatedCart = cart.filter((item) => item._id !== pid);
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        } catch (error) {
            console.log(error);
        }
    };
    //get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${window.location.origin}/api/v1/product/braintree/token`, { withCredentials: true, });
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getToken();
    }, [auth?.token]);

    //handle payments
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${window.location.origin}/api/v1/product/braintree/payment`, {
                nonce,
                cart,
                userId: auth?.user?._id,

            }, { withCredentials: true, });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    return (
        <Layout>
            <div className="container mt-4">
                <div className="row mb-4">
                    <div className="col-md-12 text-center">
                        <h1 className="bg-light p-3 rounded">
                            {`Hello ${auth?.user?.name}`}
                        </h1>
                        <h4>
                            {cart?.length
                                ? `You have ${cart.length} item(s) in your cart ${auth?.token ? "" : "— please log in to checkout"
                                }`
                                : "Your cart is empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        {cart?.map((p) => (
                            <div className="row mb-3 p-3 border rounded shadow-sm" key={p._id}>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <img
                                        src={`${window.location.origin}/api/v1/product/product-photo/${p._id}`}
                                        className="img-fluid rounded"
                                        alt={p.name}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <h5>{p.name}</h5>
                                    <p>{p.description.substring(0, 50)}...</p>
                                    <p><strong>Price:</strong> ${p.price.toFixed(2)}</p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeCartItem(p._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4">
                        <div className="text-center">
                            <h2>Cart Summary</h2>
                            <p>Total | Checkout | Payment</p>
                            <hr />
                            <h4>Total: {totalPrice()}</h4>
                            {auth?.user?.address ? (
                                <>
                                    <div className="mb-3">
                                        <h4>Current Address</h4>
                                        <h5>{auth?.user?.address}</h5>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => navigate("/dashboard/user/profile")}
                                        >
                                            Update Address
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="mb-3">
                                    {auth?.token ? (
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => navigate("/dashboard/user/profile")}
                                        >
                                            Add Address
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() =>
                                                navigate("/login", {
                                                    state: "/cart",
                                                })
                                            }
                                        >
                                            Please Log In to Checkout
                                        </button>
                                    )}
                                </div>
                            )}

                            <div className="mt-2">
                                {!clientToken || !auth?.token || !cart?.length ? (
                                    ""
                                ) : (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: "vault",
                                                },
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />

                                        <button
                                            className="btn btn-primary"
                                            onClick={handlePayment}
                                            disabled={loading || !instance || !auth?.user?.address}
                                        >
                                            {loading ? "Processing ...." : "Make Payment"}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
