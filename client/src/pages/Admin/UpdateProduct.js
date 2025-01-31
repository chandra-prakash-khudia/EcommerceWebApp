// import React, { useEffect, useState } from 'react';
// import AdminMenu from './../../components/AdminMenu.js';
// import Layout from '../../components/Layout.js';
// import toast from "react-hot-toast";
// import axios from 'axios';
// import { Select } from 'antd';
// import { useNavigate , useParams } from 'react-router-dom';

// const { Option } = Select;

// const UpdateProduct = () => {
//     const navigate = useNavigate();
//     const params = useParams()
//     const [categories, setCategories] = useState([]);
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [description, setDescription] = useState('');
//     const [photo, setPhoto] = useState('');
//     const [category, setCategory] = useState('');
//     const [shipping, setShipping] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [id, setId] = useState('')

//     // get single product 
//     const getSingleProduct = async () =>{
//         try {
//             const { data } = await axios.get(`${window.location.origin}/api/v1/product/get-product/${params.slug}`, { withCredentials: true });
//             setName(data.product.name)
//             setPrice(data.product.price)
//             setDescription(data.product.description)
//             setCategory(data.product.category._id)
//             setShipping(data.product.shipping)
//             setQuantity(data.product.quantity)
//             setId(data.product._id)
//             setPhoto(data.product.photo)

//         } catch (error) {
//             console.log(error)
//         }
//     }
//     useEffect(()=>{
//         getSingleProduct()
//     } ,[]);

//     // get all categories
//     const getAllCategory = async () => {
//         try {
//             const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`, { withCredentials: true });
//             if (data?.success) {
//                 setCategories(data?.category);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error("Something went wrong in getting all categories.");
//         }
//     };

//     useEffect(() => {
//         getAllCategory();
//     }, []);

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             const productData = new FormData();
//             productData.append('name', name);
//             productData.append('price', price);
//             productData.append('description', description);
//             productData.append('photo', photo);
//             productData.append('category', category);
//             productData.append('shipping', shipping);
//             productData.append('quantity', quantity);
            
//             const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product`, productData, { withCredentials: true });
//             if (data?.success) {
//                 toast.success("Product created successfully");
//                 navigate('/dashboard/admin/products');
//             } else {
//                 toast.error(data?.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error("Something went wrong in creating the product.");
//         }
//     };
//   // delete a product 
//   const handleDelete = async (id) => {
//     try {
//         let answer= window.prompt("Are you sure want to delete this profuct ?")
//         if(!answer) return 
//         const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}` , { withCredentials: true });
//         toast.success("product deleted successfully")
//         navigate("/dashboard/admin/products")
//     } catch (error) {
//         console.log(error);
//         toast.error("something went wrong in delete ")


//     }
//   }
//   return (
//     <Layout title={"Dashboard - Update  Product"}>

//       <div className="container-fluid m-3 p-3">

//         <div className="row">


//           <div className="col-md-3">
//             <AdminMenu />
//           </div>


//           <div className="col-md-9">
//             <h1>Update Product</h1>


//             <div className="m-1 w-75">

//               <Select
//                 variant="unstyle"
//                 placeholder="Select a category"
//                 size="large"
//                 showSearch
//                 className="form-select mb-3"
//                 onChange={(value) => {
//                   setCategory(value);
//                 }}
//                 value={category}
//               >
//                 {categories?.map((c) => (
//                   <Option key={c._id} value={c._id}>
//                     {c.name}
//                   </Option>
//                 ))}
//               </Select>


//               <div className="mb-3">
//                 <label className="btn btn-outline-secondary col-md-12">
//                   {photo ? photo.name : "Upload Photo"}
//                   <input
//                     type="file"
//                     name="photo"
//                     accept="image/*"
//                     onChange={(e) => setPhoto(e.target.files[0])}
//                     hidden
//                   />
//                 </label>
//               </div>



//               <div className="mb-3">
//                 {photo ? (
//                   <div className="text-center">
//                     <img
//                       src={URL.createObjectURL(photo)}
//                       alt="product_photo"
//                       height={"200px"}
//                       className="img img-responsive"
//                     />
//                   </div>
//                 ) : (
//                   <div className="text-center">
//                     <img
//                       src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
//                       alt="product_photo"
//                       height={"200px"}
//                       className="img img-responsive"
//                     />
//                   </div>
//                 )}
//               </div>


//               <div className="mb-3">
//                 <input
//                   type="text"
//                   value={name}
//                   placeholder="write a name"
//                   className="form-control"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>


//               <div className="mb-3">
//                 <textarea
//                   type="text"
//                   value={description}
//                   placeholder="write a description"
//                   className="form-control"
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>

//               <div className="mb-3">
//                 <input
//                   type="number"
//                   value={price}
//                   placeholder="write a Price"
//                   className="form-control"
//                   onChange={(e) => setPrice(e.target.value)}
//                 />
//               </div>


//               <div className="mb-3">
//                 <input
//                   type="number"
//                   value={quantity}
//                   placeholder="write a quantity"
//                   className="form-control"
//                   onChange={(e) => setQuantity(e.target.value)}
//                 />
//               </div>


//               <div className="mb-3">
//                 <Select
//                   variant="unstyle"
//                   placeholder="Select Shipping "
//                   size="large"
//                   showSearch
//                   className="form-select mb-3"
//                   onChange={(value) => {
//                     setShipping(value);
//                   }}
//                   value={shipping ? "yes" : "No"}
//                 >
//                   <Option value="0">No</Option>
//                   <Option value="1">Yes</Option>
//                 </Select>
//               </div>


//               <div className="mb-3">
//                 <button className="btn btn-primary" onClick={handleUpdate}>
//                   UPDATE PRODUCT
//                 </button>
//               </div>


//               <div className="mb-3">
//                 <button className="btn btn-danger" onClick={handleDelete}>
//                   DELETE PRODUCT
//                 </button>
//               </div>


//             </div>
//           </div>
//         </div>
//       </div>

//     </Layout>
//   );
// };

// export default UpdateProduct;


import React, { useEffect, useState } from 'react';
import AdminMenu from './../../components/AdminMenu.js';
import Layout from '../../components/Layout.js';
import toast from "react-hot-toast";
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [category, setCategory] = useState('');
    const [shipping, setShipping] = useState('');
    const [quantity, setQuantity] = useState('');
    const [id, setId] = useState('');

    // get single product 
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${window.location.origin}/api/v1/product/get-product/${params.slug}`, { withCredentials: true });
            setName(data.product.name);
            setPrice(data.product.price);
            setDescription(data.product.description);
            setCategory(data.product.category._id);
            setShipping(data.product.shipping);
            setQuantity(data.product.quantity);
            setId(data.product._id);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleProduct();
    }, []);

    // get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${window.location.origin}/api/v1/category/get-category`, { withCredentials: true });
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting all categories.");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append('name', name);
            productData.append('price', price);
            productData.append('description', description);
            if (photo) productData.append('photo', photo);
            productData.append('category', category);
            productData.append('shipping', shipping);
            productData.append('quantity', quantity);

            const { data } = await axios.put(`${window.location.origin}/api/v1/product/update-product/${id}`, productData, { withCredentials: true });
            if (data?.success) {
                toast.success("Product updated successfully");
                navigate('/dashboard/admin/products');
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in updating the product.");
        }
    };

    // delete a product 
    const handleDelete = async (id) => {
        try {
            let answer = window.confirm("Are you sure you want to delete this product?");
            if (!answer) return;
            const { data } = await axios.delete(`${window.location.origin}/api/v1/product/delete-product/${id}`, {
                withCredentials: true,
              });
          
            toast.success("Product deleted successfully");
            navigate("/dashboard/admin/products");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in deleting the product.");
        }
    };

    return (
        <Layout title={"Dashboard - Update Product"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>

                        <div className="m-1 w-75">
                            <Select
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => setCategory(value)}
                                value={category}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>

                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>

                            <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img
                                            src={`${window.location.origin}/api/v1/product/product-photo/${id}`}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="Write a description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="Write a price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="Write a quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <Select
                                    placeholder="Select Shipping"
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => setShipping(value)}
                                    value={shipping ? "Yes" : "No"}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>

                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleUpdate}>
                                    UPDATE PRODUCT
                                </button>
                            </div>

                            <div className="mb-3">
                                <button className="btn btn-danger" onClick={() => handleDelete(id)}>
                                    DELETE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;
